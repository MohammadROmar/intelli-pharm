export const ORDERS_TREND_DAYS = 14;

export const TARGET_LEADERBOARD_LIMIT = 5;

export const ATTAINMENT_THRESHOLD_ON_TRACK = 100;
export const ATTAINMENT_THRESHOLD_AT_RISK = 80;

export const RELATED_ENTITY_ROUTE: Partial<Record<string, string>> = {
  medicine: '/dashboard/medicines',
  delivery: '/dashboard/deliveries',
  pharmacy: '/dashboard/pharmacies',
};

export const OVERVIEW_CARD_LINK_CLASS =
  'block rounded-xl transition-colors hover:bg-accent/50 focus-visible:outline-2 focus-visible:outline-ring';
