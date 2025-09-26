import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class CustomMessageService {
  private messageService = inject(MessageService);

  constructor() {}

  showSuccess(detail: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: detail,
      life: 3000,
    });
  }

  showInfo(detail: string) {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: detail,
      life: 3000,
    });
  }

  showWarn(detail: string) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Warning',
      detail: detail,
      life: 3000,
    });
  }

  showError(detail: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: detail,
      life: 3000,
    });
  }
}
