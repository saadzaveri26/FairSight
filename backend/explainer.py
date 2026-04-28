"""
explainer.py — SHAP-based feature importance explainer for FairSight.

Uses shap.LinearExplainer on a LogisticRegression model to identify which
features contribute most to the model's predictions and whether each feature
is correlated with the sensitive attribute (i.e. potentially amplifies bias).
"""

import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder

try:
    import shap
except ImportError:
    shap = None  # Handled gracefully below


def run_shap_explanation(
    df: pd.DataFrame,
    target_column: str,
    sensitive_attribute: str,
) -> list[dict]:
    """
    Compute SHAP-based feature importances and flag bias-increasing features.

    Args:
        df: Full dataframe with features, target, and sensitive attribute.
        target_column: Name of the binary target column.
        sensitive_attribute: Name of the protected/sensitive column.

    Returns:
        A list of up to 5 dicts, each containing:
            - feature (str): Feature name.
            - importance (float): Mean |SHAP value| for this feature.
            - direction (str): "increases_bias" if positively correlated
              with the sensitive attribute, otherwise "neutral".
        Returns an empty list if SHAP computation fails for any reason.
    """
    try:
        if shap is None:
            return []

        # ── 1. Encode categoricals ───────────────────────────────────────
        df_encoded = df.copy()
        label_encoders = {}
        for col in df_encoded.select_dtypes(include=["object", "category"]).columns:
            le = LabelEncoder()
            df_encoded[col] = le.fit_transform(df_encoded[col].astype(str))
            label_encoders[col] = le

        X = df_encoded.drop(columns=[target_column])
        y = df_encoded[target_column]
        sensitive_series = df_encoded[sensitive_attribute]

        # ── 2. Train the same LogisticRegression used in auditor ─────────
        model = LogisticRegression(max_iter=1000, random_state=42)
        model.fit(X, y)

        # ── 3. Compute SHAP values using LinearExplainer ─────────────────
        explainer = shap.LinearExplainer(model, X)
        shap_values = explainer.shap_values(X)

        # shap_values can be a list (binary classification) — take the
        # positive-class values if so.
        if isinstance(shap_values, list):
            shap_values = shap_values[1]

        # ── 4. Aggregate: mean |SHAP value| per feature ─────────────────
        mean_abs_shap = np.mean(np.abs(shap_values), axis=0)
        feature_names = list(X.columns)

        # ── 5. Determine direction for each feature ──────────────────────
        # A feature "increases_bias" if it is positively correlated with
        # the sensitive attribute (i.e. the model may be leveraging a proxy
        # for the protected characteristic).
        results = []
        for idx in np.argsort(mean_abs_shap)[::-1][:5]:
            feat = feature_names[idx]
            importance = round(float(mean_abs_shap[idx]), 4)

            # Compute Pearson correlation between feature and sensitive col.
            corr = np.corrcoef(X[feat].values, sensitive_series.values)[0, 1]
            direction = "increases_bias" if corr > 0 else "neutral"

            results.append(
                {
                    "feature": str(feat),
                    "importance": importance,
                    "direction": direction,
                }
            )

        return results

    except Exception:
        # Gracefully degrade — SHAP failures should not crash the audit.
        return []
