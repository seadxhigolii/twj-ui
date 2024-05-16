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
  private readonly headers = new HttpHeaders().append('X-User-Initiated', 'true');

  constructor(private http: HttpClient) { }

  add(category: ProductCategoryDTO): Observable<Response> {
    return this.http.post<Response>(`${this.backendUrl}/Category/Add`, category, { headers: this.headers });
  }

  getAll(): Observable<CategoryDTO[]> {
      return this.http.get<CategoryDTO[]>(`${this.backendUrl}/Category/GetAll`);
  }
}
