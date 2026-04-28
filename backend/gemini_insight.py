"""
gemini_insight.py — Gemini-powered narrative insight generator for FairSight.

Calls Google's Gemini 1.5 Flash model to produce a plain-language audit
summary tailored for non-technical business stakeholders in India.
"""

import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables from .env file if it exists
load_dotenv()


def generate_insight(
    audit_results: dict,
    sensitive_attribute: str,
    target_column: str,
) -> str:
    """
    Generate a human-readable fairness insight using the Gemini API.

    Args:
        audit_results: The dict returned by auditor.run_fairness_audit().
        sensitive_attribute: Name of the protected column (e.g. "Gender").
        target_column: Name of the target column (e.g. "Hired").

    Returns:
        A string containing the AI-generated audit narrative.
        Falls back to a static message if the API call fails.
    """
    try:
        # ── 1. Configure the Gemini client ────────────────────────────────
        api_key = os.environ.get("GEMINI_API_KEY", "")
        if not api_key:
            return "AI insight generation unavailable. Please review the metrics above."

        genai.configure(api_key=api_key)
        model = genai.GenerativeModel("gemini-2.5-flash")

        # ── 2. Build the system + user prompts ────────────────────────────
        system_prompt = (
            "You are an AI fairness expert writing audit reports for "
            "non-technical business stakeholders in India. Be specific, "
            "cite the numbers, and give 3 concrete recommendations. "
            "Keep it under 150 words."
        )

        user_prompt = (
            f"Here are the fairness audit results for a model predicting "
            f"'{target_column}' with '{sensitive_attribute}' as the sensitive attribute:\n\n"
            f"- Disparate Impact Ratio: {audit_results['disparate_impact_ratio']}\n"
            f"- Demographic Parity Difference: {audit_results['demographic_parity_difference']}\n"
            f"- Health Score: {audit_results['health_score']} / 100\n\n"
            f"Please provide a concise audit summary with recommendations."
        )

        # ── 3. Call the Gemini API ────────────────────────────────────────
        response = model.generate_content(
            [
                {"role": "user", "parts": [{"text": system_prompt + "\n\n" + user_prompt}]},
            ]
        )

        return response.text

    except Exception as e:
        import traceback
        traceback.print_exc()
        # Graceful fallback — the audit must succeed even without AI insights.
        return "AI insight generation unavailable. Please review the metrics above."
