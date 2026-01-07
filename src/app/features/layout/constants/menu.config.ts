import { MenuItem } from 'primeng/api';

export const MENU_ACTIONS: MenuItem[] = [
  {
    label: 'Usuarios',
    routerLink: '/users',
    icon: 'pi-users',
    roles: ['ADMIN'],
  },
  {
    label: 'Sistemas',
    routerLink: '/applications',
    icon: 'pi-box',
    roles: ['ADMIN'],
  },
  {
    label: 'Mis sistemas',
    routerLink: '/apps',
    icon: 'pi-th-large',
    roles: ['USER'],
  },
];
