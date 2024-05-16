import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewsLetterSubscriber } from 'src/shared/interfaces/newsLetterSubscriber.interface'
import { Response } from 'src/shared/interfaces/responses/response.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsLetterSubscriberService {

  private backendUrl = environment.backendUrl; 

  constructor(private http: HttpClient) { }

    private createHeaders(options: { userInitiated?: boolean, contentType?: string } = {}): HttpHeaders {
      let headers = new HttpHeaders();
      if (options.userInitiated) {
          headers = headers.append('X-User-Initiated', 'true');
      }
      if (options.contentType) {
          headers = headers.append('Content-Type', options.contentType);
      }
      return headers;
  }

  getAll(): Observable<NewsLetterSubscriber[]> {
    const headers = this.createHeaders();
    return this.http.get<NewsLetterSubscriber[]>(this.backendUrl + '/NewsLetterSubscriber/GetAll', { headers });
  }

  getById(id:string): Observable<NewsLetterSubscriber> {
    const headers = this.createHeaders();
    return this.http.get<NewsLetterSubscriber>(this.backendUrl + '/NewsLetterSubscriber/GetById/'+id, { headers });
  }
  
  add(email: string): Observable<Response<boolean>> {
    const headers = this.createHeaders();
    const body = JSON.stringify({ Email: email });
    return this.http.post<Response<boolean>>(this.backendUrl + '/NewsLetterSubscriber/Add', body, { headers });
  }
  
}
