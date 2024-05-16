import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BlogPostDTO } from 'src/shared/dto/blog-post.dto';
import { BlogPost } from 'src/shared/interfaces/blogPost.interface';
import { BlogPostResponse } from 'src/shared/interfaces/responses/blogPostResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {

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

  getAll(): Observable<Response> {
    const headers = this.createHeaders();
    return this.http.get<Response>(this.backendUrl + '/BlogPost/GetAll', { headers });
  }

  getById(id:string): Observable<Response> {
    const headers = this.createHeaders();
    return this.http.get<Response>(this.backendUrl + '/BlogPost/GetById/'+id, { headers });
  }

  getByUrl(url: string): Observable<BlogPost> {
    const headers = this.createHeaders();
    const params = new HttpParams().set('URL', url);
    return this.http.get<BlogPost>(`${this.backendUrl}/BlogPost/GetByUrl`, { params, headers });
  }

  getRelated(url: string): Observable<BlogPost[]> {
    const headers = this.createHeaders();
    const params = new HttpParams().set('URL', url);
    return this.http.get<BlogPost[]>(`${this.backendUrl}/BlogPost/GetRelated`, { params, headers });
  }
  
  getByTagName(tag: string): Observable<BlogPost[]> {
    const headers = this.createHeaders();
    const params = new HttpParams().set('Tag', tag);
    return this.http.get<BlogPost[]>(`${this.backendUrl}/BlogPost/GetByTagName`, { params, headers });
  }
  
  add(blogPost: BlogPostDTO): Observable<Response> {
    const headers = this.createHeaders();
    return this.http.post<Response>(this.backendUrl, blogPost, { headers });
  }

  generate(blogPost: BlogPostDTO): Observable<BlogPostResponse> {
    const headers = this.createHeaders();
    return this.http.post<BlogPostResponse>(this.backendUrl + '/BlogPost/Generate',blogPost, { headers });
  }

  generateSEOFocused(): Observable<BlogPostResponse> {
    const headers = this.createHeaders();
    return this.http.post<BlogPostResponse>(`${this.backendUrl}/BlogPost/GenerateSEOFocused`, {}, { headers });
  } 

  generateRandom(): Observable<BlogPostResponse> {
    const headers = this.createHeaders();
    return this.http.post<BlogPostResponse>(`${this.backendUrl}/BlogPost/GenerateRandom`, {}, { headers });
  }
  
}
