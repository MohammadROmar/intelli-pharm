import type { PaginatedResponse } from '@/shared/api';

export type TargetType = 'monthly' | 'quarterly' | 'yearly';

export type Target = {
  id: number;
  type: TargetType;
  name: string;
  description: string;
  value: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type TargetAchievement = {
  representative_id: number;
  representative_name: string;
  achieved_at: string;
  achieved_value: number;
};

export type TargetResponse = PaginatedResponse<Target>;
export type TargetAchievementResponse = PaginatedResponse<TargetAchievement>;

export type EditTargetDto = {
  name: string;
  value: string;
  is_active: boolean;
};

export type TypeFilters = 'monthly' | 'quarterly' | '' | undefined;
export type BooleanFilter = '1' | '0' | undefined;

export type TargetFilters = { type?: TypeFilters; is_active?: BooleanFilter };

export type TargetAchievementFilters = {
  achieved_at?: string | undefined;
  year?: string | undefined;
  month?: string | undefined;
  quarter?: string | undefined;
};
