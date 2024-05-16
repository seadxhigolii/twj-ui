import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FilterRequest } from 'src/shared/interfaces/requests/filterRequest.interface';
import { FilteredResponseDTO } from 'src/shared/dto/filtered-response.dto';
import { SEOKeyowrdDTO } from 'src/shared/dto/seokeyword.dto';
import { SEOKeyowrd } from 'src/shared/interfaces/seokeyword.interface';

@Injectable({
  providedIn: 'root'
})
export class SEOKeywordService {

    private backendUrl = environment.backendUrl; 

    constructor(private http: HttpClient) { }
    
    private createHeaders(userInitiated: boolean = false): HttpHeaders {
        let headers = new HttpHeaders();
        if (userInitiated) {
            headers = headers.append('X-User-Initiated', 'true');
        }
        return headers;
    }

    getAll(): Observable<SEOKeyowrdDTO[]> {
        const headers = this.createHeaders();
        return this.http.get<SEOKeyowrdDTO[]>(`${this.backendUrl}/SEOKeyword/GetAll`, { headers });
    }

    getFiltered(filterRequest: FilterRequest): Observable<FilteredResponseDTO<SEOKeyowrd>> {
        const headers = this.createHeaders();
        const params = new HttpParams()
        .set('page', filterRequest.page.toString())
        .set('pageSize', filterRequest.pageSize.toString())
        .set('search', filterRequest.search || '')
        .set('sortBy', filterRequest.sortBy || '')
        .set('sortDirection', filterRequest.sortDirection || 'asc');
    
        return this.http.get<FilteredResponseDTO<SEOKeyowrd>>(`${this.backendUrl}/SEOKeyowrd/GetFiltered`, { params, headers });
    }
}
