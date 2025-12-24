import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

import { OauthDataSource } from '../../datasources';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, CheckboxModule, InputTextModule, PasswordModule, ButtonModule],
  template: `
    <div class="min-h-screen flex flex-col bg-surface-50 relative">
      <div class="absolute top-6 left-6 flex items-center">
        <img src="images/logos/gams.png" class="h-16 sm:h-22 object-contain" />
      </div>
      <div class="flex flex-1 items-center justify-center px-4">
        <div
          class="bg-surface-0 shadow-lg p-4 sm:p-8 rounded-xl w-full max-w-lg flex flex-col gap-8"
        >
          <div class="flex flex-col items-center text-center">
            <img src="images/icons/app.png" class="h-18 mb-2" />
            <h2 class="text-2xl font-bold text-gray-800 tracking-tight">
              Registro Institucional de Identidad
            </h2>
            <p class="mt-1 text-gray-500 text-lg">Inicio de sesión</p>
          </div>

          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <div class="flex flex-col gap-6 w-full">
              <div class="flex flex-col gap-1 w-full">
                <label for="login" class="text-surface-900 font-medium leading-normal"
                  >Nombre de usuario
                </label>
                <input
                  pInputText
                  id="login"
                  type="text"
                  placeholder="Ingrese su nombre de usuario"
                  class="w-full px-3 py-2 shadow-sm rounded-lg"
                  formControlName="login"
                />
              </div>
              <div class="flex flex-col gap-1 w-full">
                <label for="password" class="text-surface-900 font-medium leading-normal"
                  >Contraseña</label
                >
                <input
                  pInputText
                  id="password"
                  type="password"
                  placeholder="Ingrese su contraseña"
                  class="w-full px-3 py-2 shadow-sm rounded-lg"
                  formControlName="password"
                />
              </div>
              <div class="flex items-center gap-2">
                <p-checkbox id="rememberme" [binary]="true"></p-checkbox>
                <label for="rememberme" class="text-surface-900 leading-normal">
                  Recordar usuario
                </label>
              </div>
              <button pButton type="submit" class="w-full">
                <span pButtonLabel>Ingresar</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginPage {
  private _formBuilder = inject(FormBuilder);

  private authData = inject(OauthDataSource);
  private router = inject(Router);

  loginForm: FormGroup = this._formBuilder.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
    remember: [false],
  });

  hidePassword = true;

  ngOnInit(): void {
    this.loadForm();
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    const { login, password } = this.loginForm.value;
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = `${environment.baseUrl}/auth/login`;
    form.style.display = 'none';

    const addField = (name: string, value: string) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      form.appendChild(input);
    };

    addField('login', login);
    addField('password', password);

    document.body.appendChild(form);
    form.submit();
  }

  private loadForm(): void {
    const loginSaved = localStorage.getItem('login');
    if (loginSaved) {
      this.loginForm.patchValue({ login: loginSaved, remember: true });
    }
  }
}
