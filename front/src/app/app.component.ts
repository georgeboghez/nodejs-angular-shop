import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// export class AppComponent {
//   title = 'front';
// }
export class AppComponent implements OnInit {
  
  loginForm : any;
  socialUser: any;
  isLoggedin: boolean;
  title: String = "front";
  
  constructor(
    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService
    ) {
      this.isLoggedin = false;//sessionStorage.getItem('isLoggedin') == null;
      // if(this.isLoggedin) {
      //   let sUser = sessionStorage.getItem('socialUser');
      //   if(sUser != null) {
      //     this.socialUser = JSON.parse(sUser);
      //   }
      // }
      // //      else {
      // //   //User already logged in
      // //   var userEntity = {};
      // //   userEntity = JSON.parse(sessionStorage.getItem('myUserEntity'));
      // //   ...
      // //   DoWhatever();
      // // }
    }
    
    ngOnInit() {
      this.loginForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
      this.socialAuthService.authState.subscribe((user) => {
        this.socialUser = user;
        this.isLoggedin = (user != null);
        if(this.isLoggedin) {
          console.log(this.socialUser);
          sessionStorage.setItem('isLoggedin',JSON.stringify(this.isLoggedin));
          sessionStorage.setItem('socialUser',JSON.stringify(this.socialUser));
          // sessionStorage.setItem('authToken',JSON.stringify(this.socialUser.authToken));
          // console.log(sessionStorage.getItem('authToken'));
        }
        else {
          sessionStorage.clear();
        }
      });
    }
    
    loginWithGoogle(): void {
      this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }
    
    loginWithFacebook(): void {
      this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    }
    
    signOut(): void {
      this.socialAuthService.signOut();
    }
    
    logOut(): void {
      // sessionStorage.clear();
      this.socialAuthService.signOut();
    }
    
  }