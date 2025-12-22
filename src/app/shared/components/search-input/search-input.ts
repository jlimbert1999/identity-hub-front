import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';

import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'search-input',
  imports: [
    ReactiveFormsModule,
    FloatLabelModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
  ],
  template: `
    <p-floatlabel iconPosition="left" class="ml-auto" variant="on">
      <p-iconfield>
        <p-inputicon class="pi pi-search" />
        <input pInputText type="text" [formControl]="searchControl" class="w-full" />
      </p-iconfield>
      <label>{{ label() }}</label>
    </p-floatlabel>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInput {
  private destroyRef = inject(DestroyRef);

  label = input<string>('Buscar');
  searchControl = new FormControl('');
  search = output<string>();

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(450),
        takeUntilDestroyed(this.destroyRef),
        distinctUntilChanged(),
        filter((term) => term !== null)
      )
      .subscribe((term) => {
        this.search.emit(term);
      });
  }
}
