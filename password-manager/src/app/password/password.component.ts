import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Password } from '../home/home.component';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { PasswordDataService } from '../service/data/password-data.service';
import { EncryptDecryptService } from '../service/encryption/encrypt-decrypt.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {

  id = -1
  password = new Password(this.id,"","","","","")
  newPassword = true

  constructor(private passwordService: PasswordDataService, private activatedRoute: ActivatedRoute, 
              private router: Router, private basicAuth: BasicAuthenticationService,
              private encryptDecryptService: EncryptDecryptService) {
    
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.password = new Password(this.id,"","","","","")

    if (this.id != -1) {
      this.newPassword = false
      this.passwordService.retrievePassword(this.basicAuth.getAuthenticatedUser(), this.id).subscribe(
        data => {
          this.password = data
          this.password.password = (this.encryptDecryptService.decryptUsingAES256(this.password.password))
        }
      )
    }
  }

  savePassword() {
    if (this.id == -1) {
      this.passwordService.createPassword(this.basicAuth.getAuthenticatedUser(), this.password).subscribe(
        data => {
          this.router.navigate([`home/${this.basicAuth.getAuthenticatedUser()}`])
        }
      )
    } else {
      this.passwordService.updatePassword(this.basicAuth.getAuthenticatedUser(), this.id, this.password).subscribe(
        data => {
          this.router.navigate([`home/${this.basicAuth.getAuthenticatedUser()}`])
        }
      )
    }
  }

  deletePassword() {
    this.passwordService.deletePassword(this.basicAuth.getAuthenticatedUser(), this.id).subscribe(
      data => {
        this.router.navigate([`home/${this.basicAuth.getAuthenticatedUser()}`])
      }
    )
  }

  togglePassword() {
    if (document.getElementById('passwordField')?.getAttribute('type') === 'password') {
      document.getElementById('passwordField')?.setAttribute('type', 'text')
    } else {
      document.getElementById('passwordField')?.setAttribute('type', 'password')
    }
    document.getElementById('togglePassword')?.classList.toggle("bi-eye")
  }
}
