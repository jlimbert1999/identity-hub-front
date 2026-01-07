import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { ClientDataSource } from '../../services';
import { ClientResponse } from '../../interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-application-editor',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    ButtonModule,
    AutoCompleteModule,
  ],
  templateUrl: './application-editor.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationEditor {
  private _formBuilder = inject(FormBuilder);
  private dialogRef = inject(DynamicDialogRef);
  private clientDataSource = inject(ClientDataSource);

  readonly data?: ClientResponse = inject(DynamicDialogConfig).data;

  applicationForm: FormGroup = this._formBuilder.nonNullable.group({
    name: ['', Validators.required],
    clientId: ['', Validators.required],
    description: [''],
    launchUrl: ['', Validators.required],
    defaultRole: ['', Validators.required],
    isConfidential: [true, Validators.required],
    isActive: [true, Validators.required],
    redirectUris: [[], Validators.required],
  });

  ngOnInit() {
    this.loadForm();
  }

  save() {
    const saveObservable = this.data
      ? this.clientDataSource.update(this.data.id, this.applicationForm.value)
      : this.clientDataSource.create(this.applicationForm.value);
    saveObservable.subscribe((resp) => {
      this.dialogRef.close(resp);
    });
  }

  close() {
    this.dialogRef.close();
  }

  private loadForm() {
    if (!this.data) return;
    this.applicationForm.patchValue(this.data);
  }
}
