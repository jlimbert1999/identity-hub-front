import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { PopoverModule } from 'primeng/popover';
import { AvatarModule } from 'primeng/avatar';

import { AuthDataSource } from '../../services';

@Component({
  selector: 'profile-overlay',
  imports: [AvatarModule, PopoverModule, CommonModule],
  template: `
    <p-avatar icon="pi pi-user" shape="circle" (click)="op.toggle($event)" />
    <p-popover #op > 
      <ng-template pTemplate="content">
        <div class="w-[300px]">
          <div class="flex flex-col items-center p-0">
            <div class="w-full flex justify-end mb-2">
              <button (click)="op.hide()" class="p-1 hover:bg-gray-100 rounded-full text-gray-500">
                <i class="pi pi-times"></i>
              </button>
            </div>

            <div class="relative group mb-3">
              <img
                src="https://www.w3schools.com/howto/img_avatar.png"
                alt="User"
                class="w-20 h-20 rounded-full object-cover border border-gray-100"
              />
              <div
                class="absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full p-1 cursor-pointer"
              >
                <i class="pi pi-camera text-xs"></i>
              </div>
            </div>

            <span class="font-semibold text-lg text-gray-800">
              {{ user()?.fullName | titlecase }}
            </span>
            <span class="text-sm text-gray-500 mb-4">usuario@correo.com</span>

            <hr class="w-full border-gray-100 mb-2" />

            <div class="w-full flex flex-col gap-1">
              <button
                class="flex items-center gap-3 p-3 w-full hover:bg-gray-50 rounded-lg transition-all text-gray-700"
              >
                <i class="pi pi-user-edit"></i>
                <span>Gestionar cuenta</span>
              </button>

              <button
                class="flex items-center gap-3 p-3 w-full hover:bg-gray-50 rounded-lg transition-all text-gray-700"
              >
                <i class="pi pi-cog"></i>
                <span>Configuración</span>
              </button>

              <button
                (click)="logout()"
                class="flex items-center gap-3 p-3 w-full hover:bg-red-50 rounded-lg transition-all text-red-600 mt-2"
              >
                <i class="pi pi-sign-out"></i>
                <span class="font-medium">Cerrar sesión</span>
              </button>
            </div>
          </div>
        </div>
      </ng-template>
    </p-popover>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileOverlay {
  private router = inject(Router);
  private authDataSource = inject(AuthDataSource);

  user = this.authDataSource.user;

  logout() {
    this.authDataSource.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
