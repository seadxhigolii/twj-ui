import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Banner } from 'src/shared/interfaces/banner.interface';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

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

  getAll(): Observable<Banner[]> {
    const headers = this.createHeaders();
    return this.http.get<Banner[]>(this.backendUrl + '/Banner/GetAll', { headers });
  }

  getRandom(): Observable<Banner[]> {
    const headers = this.createHeaders();
    return this.http.get<Banner[]>(this.backendUrl + '/Banner/GetRandom', { headers });
  }

  add(banner: Banner): Observable<Banner> {
    const headers = this.createHeaders();
    return this.http.post<Banner>(this.backendUrl, banner, { headers });
  }
  
}
