import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { FilterResponse } from "src/shared/interfaces/responses/filter/filterResponse.interface";
import { GetAllTagModel } from "src/shared/interfaces/tag/getAllTagModel.interface";
import { GetFilteredTagModel } from "src/shared/interfaces/tag/getFilteredTagModel.interface";

@Injectable({
    providedIn: 'root'
  })
export class TagService {

    private backendUrl = environment.backendUrl; 
    private headers = new HttpHeaders().append('X-User-Initiated', 'true');
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

    getAll(): Observable<GetAllTagModel[]> {
        const headers = this.createHeaders({ userInitiated: false });    
        return this.http.get<GetAllTagModel[]>(`${this.backendUrl}/Tag/GetAll`, {headers});
    }

    getFiltered(page: number, pageSize: number): Observable<FilterResponse<GetFilteredTagModel>> {
        const headers = this.createHeaders({ userInitiated: false });    
        let params = new HttpParams();
        params = params.append('Page', page.toString());
        params = params.append('PageSize', pageSize.toString());
        return this.http.get<FilterResponse<GetFilteredTagModel>>(`${this.backendUrl}/Tag/GetFiltered`, { headers, params });
      }
}
