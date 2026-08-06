import {
  Bot,
  Pill,
  Cross,
  Truck,
  Gift,
  Users,
  MapPin,
  Package,
  Folders,
  Building2,
  BarChart3,
  FlaskConical,
  LayoutDashboard,
  Target,
  Route,
  ShieldCheck,
  type LucideIcon,
  Radar,
} from 'lucide-react';

import type { PermissionRequirement } from '@/shared/api';

export const SIDEBAR_COOKIE_NAME = 'sidebar_state';
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
export const SIDEBAR_WIDTH = '16rem';
export const SIDEBAR_WIDTH_MOBILE = '18rem';
export const SIDEBAR_WIDTH_ICON = '3rem';
export const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

export type NavSubItem = {
  label: string;
  url: string;
  permission?: PermissionRequirement;
};

export type SidebarItem = {
  label: string;
  url: string;
  icon?: LucideIcon;
  items?: NavSubItem[];
  exact?: boolean;
  permission?: PermissionRequirement;
};

export type NavSection = {
  sectionLabel?: string;
  items: SidebarItem[];
};

export const sidebarData: NavSection[] = [
  {
    items: [
      {
        label: 'labels.dashboard',
        url: '/dashboard/overview',
        icon: LayoutDashboard,
        exact: true,
        permission: 'dashboard.overview',
      },
      { label: 'labels.chat', url: '/chat', icon: Bot },
    ],
  },

  {
    sectionLabel: 'sections.sales',
    items: [
      {
        label: 'labels.orders',
        url: '/dashboard/orders',
        icon: Package,
        permission: ['erp.orders.view', 'erp.orders.view.own'],
      },
      {
        label: 'labels.plans',
        url: '/dashboard/plans',
        icon: Route,
        permission: ['planner.plan.view', 'planner.plan.view.own'],
      },
      {
        label: 'labels.targets',
        url: '/dashboard/targets',
        icon: Target,
        permission: 'erp.targets.view',
      },
      {
        label: 'labels.pharmacies',
        url: '/dashboard/pharmacies',
        icon: Cross,
        permission: 'erp.pharmacies.view',
      },
      {
        label: 'labels.promotions',
        url: '/dashboard/promotions',
        icon: Gift,
        items: [
          {
            label: 'promotions.offers',
            url: '/dashboard/promotions/offers',
            permission: 'erp.offers.view',
          },
          {
            label: 'promotions.gifts',
            url: '/dashboard/promotions/gifts',
            permission: 'erp.gifts.view',
          },
        ],
      },
    ],
  },

  {
    sectionLabel: 'sections.analytics',
    items: [
      {
        label: 'labels.metrics',
        url: '/dashboard/metrics',
        icon: BarChart3,
        items: [
          {
            label: 'metrics.seasonal',
            url: '/dashboard/metrics/seasonal',
            permission: 'crm.analytics.view',
          },
          {
            label: 'metrics.medicine',
            url: '/dashboard/metrics/medicine',
            permission: 'crm.analytics.view',
          },
          {
            label: 'metrics.area',
            url: '/dashboard/metrics/area',
            permission: 'crm.analytics.view',
          },
          {
            label: 'metrics.pharmacy',
            url: '/dashboard/metrics/pharmacy',
            permission: 'crm.analytics.view',
          },
        ],
      },
    ],
  },

  {
    sectionLabel: 'sections.operations',
    items: [
      {
        label: 'labels.tracking',
        url: '/dashboard/tracking',
        icon: Radar,
        permission: 'tracking.view_live',
      },
      {
        label: 'labels.deliveries',
        url: '/dashboard/deliveries',
        icon: Truck,
        permission: 'planner.deliveries.view',
      },
    ],
  },

  {
    sectionLabel: 'sections.catalog',
    items: [
      {
        label: 'labels.medicines',
        url: '/dashboard/medicines',
        icon: Pill,
        items: [
          {
            label: 'medicines.list',
            url: '/dashboard/medicines',
            permission: 'erp.medicines.view',
          },
          {
            label: 'medicines.scanMedicine',
            url: '/dashboard/medicines/scan',
            permission: 'erp.medicines.view',
          },
        ],
      },
      {
        label: 'labels.categories',
        url: '/dashboard/categories',
        icon: Folders,
        permission: 'erp.categories.view',
      },
      {
        label: 'labels.laboratories',
        url: '/dashboard/laboratories',
        icon: FlaskConical,
        permission: 'erp.laboratories.view',
      },
    ],
  },

  {
    sectionLabel: 'sections.masterData',
    items: [
      {
        label: 'labels.cities',
        url: '/dashboard/cities',
        icon: Building2,
        permission: 'erp.cities.view',
      },
      {
        label: 'labels.regions',
        url: '/dashboard/regions',
        icon: MapPin,
        permission: 'erp.regions.view',
      },
    ],
  },

  {
    sectionLabel: 'sections.administration',
    items: [
      {
        label: 'labels.employees',
        url: '/dashboard/employees',
        icon: Users,
        permission: ['erp.employees.view', 'erp.employees.view.own'],
      },
      {
        label: 'labels.roles',
        url: '/dashboard/roles',
        icon: ShieldCheck,
        permission: 'auth.roles.manage',
      },
    ],
  },
];
