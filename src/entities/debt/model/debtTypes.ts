export type DebtStatus =
  | 'pending'
  | 'unpaid'
  | 'partially_paid'
  | 'paid'
  | 'overdue';

export type DebtOrderStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'cancelled';

export type DebtLastPayment = {
  id: number;
  amount: number;
  payment_date: string;
  created_at: string;
  updated_at: string;
};

export type DebtPayment = {
  id: number;
  debt_id: number;
  pharmacy_id: number;
  collected_by: number;
  collected_by_name: string;
  amount: number;
  note: string | null;
  payment_date: string;
  remaining_debt_snapshot: number;
  created_at: string;
  updated_at: string;
};

export type DebtOrder = {
  id: number;
  pharmacy_id: number;
  warehouse_id: number;
  status: DebtOrderStatus;
  final_total: number;
  paid_amount: number;
  remainingAmount: number;
  discount: number;
  offer_id: number | null;
  created_at: string;
  updated_at: string;
};

type DebtBase = {
  id: number;
  pharmacy_id: number;
  pharmacy_name: string;
  region_id: number;
  region_name: string;
  amount: number;
  paid_amount: number;
  remaining_amount: number;
  paid_percentage: number;
  status: DebtStatus;
  due_date: string;
  created_at: string;
  updated_at: string;
};

export type DebtListItem = DebtBase & {
  last_payment: DebtLastPayment | null;
};

export type DebtDetail = DebtBase & {
  payments: DebtPayment[];
  orders: DebtOrder[];
  last_payment: DebtLastPayment | null;
};

export type DebtListSummary = {
  total_debt_amount: number;
  total_paid: number;
  total_remaining: number;
};

export type DebtPaginationLink = {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
};

export type DebtPaginationMeta = {
  current_page: number;
  from: number | null;
  last_page: number;
  links: DebtPaginationLink[];
  path: string;
  per_page: number;
  to: number | null;
  total: number;
};

export type DebtPaginationLinks = {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
};

export type DebtPagination = {
  meta: DebtPaginationMeta;
  links: DebtPaginationLinks;
};

export type DebtListResponse = {
  debts: DebtListItem[];
  pagination: DebtPagination;
  summary: DebtListSummary;
};

export type DebtFilters = {
  status?: DebtStatus | null;
  pharmacy_name?: string | null;
};
