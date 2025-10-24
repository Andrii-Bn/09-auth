export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

export interface NoteDraft {
  title?: string;
  content?: string;
  tag?: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

export interface CreateNoteProps {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}
