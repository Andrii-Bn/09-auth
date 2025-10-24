import { NoteDraft } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DraftNoteStore {
  draft: NoteDraft;
  setDraft: (draft: NoteDraft) => void;
  clearDraft: () => void;
}

const initialDraft: NoteDraft = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useDraftNote = create<DraftNoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (draft: NoteDraft) =>
        set((prevState) => ({ draft: { ...prevState.draft, ...draft } })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    { name: "draftNote" }
  )
);
