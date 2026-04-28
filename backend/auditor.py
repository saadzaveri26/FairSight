"""
auditor.py — Core fairness auditing module for FairSight.

Trains a LogisticRegression classifier on the uploaded dataset and computes
a battery of fairness metrics using the Fairlearn library. Returns a
structured dict with bias indicators, selection rates per group, and an
overall "health score" (0–100) that penalizes detected disparities.
"""

import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from fairlearn.metrics import (
    demographic_parity_difference,
    equalized_odds_difference,
    selection_rate,
)


def run_fairness_audit(
    df: pd.DataFrame,
    target_column: str,
    sensitive_attribute: str,
) -> dict:
    """
    Run a full fairness audit on the provided dataframe.

    Args:
        df: The input dataframe containing features, target, and sensitive attr.
        target_column: Name of the binary target column (e.g. "Hired").
        sensitive_attribute: Name of the sensitive column (e.g. "Gender").

    Returns:
        A dict containing fairness metrics, bias flag, and health score.

    Raises:
        ValueError: If required columns are missing from the dataframe.
    """

    # ── 1. Validate columns ───────────────────────────────────────────────
    if target_column not in df.columns:
        raise ValueError(f"Target column '{target_column}' not found in dataset.")
    if sensitive_attribute not in df.columns:
        raise ValueError(
            f"Sensitive attribute '{sensitive_attribute}' not found in dataset."
        )

    # ── 2. Prepare features, target, and sensitive series ─────────────────
    # Encode categorical columns so LogisticRegression can consume them.
    df_encoded = df.copy()
    label_encoders = {}
    for col in df_encoded.select_dtypes(include=["object", "category"]).columns:
        le = LabelEncoder()
        df_encoded[col] = le.fit_transform(df_encoded[col].astype(str))
        label_encoders[col] = le

    X = df_encoded.drop(columns=[target_column])
    y = df_encoded[target_column]
    sensitive = df_encoded[sensitive_attribute]

    # ── 3. Train / test split (80/20, deterministic seed) ─────────────────
    X_train, X_test, y_train, y_test, sens_train, sens_test = train_test_split(
        X, y, sensitive, test_size=0.2, random_state=42
    )

    # ── 4. Train a simple LogisticRegression classifier ───────────────────
    model = LogisticRegression(max_iter=1000, random_state=42)
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)

    # ── 5. Compute fairness metrics via Fairlearn ─────────────────────────
    dpd = demographic_parity_difference(
        y_test, y_pred, sensitive_features=sens_test
    )
    eod = equalized_odds_difference(
        y_test, y_pred, sensitive_features=sens_test
    )

    # Per-group selection rates (proportion of positive predictions).
    groups = np.unique(sens_test)
    selection_rates: dict[str, float] = {}
    for group in groups:
        mask = sens_test == group
        rate = selection_rate(y_test[mask], y_pred[mask])
        # Use original label if we label-encoded the sensitive attribute.
        if sensitive_attribute in label_encoders:
            group_label = str(label_encoders[sensitive_attribute].inverse_transform(
                [group]
            )[0])
        else:
            group_label = str(group)
        selection_rates[group_label] = round(float(rate), 4)

    # ── 6. Disparate impact ratio ─────────────────────────────────────────
    rates = list(selection_rates.values())
    if max(rates) == 0:
        disparate_impact_ratio = 0.0
    else:
        disparate_impact_ratio = float(round(min(rates) / max(rates), 4))

    # ── 7. Overall accuracy ───────────────────────────────────────────────
    overall_accuracy = round(float(np.mean(y_pred == y_test)), 4)

    # ── 8. Bias detection flag ────────────────────────────────────────────
    bias_detected = bool(disparate_impact_ratio < 0.8 or abs(dpd) > 0.1)

    # ── 9. Health score (0–100) ───────────────────────────────────────────
    # Start at 100 and apply additive penalties for fairness violations.
    health_score = 100
    if disparate_impact_ratio < 0.8:
        health_score -= 30
    if abs(dpd) > 0.1:
        health_score -= 20
    if abs(eod) > 0.1:
        health_score -= 20
    if disparate_impact_ratio < 0.6:
        health_score -= 30
    health_score = max(health_score, 0)  # clamp to 0

    return {
        "disparate_impact_ratio": disparate_impact_ratio,
        "demographic_parity_difference": round(float(dpd), 4),
        "equalized_odds_difference": round(float(eod), 4),
        "selection_rates": selection_rates,
        "overall_accuracy": overall_accuracy,
        "bias_detected": bias_detected,
        "health_score": int(health_score),
    }
