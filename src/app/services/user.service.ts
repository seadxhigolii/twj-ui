import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { FilterResponse } from "src/shared/interfaces/responses/filter/filterResponse.interface";
import { GetAllTagModel } from "src/shared/interfaces/tag/getAllTagModel.interface";
import { GetFilteredTagModel } from "src/shared/interfaces/tag/getFilteredTagModel.interface";
import { GetUserByIdModel } from "../../shared/interfaces/user/getUserByIdModel.interface";

@Injectable({
    providedIn: 'root'
  })
export class UserService {

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

    getById(userId: string): Observable<GetUserByIdModel> {
        const headers = this.createHeaders({ userInitiated: false }); 
        const params = new HttpParams().set('Id', userId);   
        return this.http.get<GetUserByIdModel>(`${this.backendUrl}/User/GetById`, {params, headers});
    }
}
