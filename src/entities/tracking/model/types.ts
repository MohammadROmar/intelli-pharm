export type EmployeeRole = 'rep' | 'delivery';

export type RoleFilter = 'all' | EmployeeRole;

export type LocationEvent = {
  /** Employee's user ID */
  u: number;
  /** Employee's display name — ready to render, no separate lookup needed */
  name: string;
  lat: number;
  lon: number;
  /** Heading in degrees (0–360). Null when the device didn't report one. */
  h: number | null;
  /** Speed in m/s. Null when unavailable. */
  s: number | null;
  r: EmployeeRole;
  /** Region ID */
  rid: number;
  /** Active task/plan ID, or null if the employee isn't assigned to one */
  tid: number | null;
  /** Unix timestamp (seconds) the ping was generated */
  ts: number;
};

export type TrackingFilter = {
  regionId: number | 'all';
  role: RoleFilter;
};

export type StalenessLevel = 'live' | 'aging' | 'critical';
