export type VisitStatus =
  | 'pending'
  | 'completed'
  | 'skipped'
  | 'failed'
  | 'blocked';

export type VisitNoteType = 'tip' | 'general' | 'warning';

export type VisitDealStatus = 'Closed' | 'Failed';

export type RecentNote = {
  id: number;
  note: string | null;
  note_type: VisitNoteType;
  user_name: string | null;
};

export type VisitSummary = {
  deal_status: VisitDealStatus;
  notes_snippet: string | null;
  note_type: VisitNoteType;
};

export type VisitDetail = {
  id: number;
  status: VisitStatus;
  started_at: string | null;
  ended_at: string | null;
  service_time_sec: number | null;
  driver_reported_cause: string | null;
  pharmacy: {
    id: number;
    name: string;
    phone_number: string;
  };
  visited: 0 | 1;
  recent_notes: RecentNote[];
  summary: VisitSummary;
};
