import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private toastService: ToastService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userInitiated = req.headers.get('X-User-Initiated')?.trim().toLowerCase() === 'true';
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse && userInitiated) {
          if (event.status === 200) {
            this.toastService.show('Success', 'success');
          }
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (userInitiated) {
          this.toastService.show(`Error`, 'error');
        }
        return throwError(() => new Error(error.message));
      })
    );
  }
}