import { ChangeDetectionStrategy, Component, inject, linkedSignal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { TableModule, TablePageEvent } from 'primeng/table';
import { DialogService } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';

import { ClientDataSource } from '../../services';
import { SearchInput } from '../../../../shared';
import { ClientResponse } from '../../interfaces';
import { ClientEditor } from '../../dialogs';

@Component({
  selector: 'app-client-admin',
  imports: [ButtonModule, TableModule, SearchInput],
  templateUrl: './client-admin.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ClientAdmin {
  private dialogService = inject(DialogService);
  private clientDataSource = inject(ClientDataSource);

  limit = signal(10);
  offset = signal(0);
  searchTerm = signal('');
  roleResource = rxResource({
    params: () => ({
      offset: this.offset(),
      limit: this.limit(),
      term: this.searchTerm(),
    }),
    stream: ({ params }) => this.clientDataSource.findAll(params.limit, params.offset, params.term),
  });

  dataSource = linkedSignal(() => {
    if (!this.roleResource.hasValue()) return [];
    return this.roleResource.value().clients;
  });

  dataSize = linkedSignal(() => {
    if (!this.roleResource.hasValue()) return 0;
    return this.roleResource.value().total;
  });

  openCreateDialog() {
    const dialogRef = this.dialogService.open(ClientEditor, {
      header: 'Crear rol',
      modal: true,
      draggable: false,
      width: '40vw',
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
    });
    dialogRef?.onClose.subscribe((result?: ClientResponse) => {
      if (!result) return;
      this.insreNewItemDataSource(result);
    });
  }

  openUpdateDialog(item: any) {
    const dialogRef = this.dialogService.open(ClientEditor, {
      header: 'Editar rol',
      modal: true,
      width: '30vw',
      data: item,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
    });
    dialogRef?.onClose.subscribe((result?: ClientResponse) => {
      if (!result) return;
      this.updateItemDataSource(result);
    });
  }

  search(term: string) {
    this.offset.set(0);
    this.searchTerm.set(term);
  }

  changePage(event: TablePageEvent) {
    this.limit.set(event.rows);
    this.offset.set(event.first);
  }

  private insreNewItemDataSource(item: ClientResponse): void {
    this.dataSource.update((values) => [item, ...values]);
    this.dataSize.update((value) => (value += 1));
  }

  private updateItemDataSource(item: ClientResponse): void {
    const index = this.dataSource().findIndex(({ id }) => item.id === id);
    if (index == -1) return;
    this.dataSource.update((values) => {
      values[index] = item;
      return [...values];
    });
  }
}
