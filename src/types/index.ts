export interface SessionBlock {
  id: string;
  title: string;
  duration: string;
  questions: string[];
  answer: string;
}

export interface SessionData {
  blocks: SessionBlock[];
  createdAt: string;
  updatedAt: string;
}

export interface GeneratedGoals {
  mainGoals: string[];
  categoryGoals: Record<string, string[]>;
  actionItems: string[];
}
