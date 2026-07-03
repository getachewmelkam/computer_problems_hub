import {
  Cpu,
  MonitorCheck,
  Wifi,
  Code2,
  ShieldCheck,
  Server,
} from 'lucide-react';

// The single source of truth for the 6 macro-categories.
// Each entry carries its own accent color (see tailwind.config.js -> colors.cat)
// so the color-coding stays consistent across cards, badges, and detail pages.
export const CATEGORIES = [
  {
    id: 'physical-infrastructure',
    name: 'Physical Infrastructure',
    tagline: 'Power, cabling, thermals, and hardware failure',
    icon: Cpu,
    color: 'cat-hardware',
    hex: '#E4572E',
    subCategories: [
      'Power & PSU',
      'Storage Drives',
      'Memory (RAM)',
      'Motherboard',
      'Cooling & Thermals',
      'Peripherals',
    ],
  },
  {
    id: 'operating-systems',
    name: 'Operating Systems',
    tagline: 'Boot failures, updates, drivers, and system crashes',
    icon: MonitorCheck,
    color: 'cat-os',
    hex: '#3B6E8F',
    subCategories: [
      'Windows',
      'macOS',
      'Linux',
      'Boot & Startup',
      'Drivers',
      'System Updates',
    ],
  },
  {
    id: 'connectivity',
    name: 'Connectivity',
    tagline: 'Wi-Fi, Ethernet, DNS, and network diagnostics',
    icon: Wifi,
    color: 'cat-network',
    hex: '#0D9488',
    subCategories: [
      'Wi-Fi',
      'Ethernet',
      'DNS & Routing',
      'VPN',
      'Bandwidth',
      'Router/Modem',
    ],
  },
  {
    id: 'software-code',
    name: 'Software & Code',
    tagline: 'Application errors, dependencies, and dev environments',
    icon: Code2,
    color: 'cat-software',
    hex: '#7C5CBF',
    subCategories: [
      'Application Crashes',
      'Installation',
      'Compatibility',
      'Dev Environment',
      'Licensing',
      'Package Managers',
    ],
  },
  {
    id: 'security-identity',
    name: 'Security & Identity',
    tagline: 'Malware, account access, and authentication issues',
    icon: ShieldCheck,
    color: 'cat-security',
    hex: '#C23B4E',
    subCategories: [
      'Malware & Viruses',
      'Account Lockouts',
      'Password Resets',
      'Phishing',
      'Firewall',
      'Data Backup',
    ],
  },
  {
    id: 'specialized-workloads',
    name: 'Specialized Workloads',
    tagline: 'Servers, virtualization, printing, and AV equipment',
    icon: Server,
    color: 'cat-workload',
    hex: '#D4A72C',
    subCategories: [
      'Servers',
      'Virtualization',
      'Printing',
      'Audio/Visual',
      'POS Systems',
      'Cloud Services',
    ],
  },
];

export function getCategoryById(id) {
  return CATEGORIES.find((c) => c.id === id);
}

export function getCategoryByName(name) {
  return CATEGORIES.find((c) => c.name === name);
}
