import { Component } from '@angular/core';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(public auth: BasicAuthenticationService) {

  }

  ngOnInit() {
    this.auth.logout()
  }
}
