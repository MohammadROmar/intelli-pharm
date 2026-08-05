import type { PaginatedResponse } from '@/shared/api';
import type { Localized } from '@/shared/lib';

export type NoteType = 'general' | 'tip' | 'warning';

export type PharmacyNote = { note_type: NoteType; note: string };

type BasePharmacy = {
  latitude: number;
  longitude: number;
  region_id: number;
  is_active: boolean;
  opening_time: string;
  closing_time: string;
  pharmacist_name: string;
  pharmacist_phone: string;
  pharmacist_alt_phone?: string;
};

type BasePharmacyDetail = BasePharmacy & {
  id: number;
  region: string;
  holidays: string[];
  history_notes: HistoryNote[];
};

export type Pharmacy = BasePharmacyDetail & { name: string };

export type HistoryNote = {
  id: number;
  notes: string | null;
  note_type: NoteType | null;
  user_name: string | null;
  visited_at: string;
};

export type PharmacyDetail = BasePharmacyDetail & { name: Localized };

export type PharmacyFilters = {
  name?: string | null;
  region?: string | null;
  pharmacist_name?: string | null;
  pharmacist_phone?: string | null;
  pharmacist_alt_phone?: string | null;
};

export type CreatePharmacyNoteDto = { note_type: NoteType; note: string };

export type PharmacyFormValues = PharmacyDetail & { notes?: PharmacyNote[] };

export type PharmaciesResponse = PaginatedResponse<Pharmacy>;
