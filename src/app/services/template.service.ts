import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TemplateDTO } from 'src/shared/dto/template.dto';
import { FilterRequest } from 'src/shared/interfaces/requests/filterRequest.interface';
import { FilteredResponseDTO } from 'src/shared/dto/filtered-response.dto';
import { Template } from 'src/shared/interfaces/template.interface';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

    private backendUrl = environment.backendUrl; 

    constructor(private http: HttpClient) { }
    
    private createHeaders(userInitiated: boolean = false): HttpHeaders {
        let headers = new HttpHeaders();
        if (userInitiated) {
            headers = headers.append('X-User-Initiated', 'true');
        }
        return headers;
    }

    getAll(): Observable<TemplateDTO[]> {
        const headers = this.createHeaders();
        return this.http.get<TemplateDTO[]>(`${this.backendUrl}/Template/GetAll`, { headers });
    }

    getFiltered(filterRequest: FilterRequest): Observable<FilteredResponseDTO<Template>> {
        const headers = this.createHeaders();
        const params = new HttpParams()
        .set('page', filterRequest.page.toString())
        .set('pageSize', filterRequest.pageSize.toString())
        .set('search', filterRequest.search || '');
    
        return this.http.get<FilteredResponseDTO<Template>>(`${this.backendUrl}/Template/GetFiltered`, { params, headers });
    }
}
