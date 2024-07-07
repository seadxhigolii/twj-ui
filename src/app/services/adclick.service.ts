import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Banner } from 'src/shared/interfaces/banner.interface';
import { AddAdClickCommand } from 'src/shared/interfaces/adClick/addAdClickCommand.interface';
import { GetAllAdClickModel } from 'src/shared/interfaces/adClick/getAllAdClickModel.interface';

@Injectable({
  providedIn: 'root'
})
export class AdClickService {

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

  getAll(): Observable<GetAllAdClickModel[]> {
    const headers = this.createHeaders();
    return this.http.get<GetAllAdClickModel[]>(this.backendUrl + '/AdClick/GetAll', { headers });
  }

  add(adClick: AddAdClickCommand): Observable<AddAdClickCommand> {
    const headers = this.createHeaders({ userInitiated: true });  
    return this.http.post<AddAdClickCommand>(this.backendUrl + '/AdClick/Add', adClick, { headers });
  }
  
}
