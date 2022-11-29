import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasicAuthenticationService } from '../basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorBasicAuthService implements HttpInterceptor{

  constructor(private basicAuth: BasicAuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let basicAuthString = this.basicAuth.getAuthenticatedToken()
    let username = this.basicAuth.getAuthenticatedUser()

    if (basicAuthString && username) {
      req = req.clone({
        setHeaders : {
          Authorization : basicAuthString
        }
      })
    }
    return next.handle(req)
  }
}
