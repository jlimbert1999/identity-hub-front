import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AccessDataSource } from '../../services';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-my-access',
  imports: [CommonModule],
  templateUrl: './my-access.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MyAccess {
  private accesDataSource = inject(AccessDataSource);

  access = toSignal(this.accesDataSource.getMyApplicationms());


  systems = signal<any[]>([
    {
      id: '1',
      name: 'ERP Corporativo',
      description: 'Gestión de recursos, finanzas y facturación electrónica.',
      imageUrl: 'assets/icons/erp.svg',
      url: 'https://erp.tuempresa.com',
    },
    {
      id: '2',
      name: 'Gestión de RRHH',
      description: 'Control de asistencia, vacaciones y nómina de empleados.',
      imageUrl: 'assets/icons/hr.svg',
      url: 'https://hr.tuempresa.com',
    },
    // ... más apps
  ]);

  openApp(url: string) {
    // Abre en una nueva pestaña
    window.open(url, '_blank');
  }
}
