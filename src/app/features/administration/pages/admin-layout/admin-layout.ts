import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';

import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';

import { Sidebar } from '../../components';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterModule, Sidebar, DrawerModule, ButtonModule, AvatarModule],
  templateUrl: './admin-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AdminLayout {
  isMobile = signal(false);
  mobileMenuOpen = signal(false);

  constructor(private breakpoint: BreakpointObserver) {
    this.breakpoint
      .observe('(max-width: 1023px)') // lg
      .subscribe(({ matches }) => {
        if (!matches) {
          this.mobileMenuOpen.set(false);
        }
        this.isMobile.set(matches);
      });
  }

  openMobileMenu() {
    this.mobileMenuOpen.set(true);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }
}
