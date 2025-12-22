import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { ClientDataSource } from '../../services';
import { ClientResponse } from '../../interfaces';

@Component({
  selector: 'app-client-editor',
  imports: [ReactiveFormsModule, FloatLabelModule, InputTextModule, ButtonModule],
  templateUrl: './client-editor.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientEditor {
  private _formBuilder = inject(FormBuilder);
  private dialogRef = inject(DynamicDialogRef);
  private clientDataSource = inject(ClientDataSource);

  readonly data?: ClientResponse = inject(DynamicDialogConfig).data;

  roleForm: FormGroup = this._formBuilder.nonNullable.group({
    name: ['', Validators.required],
    clientKey: ['', Validators.required],
    description: [''],
    baseUrl: ['', Validators.required],
    defaultRole: ['', Validators.required],
  });

  ngOnInit() {
    this.loadForm();
  }

  save() {
    const saveObservable = this.data
      ? this.clientDataSource.update(this.data.id, this.roleForm.value)
      : this.clientDataSource.create(this.roleForm.value);
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
