import { Component, OnInit } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedin: boolean;
  
  constructor() {
    let su = AuthService.getIntance().socialUser;
    this.isLoggedin = su != null && su != undefined;
  }
  
  ngOnInit(): void {
  }
  
  _firstName():any {
    return AuthService.getIntance().socialUser.firstName;
  }
  
  _photo():any {
    return AuthService.getIntance().socialUser.photoUrl;
  }
}
