import React from "react";
import Link from "next/link";
import { Scale, BookOpen, Terminal, FileJson, Upload, Settings, AlertTriangle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Documentation | FairSight",
  description: "Complete documentation for FairSight — the AI bias auditing tool. Learn about setup, API usage, CSV requirements, and metric interpretation.",
};

export default function DocsPage() {
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
            <Link href="/docs" className="text-foreground">Docs</Link>
            <a href="http://localhost:8000/docs" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">API</a>
            <Link href="/">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Start Auditing
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 fixed inset-y-16 left-0 bg-card border-r border-border hidden lg:flex flex-col z-10 overflow-y-auto">
          <div className="p-6 space-y-6">
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Getting Started</h4>
              <nav className="space-y-1">
                <a href="#quick-start" className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                  <Terminal className="h-3.5 w-3.5" /> Quick Start
                </a>
                <a href="#prerequisites" className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                  <Settings className="h-3.5 w-3.5" /> Prerequisites
                </a>
              </nav>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Usage</h4>
              <nav className="space-y-1">
                <a href="#csv-format" className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                  <Upload className="h-3.5 w-3.5" /> CSV Format
                </a>
                <a href="#api-reference" className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                  <FileJson className="h-3.5 w-3.5" /> API Reference
                </a>
                <a href="#interpreting-results" className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                  <BookOpen className="h-3.5 w-3.5" /> Interpreting Results
                </a>
                <a href="#troubleshooting" className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                  <AlertTriangle className="h-3.5 w-3.5" /> Troubleshooting
                </a>
              </nav>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:pl-64">
          <div className="max-w-3xl mx-auto p-6 lg:p-10 space-y-12">

            {/* Page Title */}
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight mb-4">Documentation</h1>
              <p className="text-lg text-muted-foreground">
                Everything you need to set up, run, and integrate FairSight into your ML workflow.
              </p>
            </div>

            <Separator className="bg-border" />

            {/* Quick Start */}
            <section id="quick-start" className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Terminal className="h-6 w-6 text-primary" /> Quick Start
              </h2>
              <p className="text-muted-foreground">Get FairSight running locally in under 2 minutes.</p>

              <div className="space-y-4">
                <Card className="bg-card border-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">1. Start the Backend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-[#0c0d12] text-success p-4 rounded-lg text-sm font-mono overflow-x-auto">
{`cd backend
pip install -r requirements.txt
$env:GEMINI_API_KEY="your_key_here"  # PowerShell
python -m uvicorn main:app --reload`}
                    </pre>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">2. Start the Frontend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-[#0c0d12] text-success p-4 rounded-lg text-sm font-mono overflow-x-auto">
{`cd frontend/app_build
npm install
npm run dev`}
                    </pre>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">3. Open the App</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Navigate to <code className="text-primary bg-primary/10 px-1.5 py-0.5 rounded text-xs">http://localhost:3000</code> in your browser.
                      The backend API runs on <code className="text-primary bg-primary/10 px-1.5 py-0.5 rounded text-xs">http://localhost:8000</code>.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <Separator className="bg-border" />

            {/* Prerequisites */}
            <section id="prerequisites" className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Settings className="h-6 w-6 text-primary" /> Prerequisites
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="bg-card border-border">
                  <CardContent className="p-5 space-y-3">
                    <h4 className="font-bold text-sm">Backend</h4>
                    <ul className="text-sm text-muted-foreground space-y-1.5">
                      <li className="flex items-center gap-2">• Python 3.10+</li>
                      <li className="flex items-center gap-2">• pip (package manager)</li>
                      <li className="flex items-center gap-2">• Google Gemini API key</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-5 space-y-3">
                    <h4 className="font-bold text-sm">Frontend</h4>
                    <ul className="text-sm text-muted-foreground space-y-1.5">
                      <li className="flex items-center gap-2">• Node.js 18+</li>
                      <li className="flex items-center gap-2">• npm or yarn</li>
                      <li className="flex items-center gap-2">• Modern browser</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              <Card className="bg-amber-500/5 border-amber-500/20">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm mb-1">Gemini API Key</h4>
                      <p className="text-sm text-muted-foreground">
                        Without a valid <code className="text-primary bg-primary/10 px-1 py-0.5 rounded text-xs">GEMINI_API_KEY</code> environment variable, 
                        the audit will still work but the AI Insight section will show a fallback message. 
                        Get a free key at{" "}
                        <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                          Google AI Studio <ExternalLink className="h-3 w-3" />
                        </a>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <Separator className="bg-border" />

            {/* CSV Format */}
            <section id="csv-format" className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Upload className="h-6 w-6 text-primary" /> CSV Format Requirements
              </h2>
              <p className="text-muted-foreground">Your CSV file must meet these requirements for a successful audit:</p>
              
              <div className="space-y-4">
                <Card className="bg-card border-border">
                  <CardContent className="p-5 space-y-4">
                    <ul className="text-sm text-muted-foreground space-y-3">
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span><strong className="text-foreground">Headers required</strong> — The first row must contain column names.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span><strong className="text-foreground">Binary target</strong> — The target column should contain binary values (0/1, Yes/No, True/False).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span><strong className="text-foreground">Sensitive attribute</strong> — Must be a categorical column representing a protected group (e.g., Gender, Race, Age Group).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span><strong className="text-foreground">UTF-8 encoding</strong> — The file must be valid, UTF-8 encoded CSV.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span><strong className="text-foreground">No missing values</strong> — Rows with missing values in key columns may cause errors.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Example CSV</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-[#0c0d12] text-sm p-4 rounded-lg font-mono overflow-x-auto text-muted-foreground">
{`Name,Age,Gender,Education,Experience,Score,Hired
Alice,28,Female,Masters,5,82,1
Bob,35,Male,Bachelors,10,75,1
Carol,24,Female,Bachelors,2,68,0
Dave,42,Male,PhD,15,91,1
Eve,31,Female,Masters,8,71,0`}
                    </pre>
                    <p className="text-xs text-muted-foreground mt-3">
                      In this example, <code className="text-primary bg-primary/10 px-1 py-0.5 rounded">Hired</code> is the target column and <code className="text-primary bg-primary/10 px-1 py-0.5 rounded">Gender</code> is the sensitive attribute.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <Separator className="bg-border" />

            {/* API Reference */}
            <section id="api-reference" className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <FileJson className="h-6 w-6 text-primary" /> API Reference
              </h2>
              <p className="text-muted-foreground">
                FairSight exposes a RESTful API. For the full interactive documentation, visit the{" "}
                <a href="http://localhost:8000/docs" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                  Swagger UI <ExternalLink className="h-3 w-3" />
                </a>
              </p>

              <Card className="bg-card border-border">
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-success text-success-foreground font-mono text-xs">GET</Badge>
                    <code className="text-sm font-mono text-foreground">/</code>
                    <span className="text-sm text-muted-foreground">— Health check</span>
                  </div>
                  <Separator className="bg-border" />
                  <div className="flex items-center gap-3">
                    <Badge className="bg-primary text-primary-foreground font-mono text-xs">POST</Badge>
                    <code className="text-sm font-mono text-foreground">/audit</code>
                    <span className="text-sm text-muted-foreground">— Full fairness audit</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">POST /audit — Request</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">Send as <code className="text-primary bg-primary/10 px-1 py-0.5 rounded text-xs">multipart/form-data</code>:</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 pr-4 font-medium text-muted-foreground">Field</th>
                          <th className="text-left py-2 pr-4 font-medium text-muted-foreground">Type</th>
                          <th className="text-left py-2 font-medium text-muted-foreground">Description</th>
                        </tr>
                      </thead>
                      <tbody className="text-muted-foreground">
                        <tr className="border-b border-border/50">
                          <td className="py-2 pr-4"><code className="text-primary text-xs">file</code></td>
                          <td className="py-2 pr-4">File</td>
                          <td className="py-2">CSV file to audit</td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="py-2 pr-4"><code className="text-primary text-xs">target_column</code></td>
                          <td className="py-2 pr-4">string</td>
                          <td className="py-2">Name of the target/label column</td>
                        </tr>
                        <tr>
                          <td className="py-2 pr-4"><code className="text-primary text-xs">sensitive_attribute</code></td>
                          <td className="py-2 pr-4">string</td>
                          <td className="py-2">Name of the protected attribute column</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">POST /audit — Response (200 OK)</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-[#0c0d12] text-sm p-4 rounded-lg font-mono overflow-x-auto text-muted-foreground">
{`{
  "disparate_impact_ratio": 0.115,
  "demographic_parity_difference": 0.479,
  "equalized_odds_difference": 0.352,
  "selection_rates": {
    "Male": 0.65,
    "Female": 0.075
  },
  "overall_accuracy": 0.87,
  "bias_detected": true,
  "health_score": 0,
  "shap_features": [
    { "feature": "Score", "importance": 1.42, "direction": "increases_bias" },
    { "feature": "Experience", "importance": 0.89, "direction": "neutral" }
  ],
  "gemini_insight": "The audit reveals significant gender-based bias..."
}`}
                  </pre>
                </CardContent>
              </Card>
            </section>

            <Separator className="bg-border" />

            {/* Interpreting Results */}
            <section id="interpreting-results" className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" /> Interpreting Results
              </h2>

              <div className="space-y-4">
                <Card className="bg-card border-border">
                  <CardContent className="p-5 space-y-4">
                    <h4 className="font-bold">Health Score</h4>
                    <p className="text-sm text-muted-foreground">
                      The health score starts at 100 and is penalized for each fairness violation:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1.5 pl-4">
                      <li>• <strong className="text-foreground">−30 points</strong> if Disparate Impact Ratio &lt; 0.80</li>
                      <li>• <strong className="text-foreground">−20 points</strong> if |Demographic Parity Difference| &gt; 0.10</li>
                      <li>• <strong className="text-foreground">−20 points</strong> if |Equalized Odds Difference| &gt; 0.10</li>
                      <li>• <strong className="text-foreground">−30 points</strong> (additional) if Disparate Impact Ratio &lt; 0.60</li>
                    </ul>
                    <div className="flex gap-4 mt-2">
                      <Badge className="bg-success/20 text-success border-success/30">80–100: Fair</Badge>
                      <Badge className="bg-warning/20 text-warning border-warning/30">60–79: Moderate</Badge>
                      <Badge className="bg-destructive/20 text-destructive border-destructive/30">0–59: High Bias</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardContent className="p-5 space-y-4">
                    <h4 className="font-bold">SHAP Feature Analysis</h4>
                    <p className="text-sm text-muted-foreground">
                      Features are ranked by their mean absolute SHAP value. A feature is flagged as <Badge variant="outline" className="border-destructive text-destructive text-xs mx-1">increases_bias</Badge> if 
                      it has a positive Pearson correlation with the sensitive attribute — meaning the model may be using it as a proxy for the protected characteristic.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <Separator className="bg-border" />

            {/* Troubleshooting */}
            <section id="troubleshooting" className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-primary" /> Troubleshooting
              </h2>

              <div className="space-y-4">
                {[
                  {
                    q: "\"uvicorn is not recognized\" error on Windows",
                    a: "Use python -m uvicorn main:app --reload instead. This happens when Python's Scripts folder isn't in your PATH.",
                  },
                  {
                    q: "AI Insight shows \"unavailable\"",
                    a: "Set your Gemini API key: $env:GEMINI_API_KEY=\"your_key\" (PowerShell) before starting the backend. The audit still works without it — only the narrative is missing.",
                  },
                  {
                    q: "CORS errors in the browser console",
                    a: "Make sure the backend is running on http://localhost:8000. The CORS middleware is already configured to accept all origins.",
                  },
                  {
                    q: "ConvergenceWarning from scikit-learn",
                    a: "This is a harmless warning meaning the LogisticRegression model didn't fully converge in 1000 iterations. Results are still valid — the warning can be ignored.",
                  },
                  {
                    q: "400 Bad Request on /audit",
                    a: "Check that your CSV has headers, the target column is binary, and there are no missing values in the selected columns.",
                  },
                ].map((item) => (
                  <Card key={item.q} className="bg-card border-border">
                    <CardContent className="p-5">
                      <h4 className="font-bold text-sm mb-2">{item.q}</h4>
                      <p className="text-sm text-muted-foreground">{item.a}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Footer CTA */}
            <div className="text-center pt-6 pb-10">
              <Link href="/">
                <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
                  ← Back to Home
                </Button>
              </Link>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
