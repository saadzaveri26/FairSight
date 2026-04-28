"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Scale, UploadCloud, CheckCircle, Shield, FileText, Activity } from "lucide-react";
import { useRouter } from "next/navigation";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuditStore } from "@/store/auditStore";
import { runAudit } from "@/lib/api";

export default function UploadPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [targetColumn, setTargetColumn] = useState<string>("");
  const [sensitiveAttribute, setSensitiveAttribute] = useState<string>("");
  const [isHovering, setIsHovering] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { setAuditResult, setFilename, setTargetColumn: setStoreTargetColumn, setSensitiveAttribute: setStoreSensitiveAttribute } = useAuditStore();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const processFile = (selectedFile: File) => {
    if (!selectedFile.name.endsWith(".csv")) {
      setError("Please upload a valid CSV file.");
      return;
    }
    setFile(selectedFile);
    setError(null);
    setTargetColumn("");
    setSensitiveAttribute("");

    // Parse headers
    Papa.parse(selectedFile, {
      header: true,
      preview: 1, // only need headers
      complete: (results) => {
        if (results.meta.fields) {
          setColumns(results.meta.fields);
        }
      },
      error: () => {
        setError("Failed to parse CSV file.");
      }
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHovering(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHovering(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHovering(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      processFile(droppedFile);
    }
  };

  const handleRunAudit = async () => {
    if (!file || !targetColumn || !sensitiveAttribute) return;

    setIsAuditing(true);
    setError(null);

    // Save to store
    setFilename(file.name);
    setStoreTargetColumn(targetColumn);
    setStoreSensitiveAttribute(sensitiveAttribute);

    try {
      // Navigate to analyzing page immediately to show progress
      // The API call happens in the background, or we could await it here.
      // Wait, the prompt says: "app calls runAudit() -> stores result in Zustand -> navigates to /analyzing"
      const result = await runAudit(file, targetColumn, sensitiveAttribute);
      setAuditResult(result);
      router.push("/analyzing");
    } catch (err: any) {
      setError(err.message || "Failed to run audit.");
      setIsAuditing(false);
    }
  };

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
            <Link href="/how-it-works" className="hover:text-foreground transition-colors">How it Works</Link>
            <Link href="/docs" className="hover:text-foreground transition-colors">Docs</Link>
            <a href="http://localhost:8000/docs" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">API</a>
            <a href="http://localhost:8000/docs" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Get API Access
              </Button>
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 py-12 flex flex-col items-center justify-center max-w-4xl">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Audit Your AI for <span className="text-primary">Hidden Bias</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload any classification dataset and get an explainable fairness report in seconds — powered by Gemini AI.
          </p>
        </div>

        <div className="w-full max-w-xl space-y-6">
          {/* Dropzone */}
          <div
            className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-200 ${
              isHovering ? "border-primary bg-primary/5" : "border-border bg-[#2D3748]/30"
            } hover:border-primary hover:bg-primary/5`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              accept=".csv"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <UploadCloud className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
            {file ? (
              <div className="text-lg font-medium text-primary font-mono">{file.name}</div>
            ) : (
              <div>
                <p className="text-base font-medium">Click to upload or drag and drop</p>
                <p className="text-sm text-muted-foreground mt-1">CSV files only (max 50MB)</p>
              </div>
            )}
          </div>

          {error && <div className="text-destructive text-sm font-medium text-center">{error}</div>}

          {/* Configuration */}
          {file && columns.length > 0 && (
            <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-2">
                <label className="text-sm font-medium">Target Column (Outcome to audit)</label>
                <select
                  className="w-full bg-card border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                  value={targetColumn}
                  onChange={(e) => setTargetColumn(e.target.value)}
                >
                  <option value="" disabled>Select column...</option>
                  {columns.map((col) => (
                    <option key={col} value={col}>{col}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Sensitive Attribute (Protected group)</label>
                <select
                  className="w-full bg-card border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                  value={sensitiveAttribute}
                  onChange={(e) => setSensitiveAttribute(e.target.value)}
                >
                  <option value="" disabled>Select column...</option>
                  {columns.map((col) => (
                    <option key={col} value={col}>{col}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Action Button */}
          <Button
            size="lg"
            className="w-full text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground h-14"
            disabled={!file || !targetColumn || !sensitiveAttribute || isAuditing}
            onClick={handleRunAudit}
          >
            {isAuditing ? "Running Audit..." : "Run Bias Audit →"}
          </Button>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-6 pt-4 text-xs font-medium text-muted-foreground">
            <div className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-success" /> 256-bit Encrypted</div>
            <div className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-success" /> No Data Stored</div>
            <div className="flex items-center gap-1.5"><FileText className="h-4 w-4 text-success" /> GDPR Compliant</div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 w-full mt-24">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <Activity className="h-6 w-6 text-primary mb-2" />
              <CardTitle className="text-lg">Detection</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Automatically identify hidden biases using disparate impact and statistical parity metrics.
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <FileText className="h-6 w-6 text-primary mb-2" />
              <CardTitle className="text-lg">Explanation</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Understand exactly which features contribute to biased outcomes using SHAP values.
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <Shield className="h-6 w-6 text-primary mb-2" />
              <CardTitle className="text-lg">Remediation</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Get AI-generated, actionable recommendations to fix bias and ensure fairness before deployment.
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
