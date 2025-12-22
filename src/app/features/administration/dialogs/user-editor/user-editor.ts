import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

import { UserDataSource } from '../../services';
import { ClientResponse } from '../../interfaces';

@Component({
  selector: 'app-user-editor',
  imports: [ReactiveFormsModule, FloatLabelModule, InputTextModule, ButtonModule, PasswordModule],
  template: `
    <form [formGroup]="roleForm" (ngSubmit)="save()">
      <div class="grid sm:grid-cols-1 lg:grid-cols-2 gap-x-2 gap-y-6 pt-1">
        <div class="sm:col-span-2">
          <p-floatlabel variant="on">
            <input
              id="fullName"
              [fluid]="true"
              pInputText
              autocomplete="off"
              formControlName="fullName"
            />
            <label for="fullName">Nombre completo</label>
          </p-floatlabel>
        </div>
        <div>
          <p-floatlabel variant="on">
            <input
              id="login"
              [fluid]="true"
              pInputText
              autocomplete="off"
              formControlName="login"
            />
            <label for="login">Usuario</label>
          </p-floatlabel>
        </div>
        <div>
          <p-floatlabel variant="on">
            <p-password
              formControlName="password"
              [fluid]="true"
              [feedback]="false"
              [toggleMask]="true"
              inputId="password"
            />
            <label for="password">Contraseña</label>
          </p-floatlabel>
        </div>
        <div>
          <p-floatlabel variant="on">
            <input
              id="relationKey"
              [fluid]="true"
              pInputText
              autocomplete="off"
              formControlName="relationKey"
            />
            <label for="relationKey">Clave de relación</label>
          </p-floatlabel>
        </div>
      </div>
      <div class="p-dialog-footer">
        <p-button label="Cancelar" type="button" severity="secondary" (onClick)="close()" />
        <p-button label="Guardar" type="submit" [disabled]="roleForm.invalid" />
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEditor {
  private _formBuilder = inject(FormBuilder);
  private dialogRef = inject(DynamicDialogRef);
  private userDataSource = inject(UserDataSource);

  readonly data?: ClientResponse = inject(DynamicDialogConfig).data;

  roleForm: FormGroup = this._formBuilder.nonNullable.group({
    fullName: ['', Validators.required],
    login: ['', Validators.required],
    password: ['', Validators.required],
    relationKey: [''],
  });

  ngOnInit() {
    this.loadForm();
  }

  save() {
    const saveObservable = this.data
      ? this.userDataSource.update(this.data.id, this.roleForm.value)
      : this.userDataSource.create(this.roleForm.value);
    saveObservable.subscribe((resp) => {
      this.dialogRef.close(resp);
    });
  }

  close() {
    this.dialogRef.close();
  }

  private loadForm() {
    if (!this.data) return;
    this.roleForm.patchValue(this.data);
  }
}
