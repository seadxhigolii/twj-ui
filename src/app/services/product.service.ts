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
    private headers = new HttpHeaders().append('X-User-Initiated', 'true');
    constructor(private http: HttpClient) { }

    getAll(): Observable<ProductDTO[]> {
        return this.http.get<ProductDTO[]>(`${this.backendUrl}/Product/GetAll`, { headers: this.headers });
    }

    add(product: ProductDTO): Observable<Response<boolean>> {
        const headers = new HttpHeaders().append('X-User-Initiated', 'true');
        return this.http.post<Response<boolean>>(`${this.backendUrl}/Product/Add`, product, { headers: this.headers });
    }

    getFiltered(filterRequest: FilterRequest): Observable<FilteredResponseDTO<Product>> {
        const params = new HttpParams()
        .set('page', filterRequest.page.toString())
        .set('pageSize', filterRequest.pageSize.toString())
        .set('search', filterRequest.search || '')
        .set('sortBy', filterRequest.sortBy || '')
        .set('sortDirection', filterRequest.sortDirection || 'asc');
    
        return this.http.get<FilteredResponseDTO<Product>>(`${this.backendUrl}/Product/GetFiltered`, { params, headers: this.headers });
    }
}
