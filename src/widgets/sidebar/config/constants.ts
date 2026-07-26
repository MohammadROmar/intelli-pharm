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
  type LucideIcon,
  Radar,
} from 'lucide-react';

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
      {
        label: 'labels.plans',
        url: '/dashboard/plans',
        icon: Route,
      },
      {
        label: 'labels.tracking',
        url: '/dashboard/tracking',
        icon: Radar,
      },
      { label: 'labels.pharmacies', url: '/dashboard/pharmacies', icon: Cross },
      {
        label: 'labels.promotions',
        url: '/dashboard/promotions',
        icon: Gift,
        items: [
          { label: 'promotions.offers', url: '/dashboard/promotions/offers' },
          { label: 'promotions.gifts', url: '/dashboard/promotions/gifts' },
        ],
      },
      { label: 'labels.targets', url: '/dashboard/targets', icon: Target },
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
