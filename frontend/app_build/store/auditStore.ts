import { create } from "zustand";
import { AuditResult } from "@/lib/api";

interface AuditState {
  auditResult: AuditResult | null;
  filename: string | null;
  targetColumn: string | null;
  sensitiveAttribute: string | null;
  setAuditResult: (result: AuditResult) => void;
  setFilename: (filename: string) => void;
  setTargetColumn: (targetColumn: string) => void;
  setSensitiveAttribute: (sensitiveAttribute: string) => void;
  clearAudit: () => void;
}

export const useAuditStore = create<AuditState>((set) => ({
  auditResult: null,
  filename: null,
  targetColumn: null,
  sensitiveAttribute: null,
  setAuditResult: (result) => set({ auditResult: result }),
  setFilename: (filename) => set({ filename }),
  setTargetColumn: (targetColumn) => set({ targetColumn }),
  setSensitiveAttribute: (sensitiveAttribute) => set({ sensitiveAttribute }),
  clearAudit: () =>
    set({
      auditResult: null,
      filename: null,
      targetColumn: null,
      sensitiveAttribute: null,
    }),
}));
