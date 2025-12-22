import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';

import { DrawerModule } from 'primeng/drawer';

import { Sidebar } from '../../components';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterModule, Sidebar, DrawerModule, ButtonModule],
  templateUrl: './admin-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
  /* Sidebar desktop enter */
.sidebar-enter {
  animation: sidebar-slide-in 250ms ease-out both;
}

/* Sidebar desktop leave */
.sidebar-leave {
  animation: sidebar-slide-out 200ms ease-in both;
}

@keyframes sidebar-slide-in {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes sidebar-slide-out {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-100%);
  }
}

  `,
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
