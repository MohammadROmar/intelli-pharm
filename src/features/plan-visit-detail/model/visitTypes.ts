export type RecentNote = {
  id: number;
  note: string | null;
  note_type: string;
  user_name: string;
};

export type VisitSummary = {
  deal_status: string;
  notes_snippet: string | null;
  note_type: string;
};

export type VisitDetail = {
  id: number;
  pharmacy: {
    id: number;
    name: string;
    phone_number: string;
  };
  visited: 0 | 1;
  recent_notes: RecentNote[];
  summary: VisitSummary;
};
