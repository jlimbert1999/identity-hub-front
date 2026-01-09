import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

import { finalize } from 'rxjs';

import { AccessDataSource } from '../../services';

@Component({
  selector: 'app-my-access',
  imports: [CommonModule],
  templateUrl: './my-access.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MyAccess {
  private accesDataSource = inject(AccessDataSource);

  isLoading = signal(true);
  applications = toSignal(
    this.accesDataSource.getMyApplicationms().pipe(finalize(() => this.isLoading.set(false)))
  );

  openApp(url: string) {
    window.open(url, '_blank');
  }
}
