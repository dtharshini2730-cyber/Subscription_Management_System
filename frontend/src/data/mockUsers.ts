import { User } from '@/types';

export const mockUsers: User[] = [
  {
    id: 'usr-admin-01',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@brightloop.io',
    role: 'ADMIN',
    companyName: 'Brightloop Software',
    phone: '+1 (555) 234-5678',
    createdAt: '2026-01-15T09:00:00Z',
  },
  {
    id: 'usr-staff-01',
    name: 'Alex Morgan',
    email: 'alex.morgan@brightloop.io',
    role: 'STAFF',
    companyName: 'Brightloop Software',
    phone: '+1 (555) 345-6789',
    createdAt: '2026-02-01T10:30:00Z',
  },
  {
    id: 'usr-cust-01',
    name: 'David Chen',
    email: 'david.chen@apexlogistics.com',
    role: 'CUSTOMER',
    companyName: 'Apex Logistics Inc.',
    phone: '+1 (555) 876-5432',
    createdAt: '2026-03-10T14:15:00Z',
  },
];
