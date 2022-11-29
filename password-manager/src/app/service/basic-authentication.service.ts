import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { API_URL } from '../app.constants';
import { EncryptDecryptService } from './encryption/encrypt-decrypt.service';

export const TOKEN = 'token'
export const AUTHENTICATED_USER = 'authenticatedUser'

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http: HttpClient, private encryptDecryptService: EncryptDecryptService) { }

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER)
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedUser()) {
      return sessionStorage.getItem(TOKEN)
    }
    return null
  }
  
  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER)
    return !(user === null)
  }

  logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER)
    sessionStorage.removeItem(TOKEN)
  }

  authenticate(username: string, password: string) {
    password = (this.encryptDecryptService.encryptUsingAES256(password, username))
    return this.http.post<any>(`${API_URL}/authenticate`, {username, password}).pipe(
      map(
        (data: any) => {
          sessionStorage.setItem(AUTHENTICATED_USER, username)
          sessionStorage.setItem(TOKEN, `Bearer ${data.token}`)
          return data
        }
      )
    )
  }
}

export class BasicAuthenticationBean {
  constructor(public message:string) {

  }
}
