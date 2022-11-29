import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { BasicAuthenticationService } from '../basic-authentication.service';

@Injectable({
  providedIn: 'root'
})

export class EncryptDecryptService {

  constructor() { }

  encryptUsingAES256(textToEncrypt: string, username: string): any {
    let hash = CryptoJS.SHA512(username);
    let key = CryptoJS.enc.Utf8.parse(hash.toString())
    let iv = CryptoJS.enc.Utf8.parse(hash.toString())
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(textToEncrypt), key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}

  decryptUsingAES256(textToDecrypt: string) {
    let username = sessionStorage.getItem('authenticatedUser')
    if (username) {
      let hash = CryptoJS.SHA512(username);
      let key = CryptoJS.enc.Utf8.parse(hash.toString())
      let iv = CryptoJS.enc.Utf8.parse(hash.toString())
      var decrypted = CryptoJS.AES.decrypt(textToDecrypt, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      return decrypted.toString(CryptoJS.enc.Utf8);
    }
    return ''
  }
}
