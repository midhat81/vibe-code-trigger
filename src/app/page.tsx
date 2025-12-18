"use client";

import { useState, useCallback } from "react";
import CodeEditor from "@/components/CodeEditor";
import OutputPanel from "@/components/OutputPanel";
import ControlPanel from "@/components/ControlPanel";
import { ExecutionResult } from "@/lib/types";

const DEFAULT_CODE = {
  javascript: `console.log("Hello from Vibe Code!");
console.log("Powered by Trigger.dev + E2B");

// Try some math
const sum = (a, b) => a + b;
console.log("5 + 3 =", sum(5, 3));`,
  python: `print("Hello from Vibe Code!")
print("Powered by Trigger.dev + E2B")

# Try some math
def sum(a, b):
    return a + b

print("5 + 3 =", sum(5, 3))`,
  typescript: `console.log("Hello from Vibe Code!");
console.log("Powered by Trigger.dev + E2B");

// Try some math
const sum = (a: number, b: number): number => a + b;
console.log("5 + 3 =", sum(5, 3));`,
};

export default function Home() {
  const [code, setCode] = useState(DEFAULT_CODE.javascript);
  const [language, setLanguage] = useState("javascript");
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);

  const pollJobStatus = useCallback(async (id: string) => {
    const maxAttempts = 60; // 60 seconds max
    let attempts = 0;

    const poll = async () => {
      try {
        const response = await fetch(`/api/execute?jobId=${id}`);
        const data = await response.json();

        if (data.status === "COMPLETED" || data.status === "FAILED") {
          setResult(data.result || { success: false, error: "No result" });
          setIsRunning(false);
          return;
        }

        if (attempts < maxAttempts && data.status !== "COMPLETED") {
          attempts++;
          setTimeout(poll, 1000);
        } else {
          setResult({ success: false, error: "Execution timeout" });
          setIsRunning(false);
        }
      } catch (error) {
        console.error("Polling error:", error);
        setResult({
          success: false,
          error: "Failed to check execution status",
        });
        setIsRunning(false);
      }
    };

    poll();
  }, []);

  const handleRun = async () => {
    setIsRunning(true);
    setResult(null);

    try {
      const response = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      });

      const data = await response.json();

      if (data.jobId) {
        setJobId(data.jobId);
        pollJobStatus(data.jobId);
      } else {
        setResult({ success: false, error: "Failed to start execution" });
        setIsRunning(false);
      }
    } catch (error) {
      console.error("Execution error:", error);
      setResult({ success: false, error: "Failed to execute code" });
      setIsRunning(false);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    setJobId(null);
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setCode(DEFAULT_CODE[lang as keyof typeof DEFAULT_CODE]);
    setResult(null);
  };

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-white border-b">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Vibe Code <span className="text-blue-600">+ Trigger.dev</span>
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Code execution powered by E2B Sandbox
          </p>
        </div>
      </header>

      <ControlPanel
        onRun={handleRun}
        onStop={handleStop}
        isRunning={isRunning}
        language={language}
        onLanguageChange={handleLanguageChange}
      />

      <main className="flex-1 grid grid-cols-2 gap-4 p-4 overflow-hidden">
        <div className="h-full">
          <CodeEditor
            value={code}
            onChange={setCode}
            language={language}
            disabled={isRunning}
          />
        </div>
        <div className="h-full">
          <OutputPanel result={result} isRunning={isRunning} />
        </div>
      </main>
    </div>
  );
}