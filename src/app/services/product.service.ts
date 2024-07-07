import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TemplateDTO } from 'src/shared/dto/template.dto';
import { FilterRequest } from 'src/shared/interfaces/requests/filterRequest.interface';
import { FilteredResponseDTO } from 'src/shared/dto/filtered-response.dto';
import { ProductDTO } from 'src/shared/dto/product.dto';
import { Product } from 'src/shared/interfaces/product.interface';
import { Response } from 'src/shared/interfaces/responses/response.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    private backendUrl = environment.backendUrl; 
    
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
    constructor(private http: HttpClient) { }

    getAll(): Observable<ProductDTO[]> {
        const headers = this.createHeaders({ userInitiated: false });    
        return this.http.get<ProductDTO[]>(`${this.backendUrl}/Product/GetAll`, { headers });
    }

    add(product: ProductDTO): Observable<Response<boolean>> {
        const headers = this.createHeaders({ userInitiated: true });    
        return this.http.post<Response<boolean>>(`${this.backendUrl}/Product/Add`, product, { headers });
    }

    getFiltered(filterRequest: FilterRequest): Observable<FilteredResponseDTO<Product>> {
        const headers = this.createHeaders({ userInitiated: false });    
        const params = new HttpParams()
        .set('page', filterRequest.page.toString())
        .set('pageSize', filterRequest.pageSize.toString())
        .set('search', filterRequest.search || '')
        .set('sortBy', filterRequest.sortBy || '')
        .set('sortDirection', filterRequest.sortDirection || 'asc');
    
        return this.http.get<FilteredResponseDTO<Product>>(`${this.backendUrl}/Product/GetFiltered`, { params, headers });
    }
}
