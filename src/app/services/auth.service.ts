import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginAccountModel } from 'src/shared/interfaces/account/loginAccountModel.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private backendUrl = environment.backendUrl; 

  constructor(private http: HttpClient) { } 
  
  login(emailOrUsername: string, password: string): Observable<LoginAccountModel> {
    const body = { emailOrUsername, password };
    
    return this.http.post<LoginAccountModel>(`${this.backendUrl}/Auth/Login`, body)
      .pipe(
        tap(res => this.setSession(res))
      );
  }

  private setSession(authResult: LoginAccountModel) {
    const expiresAt = new Date(authResult.expireDate).getTime();
    localStorage.setItem('user_Id', authResult.userId);
    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt));
  }

  logout() {
    const userId = localStorage.getItem('user_Id');
    localStorage.removeItem('user_Id');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    
    const body = { UserId: userId ? userId : '' };
    return this.http.post<any>(`${this.backendUrl}/Auth/Logout`, body);
}


  public isLoggedIn(): boolean {
    return new Date().getTime() < this.getExpiration();
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  getExpiration(): number {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return expiresAt;
  }
}
