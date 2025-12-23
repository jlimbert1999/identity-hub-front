import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';

import { AssigmentDataSource } from '../../services';
import { UserResponse } from '../../interfaces';

@Component({
  selector: 'app-user-assigment-editor',
  imports: [CommonModule, FormsModule, SelectModule, ListboxModule, ButtonModule],
  template: `
    <div class="p-2">
      <dl class="-my-3 divide-y divide-gray-200 text-sm">
        <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-4 sm:gap-4">
          <dt class="font-medium text-gray-900">Usuario</dt>

          <dd class="text-gray-700 sm:col-span-2">{{ data.fullName | titlecase }}</dd>
        </div>

        <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt class="font-medium text-gray-900">Correo</dt>

          <dd class="text-gray-700 sm:col-span-2">{{ data.email }}</dd>
        </div>
      </dl>
    </div>
    <div class="mt-6">
      {{ selectApplicationsIds() | json }}
      <p-listbox
        [options]="applications()"
        [multiple]="true"
        [checkbox]="true"
        [filter]="true"
        class="w-full"
        optionValue="id"
        optionLabel="name"
        scrollHeight="600px"
        filterPlaceHolder="Nombre del sistema"
        [(ngModel)]="selectApplicationsIds"
      >
        <ng-template #item let-option>
          <div class="flex flex-col ml-2">
            <p class="font-medium text-primary">{{ option.name }}</p>
            <span class="text-sm">{{ option.description }}</span>
          </div>
        </ng-template>
      </p-listbox>
    </div>
    <div class="p-dialog-footer">
      <p-button
        label="Guardar"
        [disabled]="selectApplicationsIds().length === 0"
        class="p-button-text"
        (onClick)="save()"
      />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAssigmentEditor {
  private assigmentDataSource = inject(AssigmentDataSource);
  private dialogRef = inject(DynamicDialogRef);
  applications = this.assigmentDataSource.applications;

  selectApplicationsIds = signal<number[]>([]);

  readonly data: UserResponse = inject(DynamicDialogConfig).data;

  ngOnInit() {
    this.selectApplicationsIds.set(
      this.data.applications.map(({ applicationId }) => applicationId)
    );
    // console.log(this.data.applications.map((app) => app.id));
  }

  save() {
    this.assigmentDataSource
      .create({ userId: this.data.id, applicationIds: this.selectApplicationsIds() })
      .subscribe(() => {
        this.dialogRef.close();
      });
  }
}
