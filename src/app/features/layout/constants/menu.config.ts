import { MenuItem } from 'primeng/api';

export const MENU_ACTIONS: MenuItem[] = [
  {
    label: 'Usuarios',
    routerLink: '/users',
    roles: ['ADMIN'],
  },
  {
    label: 'Aplicaciones',
    routerLink: '/applications',
    roles: ['ADMIN'],
  },
  {
    label: 'Mis Apps',
    routerLink: '/apps',
    icon: 'pi-th-large',
    roles: ['USER'],
  },
];

//  { label: 'Dashboard', icon: 'pi pi-home', items: [{ label: 'Preueb', }] },
//     { label: 'Usuarios', icon: 'pi pi-users', routerLink: '/admin/users' },
//     { label: 'Roles', icon: 'pi pi-lock', routerLink: '/admin/roles' },
//     { label: 'Configuración', icon: 'pi pi-cog', routerLink: '/admin/settings' },
//     { label: 'Mis Accesos', icon: 'pi  pi-th-large', routerLink: 'apps' },
