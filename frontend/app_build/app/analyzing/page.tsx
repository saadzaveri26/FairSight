"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useAuditStore } from "@/store/auditStore";

const steps = [
  { id: 0, title: "Dataset Profiling", log: "> Parsing CSV... 1,000 rows, 7 columns detected" },
  { id: 1, title: "Disparate Impact Analysis", log: "> Computing outcome rates across gender groups..." },
  { id: 2, title: "Statistical Parity Check", log: "> Running statistical parity difference calculation..." },
  { id: 3, title: "SHAP Explainability", log: "> Generating SHAP feature importance values..." },
];

export default function AnalyzingPage() {
  const router = useRouter();
  const filename = useAuditStore((state) => state.filename) || "dataset.csv";
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = 8000;
    const stepDuration = totalDuration / steps.length;
    const start = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(newProgress);

      const nextStep = Math.min(Math.floor(elapsed / stepDuration), steps.length);
      setCurrentStep((prev) => (nextStep !== prev ? nextStep : prev));

      if (elapsed >= totalDuration) {
        clearInterval(timer);
        router.push("/report");
      }
    }, 100);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Analyzing Dataset</h1>
          <p className="text-muted-foreground font-mono text-sm bg-card inline-block px-3 py-1 rounded-md border border-border">
            {filename}
          </p>
        </div>

        {/* Stepper */}
        <div className="bg-card border border-border rounded-xl p-8 space-y-6">
          {steps.map((step, index) => {
            const isCompleted = currentStep > index;
            const isActive = currentStep === index;
            const isPending = currentStep < index;

            return (
              <div key={step.id} className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="h-6 w-6 text-success" />
                  ) : isActive ? (
                    <Loader2 className="h-6 w-6 text-primary animate-spin" />
                  ) : (
                    <Circle className="h-6 w-6 text-muted-foreground/30" />
                  )}
                </div>
                <div className="flex-1">
                  <h3
                    className={`text-lg font-medium transition-colors ${
                      isCompleted ? "text-foreground" : isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Logs */}
        <div className="bg-[#0c0d12] border border-border rounded-xl p-4 h-48 overflow-y-auto font-mono text-sm font-medium">
          {steps.map((step, index) => {
            if (currentStep >= index) {
              return (
                <div
                  key={step.id}
                  className={`mb-2 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                    currentStep > index ? "text-success/70" : "text-success"
                  }`}
                >
                  {step.log}
                </div>
              );
            }
            return null;
          })}
          {currentStep >= steps.length && (
            <div className="text-primary mt-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              &gt; Analysis complete. Redirecting...
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono text-muted-foreground">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>
    </div>
  );
}
