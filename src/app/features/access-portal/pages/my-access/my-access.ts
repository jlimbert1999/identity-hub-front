import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

import { AccessDataSource } from '../../services';

@Component({
  selector: 'app-my-access',
  imports: [CommonModule],
  templateUrl: './my-access.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MyAccess {
  private accesDataSource = inject(AccessDataSource);

  applications = toSignal(this.accesDataSource.getMyApplicationms());

  openApp(url: string) {
    window.open(url, '_blank');
  }
}
