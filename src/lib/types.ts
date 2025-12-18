export interface ExecutionRequest {
    code: string;
    language: string;
  }
  
  export interface ExecutionResult {
    success: boolean;
    output?: string;
    error?: string;
    logs?: string[];
    executionTime?: number;
  }
  
  export interface JobStatus {
    id: string;
    status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
    result?: ExecutionResult;
    createdAt: string;
    completedAt?: string;
  }
  
  export interface StreamMessage {
    type: 'log' | 'output' | 'error' | 'complete';
    data: string;
    timestamp: number;
  }