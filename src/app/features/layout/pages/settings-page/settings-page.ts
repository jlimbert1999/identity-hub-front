import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-settings-page',
  imports: [PasswordModule],
  templateUrl: './settings-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SettingsPage {}
