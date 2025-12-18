"use client";

import { Play, Square } from "lucide-react";

interface ControlPanelProps {
  onRun: () => void;
  onStop: () => void;
  isRunning: boolean;
  language: string;
  onLanguageChange: (lang: string) => void;
}

export default function ControlPanel({
  onRun,
  onStop,
  isRunning,
  language,
  onLanguageChange,
}: ControlPanelProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 border-b">
      <select
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
        disabled={isRunning}
        className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="typescript">TypeScript</option>
      </select>

      {!isRunning ? (
        <button
          onClick={onRun}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
        >
          <Play className="w-4 h-4" />
          Run Code
        </button>
      ) : (
        <button
          onClick={onStop}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
        >
          <Square className="w-4 h-4" />
          Stop
        </button>
      )}

      {isRunning && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Executing...
        </div>
      )}
    </div>
  );
}