import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  username = ''
  password = ''
  errorMessage = 'Invalid credentials'
  invalidLogin = false

  constructor(private router: Router, private auth: BasicAuthenticationService) {

  }

  ngOnInit() {

  }

  handleJwtAuthLogin() {
    this.auth.authenticate(this.username, this.password).subscribe(
      data => {
        this.invalidLogin = false
        this.router.navigate(['home', this.username])
      },
      error => {
        this.invalidLogin = true
      }
    )
  }
  
}
