import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordDataService } from '../service/data/password-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  
  username = ''
  passwords: Password[] = [];
  message = ''


  constructor(private activatedRoute: ActivatedRoute, private service: PasswordDataService, private router: Router) {

  }

  ngOnInit() {
    this.username = this.activatedRoute.snapshot.params['name'];
    this.refreshPasswords()
  }

  deletePassword(id: any) {
    this.service.deletePassword(this.username, id).subscribe(
      response => {
        this.message = `Password ${id} successfully deleted`
        this.refreshPasswords()
      }
    )
  }

  updatePassword(id: any) {
    this.router.navigate(['password', id])
  }

  refreshPasswords() {
    this.service.retrieveAllPasswords(this.username).subscribe(
      response => {
        this.passwords = response
      }
    )
  }

  addPassword() {
    this.router.navigate(['password',-1])
  }
}

export class Password {
  constructor (
    public id: number,
    public name: string,
    public url: string,
    public username: string,
    public password: string,
    public notes: string
  ) {}
}

export class User {
  constructor (
    public id: number,
    public username: string,
    public password: string,
  ) {}
}
