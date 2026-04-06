import {
  Bot,
  Pill,
  Cross,
  Users,
  MapPin,
  Package,
  Folders,
  Building2,
  BarChart3,
  FlaskConical,
  LayoutDashboard,
} from 'lucide-react';

export const SIDEBAR_COOKIE_NAME = 'sidebar_state';
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
export const SIDEBAR_WIDTH = '16rem';
export const SIDEBAR_WIDTH_MOBILE = '18rem';
export const SIDEBAR_WIDTH_ICON = '3rem';
export const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

export const sidebarData = [
  {
    label: 'labels.dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'labels.chat',
    url: '/chat',
    icon: Bot,
  },
  {
    label: 'labels.orders',
    url: '/dashboard/orders',
    icon: Package,
  },
  {
    label: 'labels.laboratories',
    url: '/dashboard/laboratories',
    icon: FlaskConical,
  },
  {
    label: 'labels.cities',
    url: '/dashboard/cities',
    icon: Building2,
  },
  {
    label: 'labels.metrics',
    url: '/dashboard/metrics',
    icon: BarChart3,
    items: [
      {
        label: 'metrics.seasonal',
        url: '/dashboard/metrics/seasonal',
      },
      {
        label: 'metrics.medicine',
        url: '/dashboard/metrics/medicine',
      },
      {
        label: 'metrics.area',
        url: '/dashboard/metrics/area',
      },
      {
        label: 'metrics.pharmacy',
        url: '/dashboard/metrics/pharmacy',
      },
    ],
  },
  {
    label: 'labels.regions',
    url: '/dashboard/regions',
    icon: MapPin,
    items: [
      {
        label: 'regions.list',
        url: '/dashboard/regions',
      },
      {
        label: 'regions.new',
        url: '/dashboard/regions/new',
      },
    ],
  },
  {
    label: 'labels.pharmacies',
    url: '/dashboard/pharmacies',
    icon: Cross,
    items: [
      {
        label: 'pharmacies.list',
        url: '/dashboard/pharmacies',
      },
      {
        label: 'pharmacies.new',
        url: '/dashboard/pharmacies/new',
      },
    ],
  },
  {
    label: 'labels.medicines',
    url: '/dashboard/medicines',
    icon: Pill,
    isActive: false,
    items: [
      {
        label: 'medicines.list',
        url: '/dashboard/medicines',
      },
      {
        label: 'medicines.scanMedicine',
        url: '/dashboard/medicines/scan',
      },
      {
        label: 'medicines.new',
        url: '/dashboard/medicines/new',
      },
    ],
  },
  {
    label: 'labels.categories',
    url: '/dashboard/categories',
    icon: Folders,
    isActive: false,
    items: [
      {
        label: 'categories.list',
        url: '/dashboard/categories',
      },
      {
        label: 'categories.new',
        url: '/dashboard/categories/new',
      },
    ],
  },
  {
    label: 'labels.employees',
    url: '/dashboard/employees',
    icon: Users,
    isActive: false,
    items: [
      {
        label: 'employees.list',
        url: '/dashboard/employees',
      },
      {
        label: 'employees.new',
        url: '/dashboard/employees/new',
      },
    ],
  },
];
