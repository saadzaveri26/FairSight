export interface AuditResult {
  disparate_impact_ratio: number;
  demographic_parity_difference: number;
  equalized_odds_difference: number;
  selection_rates: Record<string, number>;
  overall_accuracy: number;
  bias_detected: boolean;
  health_score: number;
  shap_features: Array<{
    feature: string;
    importance: number;
    direction: string;
  }>;
  gemini_insight: string;
}

export async function runAudit(
  file: File,
  targetColumn: string,
  sensitiveAttribute: string
): Promise<AuditResult> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("target_column", targetColumn);
  formData.append("sensitive_attribute", sensitiveAttribute);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const response = await fetch(`${baseUrl}/audit`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    let errorMsg = "Audit failed";
    try {
      const errorData = await response.json();
      errorMsg = errorData.detail || errorMsg;
    } catch {
      // ignore
    }
    throw new Error(errorMsg);
  }

  const data: AuditResult = await response.json();
  return data;
}
