import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthDataSource } from '../services';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule],
  template: `
    <nav class="h-full flex flex-col">
      <!-- LOGO -->
      <div class="h-14 flex items-center px-4 border-b border-surface-200">
        <span class="text-lg font-bold text-primary-700"> </span>
      </div>

      <!-- MENU -->
      <ul class="flex-1 p-2 space-y-1 overflow-auto">
        @for (item of menu(); track $index) {
        <li>
          <a
            [routerLink]="item.routerLink"
            routerLinkActive="bg-primary-50 text-primary-700"
            [routerLinkActiveOptions]="{ exact: true }"
            class="
            flex items-center gap-3 px-3 py-2 rounded-lg
            text-surface-700
            hover:bg-surface-100
            transition-colors
          "
          >
            <i class="pi {{ item.icon }}"></i>
            <span class="text-sm font-medium">
              {{ item.label }}
            </span>
          </a>
        </li>
        }
      </ul>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
  private authDataSource = inject(AuthDataSource);
  menu = this.authDataSource.menu;
}
