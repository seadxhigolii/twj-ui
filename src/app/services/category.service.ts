import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryDTO } from 'src/shared/dto/category.dto';
import { ProductCategoryDTO } from 'src/shared/dto/product-category.dto';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

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

  add(category: ProductCategoryDTO): Observable<Response> {
    const headers = this.createHeaders({ userInitiated: true });    
    return this.http.post<Response>(`${this.backendUrl}/Category/Add`, category, { headers });
  }

  getAll(): Observable<CategoryDTO[]> {
    const headers = this.createHeaders({ userInitiated: false });    
    return this.http.get<CategoryDTO[]>(`${this.backendUrl}/Category/GetAll`);
  }
}
