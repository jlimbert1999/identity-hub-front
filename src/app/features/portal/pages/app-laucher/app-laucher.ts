import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-app-laucher',
  imports: [CommonModule],
  templateUrl: './app-laucher.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AppLaucher {
  systems = [
    { title: 'Ventas', icon: 'pi pi-shopping-cart', color: 'bg-blue-500', route: '/sales' },
    { title: 'Inventario', icon: 'pi pi-box', color: 'bg-orange-500', route: '/stock' },
    { title: 'RRHH', icon: 'pi pi-users', color: 'bg-purple-500', route: '/hr' },
    { title: 'Reportes', icon: 'pi pi-chart-bar', color: 'bg-green-500', route: '/reports' },
    { title: 'Ajustes', icon: 'pi pi-cog', color: 'bg-slate-600', route: '/settings' },
    { title: 'Clientes', icon: 'pi pi-id-card', color: 'bg-pink-500', route: '/clients' },
  ];

  apps = [
    {
      id: 'intranet',
      name: 'Intranet',
      icon: 'pi pi-building',
      url: 'https://intranet.midominio.gob.bo',
    },
    {
      id: 'tramites',
      name: 'Trámites',
      icon: 'pi pi-file',
      url: 'https://tramites.midominio.gob.bo',
    },
    {
      id: 'mascotas',
      name: 'Mascotas',
      icon: 'pi pi-heart',
      url: 'https://mascotas.midominio.gob.bo',
    },
    {
      id: 'reportes',
      name: 'Reportes',
      icon: 'pi pi-chart-bar',
      url: 'https://reportes.midominio.gob.bo',
    },
  ];

  openApp(app: any) {
    window.location.href = app.url;
  }
}
