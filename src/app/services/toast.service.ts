import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error'  |  'dismiss';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastMessageSource = new Subject<ToastMessage>();
  toastMessage$ = this.toastMessageSource.asObservable();
  private toastId = 0;

  constructor() { }

  show(message: string, type: 'success' | 'error'): void {
    this.toastMessageSource.next({ id: ++this.toastId, message, type });
  }

  dismiss(toastId: number): void {
    this.toastMessageSource.next({ id: toastId, message: '', type: 'dismiss' });
  }
}