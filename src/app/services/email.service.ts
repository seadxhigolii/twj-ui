import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from 'src/shared/interfaces/responses/response.interface';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private backendUrl = environment.backendUrl; 

  constructor(private http: HttpClient) { }
  
  private createHeaders(options: { userInitiated?: boolean, contentType?: string } = {}): HttpHeaders {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('id_token');
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    if (options.userInitiated) {
      headers = headers.append('X-User-Initiated', 'true');
    }
    if (options.contentType) {
      headers = headers.append('Content-Type', options.contentType);
    }
    return headers;
}
  
  unsubscribe(id: string): Observable<Response<boolean>> {
    let headers = new HttpHeaders();
    const body = JSON.stringify({ SubscriberId: id });
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post<Response<boolean>>(this.backendUrl + '/Email/Unsubscribe', body, {headers});
  }
  
}
