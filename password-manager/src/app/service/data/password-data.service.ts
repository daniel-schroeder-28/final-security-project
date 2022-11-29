import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Password } from 'src/app/home/home.component';
import { API_URL } from 'src/app/app.constants';
import { EncryptDecryptService } from '../encryption/encrypt-decrypt.service';

@Injectable({
  providedIn: 'root'
})
export class PasswordDataService {

  constructor(private http: HttpClient, private encryptDecryptService: EncryptDecryptService) { }

  retrieveAllPasswords(username: any) {
    return this.http.get<Password[]>(`${API_URL}/jpa/users/${username}/passwords`)
  }

  deletePassword(username: any, id: any) {
    return this.http.delete(`${API_URL}/jpa/users/${username}/passwords/${id}`)
  }

  retrievePassword(username: any, id: any) {
    return this.http.get<Password>(`${API_URL}/jpa/users/${username}/passwords/${id}`)
  }

  updatePassword(username: any, id: any, password: Password) {
    password.password = (this.encryptDecryptService.encryptUsingAES256(password.password, username))
    return this.http.put(`${API_URL}/jpa/users/${username}/passwords/${id}`, password)
  }

  createPassword(username: any, password: Password) {
    password.password = (this.encryptDecryptService.encryptUsingAES256(password.password, username))
    return this.http.post(`${API_URL}/jpa/users/${username}/passwords`, password)
  }
}
