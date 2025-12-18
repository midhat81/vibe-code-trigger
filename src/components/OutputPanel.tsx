"use client";

import { ExecutionResult } from "@/lib/types";

interface OutputPanelProps {
  result: ExecutionResult | null;
  isRunning: boolean;
}

export default function OutputPanel({ result, isRunning }: OutputPanelProps) {
  return (
    <div className="h-full border rounded-lg bg-gray-900 text-gray-100 p-4 overflow-auto">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-400">Output</h3>
        {isRunning && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-gray-400">Running...</span>
          </div>
        )}
      </div>

      {!result && (
        <p className="text-sm text-gray-500">
          {isRunning
            ? "Job started, waiting for results from Trigger.dev…"
            : 'Click "Run Code" to see output'}
        </p>
      )}

      {result && (
        <div className="space-y-3">
          {/* Logs */}
          {result.logs && result.logs.length > 0 && (
            <div>
              <p className="text-xs text-gray-400 mb-1">Logs:</p>
              <div className="space-y-1">
                {result.logs.map((log, idx) => (
                  <p key={idx} className="text-sm text-blue-400">
                    {log}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Output */}
          {result.output && (
            <div>
              <p className="text-xs text-gray-400 mb-1">Output:</p>
              <pre className="text-sm text-green-400 whitespace-pre-wrap">
                {result.output}
              </pre>
            </div>
          )}

          {/* Error */}
          {result.error && (
            <div>
              <p className="text-xs text-gray-400 mb-1">Error:</p>
              <pre className="text-sm text-red-400 whitespace-pre-wrap">
                {result.error}
              </pre>
            </div>
          )}

          {/* Execution Time */}
          {result.executionTime && (
            <p className="text-xs text-gray-500 mt-2">
              Executed in {result.executionTime}ms
            </p>
          )}
        </div>
      )}
    </div>
  );
}