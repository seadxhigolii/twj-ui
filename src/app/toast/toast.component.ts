import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastService, ToastMessage } from '../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  toasts: ToastMessage[] = [];
  private subscription: Subscription;

  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
    this.subscription = this.toastService.toastMessage$.subscribe((toast: ToastMessage) => {
      if (toast.type === 'dismiss') {
        this.toasts = this.toasts.filter(t => t.id !== toast.id);
      } else {
        this.toasts.push(toast);
        setTimeout(() => this.dismissToast(toast.id), 5000);
      }
    });
  }

  dismissToast(toastId: number): void {
    this.toasts = this.toasts.filter(toast => toast.id !== toastId);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
