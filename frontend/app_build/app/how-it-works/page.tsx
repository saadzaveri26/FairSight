import React from "react";
import Link from "next/link";
import { Scale, Upload, Cpu, BarChart2, FileText, ArrowRight, Shield, Sparkles, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "How it Works | FairSight",
  description: "Learn how FairSight detects and explains AI bias in your datasets using Fairlearn, SHAP, and Gemini AI.",
};

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Your Dataset",
    description: "Upload a CSV file containing your classification dataset. FairSight accepts datasets of any size with any number of features. You select the target column (the outcome your model predicts) and the sensitive attribute (the protected demographic you want to audit for bias).",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
  },
  {
    number: "02",
    icon: Cpu,
    title: "Train & Audit",
    description: "FairSight trains a LogisticRegression classifier on your data and evaluates it using three key fairness metrics from the Fairlearn library: Disparate Impact Ratio, Demographic Parity Difference, and Equalized Odds Difference. These metrics reveal whether outcomes are distributed fairly across groups.",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
  },
  {
    number: "03",
    icon: Network,
    title: "SHAP Explainability",
    description: "Using SHAP (SHapley Additive exPlanations) values, FairSight identifies which features in your dataset contribute most to the model's predictions. Features that are highly correlated with the sensitive attribute are flagged as potential bias amplifiers — even if they aren't the protected attribute itself.",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
  },
  {
    number: "04",
    icon: Sparkles,
    title: "AI-Powered Insights",
    description: "FairSight sends the audit metrics to Google's Gemini AI, which generates a plain-language summary of the bias findings. The narrative is tailored for non-technical stakeholders and includes specific numbers and 3 concrete recommendations for remediation.",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
  },
  {
    number: "05",
    icon: FileText,
    title: "Interactive Report",
    description: "All results are compiled into an interactive dashboard with bar charts for selection rates, feature importance visualizations, and the full AI narrative. You can export the report as a PDF or share the audit summary with your team — all from within the browser.",
    color: "text-rose-400",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/20",
  },
];

const metrics = [
  {
    name: "Disparate Impact Ratio",
    formula: "min(selection_rate) / max(selection_rate)",
    threshold: "≥ 0.80",
    description: "Measures whether the ratio of positive outcomes between groups meets the 80% rule. Values below 0.8 suggest the model disproportionately favors one group.",
  },
  {
    name: "Demographic Parity Difference",
    formula: "max(P(Ŷ=1|group)) − min(P(Ŷ=1|group))",
    threshold: "≤ 0.10",
    description: "The absolute difference in selection rates between groups. A value near zero indicates equal treatment; large values indicate systematic disparities.",
  },
  {
    name: "Equalized Odds Difference",
    formula: "max difference in TPR or FPR across groups",
    threshold: "≤ 0.10",
    description: "Measures whether the model's true positive and false positive rates are equal across groups. Violations mean the model is more accurate for some groups than others.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-border bg-background/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-primary font-bold text-xl">
            <Scale className="h-6 w-6" />
            <span>FairSight</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/how-it-works" className="text-foreground">How it Works</Link>
            <Link href="/docs" className="hover:text-foreground transition-colors">Docs</Link>
            <a href="http://localhost:8000/docs" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">API</a>
            <Link href="/">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Start Auditing
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero */}
        <section className="container mx-auto px-6 py-20 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            How <span className="text-primary">FairSight</span> Works
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A five-step pipeline that takes your raw dataset and produces an explainable, 
            AI-narrated fairness audit in seconds.
          </p>
        </section>

        {/* Steps */}
        <section className="container mx-auto px-6 pb-20 max-w-4xl">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <Card className={`bg-card border ${step.borderColor} overflow-hidden transition-all hover:border-opacity-60`}>
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className={`flex-shrink-0 w-14 h-14 rounded-xl ${step.bgColor} flex items-center justify-center`}>
                        <step.icon className={`h-7 w-7 ${step.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`text-xs font-bold ${step.color} font-mono bg-card border ${step.borderColor} rounded-full px-2.5 py-0.5`}>
                            STEP {step.number}
                          </span>
                          <h3 className="text-xl font-bold">{step.title}</h3>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {index < steps.length - 1 && (
                  <div className="flex justify-center py-2">
                    <ArrowRight className="h-5 w-5 text-muted-foreground/30 rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Metrics Explained */}
        <section className="border-t border-border bg-card/50">
          <div className="container mx-auto px-6 py-20 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-4">Fairness Metrics Explained</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
              FairSight uses three industry-standard fairness metrics, each measuring a different dimension of algorithmic equity.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {metrics.map((metric) => (
                <Card key={metric.name} className="bg-card border-border">
                  <CardContent className="p-6 space-y-4">
                    <h4 className="font-bold text-base">{metric.name}</h4>
                    <code className="text-xs text-primary bg-primary/10 px-2 py-1 rounded block font-mono">
                      {metric.formula}
                    </code>
                    <div className="text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">Threshold:</span> {metric.threshold}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {metric.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="container mx-auto px-6 py-20 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Built With</h2>
          <p className="text-muted-foreground mb-10">Open-source tools you can trust.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {["FastAPI", "Fairlearn", "scikit-learn", "SHAP", "Gemini AI", "Next.js", "Recharts", "Zustand"].map((tech) => (
              <span key={tech} className="px-4 py-2 bg-card border border-border rounded-full text-sm font-medium text-muted-foreground">
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border">
          <div className="container mx-auto px-6 py-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to audit your AI?</h2>
            <Link href="/">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8">
                Start Your First Audit →
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
