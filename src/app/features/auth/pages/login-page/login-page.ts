import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/message';

import { environment } from '../../../../../environments/environment';

const ERROR_MESSAGES: Record<string, string> = {
  invalid_credentials: 'Usuario o contraseña incorrectos.',
  user_disabled: 'El usuario ha sido deshabilitado.',
};
@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    Message,
  ],
  template: `
    <div class="min-h-screen flex flex-col bg-surface-100 relative">
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

          <form [formGroup]="loginForm" (ngSubmit)="login()">
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
                <p-checkbox id="rememberme" formControlName="remember" [binary]="true"></p-checkbox>
                <label for="rememberme" class="text-surface-900 leading-normal">
                  Recordar usuario
                </label>
              </div>
              @if(errorMessage()){
              <p-message severity="error" icon="pi pi-times-circle" styleClass="mb-2">
                {{ errorMessage() }}
              </p-message>
              }
              <button pButton type="submit" class="w-full" [disabled]="loginForm.invalid">
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
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  private hideTimer: ReturnType<typeof setTimeout> | null = null;

  errorMessage = signal<string | null>(null);
  hidePassword = true;
  loginForm: FormGroup = this._formBuilder.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
    remember: [false],
  });

  ngOnInit(): void {
    this.loadForm();
    this.handleLoginErrorMessages();
  }

  login() {
    if (this.loginForm.invalid) return;

    const { login, password, remember } = this.loginForm.value;

    const url = new URL(window.location.href);

    const authRequestId = url.searchParams.get('auth_request_id');

    const form = document.createElement('form');
    form.method = 'POST';

    let action = `${environment.baseUrl}/auth/login`;
    if (authRequestId) {
      action += `?auth_request_id=${authRequestId}`;
    }

    form.action = action;
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
    if (remember) {
      localStorage.setItem('login', login);
    } else {
      localStorage.removeItem('login');
    }
    form.submit();
  }

  private loadForm(): void {
    const loginSaved = localStorage.getItem('login');
    if (loginSaved) {
      this.loginForm.patchValue({ login: loginSaved, remember: true });
    }
  }

  private handleLoginErrorMessages() {
    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const error = params.get('error');
      if (error) {
        const message = ERROR_MESSAGES[error] ?? 'No se pudo iniciar sesión.';
        this.showMessage(message, 5000);
      }
    });
  }

  private showMessage(text: string, life = 3000): void {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
    this.errorMessage.set(text);
    this.hideTimer = setTimeout(() => {
      this.errorMessage.set(null);
      this.hideTimer = null;
    }, life);
  }
}
