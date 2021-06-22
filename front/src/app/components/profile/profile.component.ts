import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isLoggedin: boolean;
  authService: AuthService;

  constructor() {
    this.authService = AuthService.getIntance();
    this.isLoggedin = this.authService.getLoggedInStatus();
  }

  ngOnInit(): void {}

  _loginWithGoogle(): void {
    this.authService.loginWithGoogle();
  }

  _loginWithFacebook(): void {
    this.authService.loginWithFacebook();
  }

  _logOut():void {
    this.authService.logOut();
  }

  _socialUser():any {
    return this.authService.socialUser;
  }
}
