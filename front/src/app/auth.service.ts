import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private static authService: AuthService;
  
  loginForm : any;
  socialUser: any;
  isLoggedin: boolean;
  socialAuthService: SocialAuthService;
  
  private constructor(private formBuilder: FormBuilder, private sas: SocialAuthService, private _location: Location, private cookieService:CookieService) {
    // cookieService.delete("socialUser");
    let su = localStorage.getItem("socialUser");
    // let su = JSON.parse(cookieService.get("socialUser"));
    if(su != null && su != undefined) {
      this.socialUser = JSON.parse(su);
      this.isLoggedin = true;
    }
    else {
      this.isLoggedin = false;
    }
    this.socialAuthService = sas;
        console.log(this.socialUser)
    
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = (user != null);
      if(this.isLoggedin) {
        localStorage.setItem('isLoggedin',JSON.stringify(this.isLoggedin));
        // cookieService.set("socialUser", JSON.stringify(this.socialUser));
        localStorage.setItem("socialUser",JSON.stringify(this.socialUser));
      }
      else {
        localStorage.clear();
      }
      location.reload();
    });
  }
  
  public static createInstance(formBuilder: FormBuilder, sas: SocialAuthService, l: Location, cookieService: CookieService): AuthService {
    this.authService = new AuthService(formBuilder, sas, l, cookieService);
    return this.authService;
  }
  
  public static getIntance(): AuthService {
    return this.authService;
  }
  
  ngOnInit() {}
  
  public loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  
  public loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  
  public signOut(): void {
    this.socialAuthService.signOut();
  }
  
  public logOut(): void {
    if(this.getLoggedInStatus()) {
      // this.socialAuthService.signOut();
      localStorage.clear();

    }
    location.reload();
    // localStorage.removeItem("isLoggedin");
  }
  
  public getLoggedInStatus(): boolean {
    return localStorage.getItem("socialUser") != null && localStorage.getItem("socialUser") != undefined;
  }
}