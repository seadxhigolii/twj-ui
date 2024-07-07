import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BlogPostDTO } from 'src/shared/dto/blog-post.dto';
import { BlogPost } from 'src/shared/interfaces/blogPost.interface';
import { BlogPostResponse } from 'src/shared/interfaces/responses/blogPostResponse.interface';
import { CombinedBlogPostModel } from 'src/shared/interfaces/blogPost/combinedBlogPostModel.interface';
import { GetFilteredBlogPostModel } from 'src/shared/interfaces/blogPost/getFilteredBlogPostModel.interface';
import { FilterResponse } from 'src/shared/interfaces/responses/filter/filterResponse.interface';
import { GetByAuthorFilteredModel } from 'src/shared/interfaces/blogPost/getByAuthorFilteredModel.interface';
import { FilterRequest } from 'src/shared/interfaces/requests/filterRequest.interface';
import { GetBlogPostByIdModel } from 'src/shared/interfaces/blogPost/getBlogPostByIdModel.interface';
import { UpdateBlogPostCommand } from 'src/shared/interfaces/blogPost/updateBlogPostCommand.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {

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

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404 || error.status === 500) {
      return throwError(error);
    } else {
      return throwError('An unexpected error occurred.');
    }
  }

  getByUrl(url: string): Observable<BlogPost> {
    const headers = this.createHeaders({ userInitiated: false });  
    const params = new HttpParams().set('URL', url);
    return this.http.get<BlogPost>(`${this.backendUrl}/BlogPost/GetByUrl`, { params, headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getAll(): Observable<Response> {
    const headers = this.createHeaders({ userInitiated: false });  
    return this.http.get<Response>(this.backendUrl + '/BlogPost/GetAll', { headers });
  }

  getTopTags(): Observable<CombinedBlogPostModel> {
    const headers = this.createHeaders({ userInitiated: false });  
    return this.http.get<CombinedBlogPostModel>(this.backendUrl + '/BlogPost/GetTopTags', { headers });
  }

  getFiltered(page: number, pageSize: number): Observable<any> {
    console.log(page, " ", pageSize)
    const headers = this.createHeaders({ userInitiated: false });  
    let params = new HttpParams();
    params = params.append('Page', page.toString());
    params = params.append('PageSize', pageSize.toString());
    return this.http.get<any>(`${this.backendUrl}/BlogPost/GetFiltered`, { headers, params });
  }

  getFilteredTable(filterRequest: FilterRequest): Observable<FilterResponse<GetFilteredBlogPostModel>> {
    const params = new HttpParams()
    .set('page', filterRequest.page.toString())
    .set('pageSize', filterRequest.pageSize.toString())
    .set('search', filterRequest.search || '')
    .set('sortBy', filterRequest.sortBy || '')
    .set('sortDirection', filterRequest.sortDirection || 'asc');
    const headers = this.createHeaders({ userInitiated: false });  
    return this.http.get<FilterResponse<GetFilteredBlogPostModel>>(`${this.backendUrl}/BlogPost/GetFiltered`, { params, headers });
  }

  getByAuthorFiltered(page: number, pageSize: number, authorName: string): Observable<FilterResponse<GetByAuthorFilteredModel>> {
    const headers = this.createHeaders({ userInitiated: false });  
    let params = new HttpParams();
    params = params.append('Page', page.toString());
    params = params.append('PageSize', pageSize.toString());
    params = params.append('AuthorName', authorName);
    return this.http.get<FilterResponse<GetByAuthorFilteredModel>>(`${this.backendUrl}/BlogPost/GetByAuthorFiltered`, { headers, params });
  }

  getById(id: string): Observable<GetBlogPostByIdModel> {
    const headers = this.createHeaders({ userInitiated: false });  
    return this.http.get<GetBlogPostByIdModel>(`${this.backendUrl}/BlogPost/GetById?id=${id}`, { headers });
  }

  getRelated(url: string): Observable<BlogPost[]> {
    const headers = this.createHeaders({ userInitiated: false });  
    let params = new HttpParams().set('URL', url);
    return this.http.get<BlogPost[]>(`${this.backendUrl}/BlogPost/GetRelated`, { params, headers });
  }
  
  getByTagName(tag: string): Observable<BlogPost[]> {
    const headers = this.createHeaders({ userInitiated: false });  
    const params = new HttpParams().set('Tag', tag);
    return this.http.get<BlogPost[]>(`${this.backendUrl}/BlogPost/GetByTagName`, { params, headers });
  } 

  getByTagNamePaginated(page: number, pageSize: number, tagName: string): Observable<FilterResponse<GetFilteredBlogPostModel>> {
    
    const headers = this.createHeaders({ userInitiated: false });  
    let params = new HttpParams();
    params = params.append('Page', page.toString());
    params = params.append('PageSize', pageSize.toString());
    params = params.append('TagName', tagName.toString());
    return this.http.get<any>(`${this.backendUrl}/BlogPost/GetFiltered`, { headers, params });
  }
  
  add(blogPost: BlogPostDTO): Observable<Response> {
    const headers = this.createHeaders({ userInitiated: true });  
    return this.http.post<Response>(this.backendUrl, blogPost, { headers });
  }

  generate(blogPost: BlogPostDTO): Observable<BlogPostResponse> {
    const headers = this.createHeaders({ userInitiated: true });  
    return this.http.post<BlogPostResponse>(this.backendUrl + '/BlogPost/Generate',blogPost, { headers });
  }

  generateSEOFocused(): Observable<BlogPostResponse> {
    const headers = this.createHeaders({ userInitiated: true });  
    return this.http.post<BlogPostResponse>(`${this.backendUrl}/BlogPost/GenerateSEOFocused`, {}, { headers });
  } 

  generateRandom(): Observable<BlogPostResponse> {
    const headers = this.createHeaders({ userInitiated: true });  
    return this.http.post<BlogPostResponse>(`${this.backendUrl}/BlogPost/GenerateRandom`, {}, { headers });
  }

  update(body:UpdateBlogPostCommand): Observable<UpdateBlogPostCommand> {
    const headers = this.createHeaders({ userInitiated: true });  
    return this.http.post<UpdateBlogPostCommand>(this.backendUrl + '/BlogPost/Update',{ body, headers });
  }
  
  
}
