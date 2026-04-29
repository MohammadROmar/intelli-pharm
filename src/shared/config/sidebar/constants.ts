import {
  Bot,
  Pill,
  Tag,
  Cross,
  Truck,
  Users,
  MapPin,
  Package,
  Folders,
  Building2,
  BarChart3,
  FlaskConical,
  LayoutDashboard,
  type LucideIcon,
} from 'lucide-react';

export const SIDEBAR_COOKIE_NAME = 'sidebar_state';
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
export const SIDEBAR_WIDTH = '16rem';
export const SIDEBAR_WIDTH_MOBILE = '18rem';
export const SIDEBAR_WIDTH_ICON = '3rem';
export const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

export type NavSubItem = {
  label: string;
  url: string;
};

export type SidebarItem = {
  label: string;
  url: string;
  icon?: LucideIcon;
  items?: NavSubItem[];
  exact?: boolean;
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
        url: '/dashboard',
        icon: LayoutDashboard,
        exact: true,
      },
      { label: 'labels.chat', url: '/chat', icon: Bot },
    ],
  },

  {
    sectionLabel: 'sections.sales',
    items: [
      { label: 'labels.orders', url: '/dashboard/orders', icon: Package },
      { label: 'labels.pharmacies', url: '/dashboard/pharmacies', icon: Cross },
      {
        label: 'labels.promotions',
        url: '/dashboard/promotions',
        icon: Tag,
        items: [
          { label: 'promotions.offers', url: '/dashboard/promotions/offers' },
          { label: 'promotions.gifts', url: '/dashboard/promotions/gifts' },
        ],
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
          { label: 'medicines.list', url: '/dashboard/medicines' },
          { label: 'medicines.scanMedicine', url: '/dashboard/medicines/scan' },
        ],
      },
      {
        label: 'labels.categories',
        url: '/dashboard/categories',
        icon: Folders,
      },
      {
        label: 'labels.laboratories',
        url: '/dashboard/laboratories',
        icon: FlaskConical,
      },
    ],
  },

  {
    sectionLabel: 'sections.logistics',
    items: [
      {
        label: 'labels.deliveries',
        url: '/dashboard/deliveries',
        icon: Truck,
        items: [
          { label: 'deliveries.list', url: '/dashboard/deliveries' },
          { label: 'deliveries.assign', url: '/dashboard/deliveries/assign' },
        ],
      },
      {
        label: 'labels.metrics',
        url: '/dashboard/metrics',
        icon: BarChart3,
        items: [
          { label: 'metrics.seasonal', url: '/dashboard/metrics/seasonal' },
          { label: 'metrics.medicine', url: '/dashboard/metrics/medicine' },
          { label: 'metrics.area', url: '/dashboard/metrics/area' },
          { label: 'metrics.pharmacy', url: '/dashboard/metrics/pharmacy' },
        ],
      },
      { label: 'labels.regions', url: '/dashboard/regions', icon: MapPin },
    ],
  },

  {
    sectionLabel: 'sections.reference',
    items: [
      { label: 'labels.cities', url: '/dashboard/cities', icon: Building2 },
      { label: 'labels.employees', url: '/dashboard/employees', icon: Users },
    ],
  },
];
