"""
main.py — FastAPI application entry point for FairSight.

Exposes two endpoints:
  GET  /       → Health check
  POST /audit  → Full fairness audit pipeline (upload CSV → audit → explain → insight)

Designed for deployment on Google Cloud Run with CORS enabled for frontend
connectivity.
"""

import io
import pandas as pd
from fastapi import FastAPI, File, Form, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from auditor import run_fairness_audit
from explainer import run_shap_explanation
from gemini_insight import generate_insight

# ── Initialise the FastAPI app ────────────────────────────────────────────
app = FastAPI(
    title="FairSight API",
    description="AI Bias Auditing Tool — audit datasets for fairness, "
    "explain feature contributions via SHAP, and generate "
    "plain-language insights with Gemini.",
    version="1.0.0",
)

# ── CORS — allow all origins so any frontend can connect ──────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── GET / — Health check ─────────────────────────────────────────────────
@app.get("/")
async def root():
    """Simple health-check endpoint."""
    return {"status": "FairSight API running"}


# ── POST /audit — Full audit pipeline ────────────────────────────────────
@app.post("/audit")
async def audit(
    file: UploadFile = File(..., description="CSV file to audit"),
    target_column: str = Form(..., description="Name of the target/label column"),
    sensitive_attribute: str = Form(
        ..., description="Name of the sensitive/protected attribute column"
    ),
):
    """
    Accepts a CSV upload and runs the full FairSight pipeline:
      1. Parse & validate the CSV
      2. Run fairness audit (Fairlearn metrics)
      3. Run SHAP-based feature explanation
      4. Generate Gemini narrative insight
    Returns a single JSON object combining all results.
    """

    # ── 1. Parse the uploaded CSV ─────────────────────────────────────────
    try:
        contents = await file.read()
        df = pd.read_csv(io.BytesIO(contents))
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Failed to parse the uploaded file as CSV. "
            "Please ensure it is a valid, UTF-8 encoded CSV file.",
        )

    # ── 2. Validate required columns exist ────────────────────────────────
    if target_column not in df.columns:
        raise HTTPException(
            status_code=400,
            detail=f"Target column '{target_column}' does not exist in the uploaded CSV. "
            f"Available columns: {list(df.columns)}",
        )

    if sensitive_attribute not in df.columns:
        raise HTTPException(
            status_code=400,
            detail=f"Sensitive attribute '{sensitive_attribute}' does not exist in the uploaded CSV. "
            f"Available columns: {list(df.columns)}",
        )

    # ── 3. Run fairness audit ─────────────────────────────────────────────
    try:
        audit_results = run_fairness_audit(df, target_column, sensitive_attribute)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Fairness audit failed: {str(e)}",
        )

    # ── 4. Run SHAP explanation ───────────────────────────────────────────
    shap_results = run_shap_explanation(df, target_column, sensitive_attribute)

    # ── 5. Generate Gemini insight ────────────────────────────────────────
    gemini_text = generate_insight(audit_results, sensitive_attribute, target_column)

    # ── 6. Combine and return ─────────────────────────────────────────────
    return {
        **audit_results,
        "shap_features": shap_results,
        "gemini_insight": gemini_text,
    }
