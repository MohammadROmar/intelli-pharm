import {
  Tags,
  Users,
  PillBottle,
  LayoutDashboard,
  Package,
  Pipette,
  Building2,
  MapPin,
  Cross,
} from 'lucide-react';

export const SIDEBAR_COOKIE_NAME = 'sidebar_state';
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
export const SIDEBAR_WIDTH = '16rem';
export const SIDEBAR_WIDTH_MOBILE = '18rem';
export const SIDEBAR_WIDTH_ICON = '3rem';
export const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

export const sidebarData = [
  {
    key: 'labels.dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    key: 'labels.orders',
    url: '/dashboard/orders',
    icon: Package,
  },
  {
    key: 'labels.laboratories',
    url: '/dashboard/laboratories',
    icon: Pipette,
  },
  {
    key: 'labels.cities',
    url: '/dashboard/cities',
    icon: Building2,
  },
  {
    key: 'labels.regions',
    url: '/dashboard/regions',
    icon: MapPin,
    items: [
      {
        key: 'regions.list',
        url: '/dashboard/regions',
      },
      {
        key: 'regions.new',
        url: '/dashboard/regions/new',
      },
    ],
  },
  {
    key: 'labels.pharmacies',
    url: '/dashboard/pharmacies',
    icon: Cross,
    items: [
      {
        key: 'pharmacies.list',
        url: '/dashboard/pharmacies',
      },
      {
        key: 'pharmacies.new',
        url: '/dashboard/pharmacies/new',
      },
    ],
  },
  {
    key: 'labels.medicines',
    url: '/dashboard/medicines',
    icon: PillBottle,
    isActive: false,
    items: [
      {
        key: 'medicines.list',
        url: '/dashboard/medicines',
      },
      {
        key: 'medicines.new',
        url: '/dashboard/medicines/new',
      },
    ],
  },
  {
    key: 'labels.categories',
    url: '/dashboard/categories',
    icon: Tags,
    isActive: false,
    items: [
      {
        key: 'categories.list',
        url: '/dashboard/categories',
      },
      {
        key: 'categories.new',
        url: '/dashboard/categories/new',
      },
    ],
  },
  {
    key: 'labels.employees',
    url: '/dashboard/employees',
    icon: Users,
    isActive: false,
    items: [
      {
        key: 'employees.list',
        url: '/dashboard/employees',
      },
      {
        key: 'employees.new',
        url: '/dashboard/employees/new',
      },
    ],
  },
];
