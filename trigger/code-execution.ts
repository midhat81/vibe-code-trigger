import { task } from "@trigger.dev/sdk/v3";
import { Sandbox } from "@e2b/code-interpreter";

export const executeCode = task({
  id: "execute-code",
  run: async (payload: { code: string; language: string }) => {
    const startTime = Date.now();
    const logs: string[] = [];

    try {
      const apiKey = process.env.E2B_API_KEY;
      if (!apiKey) throw new Error("E2B_API_KEY is not defined");

      logs.push("Initializing E2B sandbox...");
      const sandbox = await Sandbox.create({ apiKey, timeoutMs: 60000 });
      logs.push("Sandbox created successfully");

      logs.push(`Running code in language: ${payload.language}`);
      const execution = await sandbox.runCode(payload.code, {
        language: payload.language.toLowerCase() as
          | "javascript"
          | "typescript"
          | "python",
        timeoutMs: 60000,
      });

      logs.push("Execution finished");

      await sandbox.kill(); // optional cleanup
      logs.push("Sandbox closed");

      return {
        success: !execution.error,
        output: execution.text ?? "",
        error: execution.error ?? "",
        logs,
        executionTime: Date.now() - startTime,
      };
    } catch (error) {
      logs.push(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
      return {
        success: false,
        output: "",
        error: error instanceof Error ? error.message : "Execution failed",
        logs,
        executionTime: Date.now() - startTime,
      };
    }
  },
});


