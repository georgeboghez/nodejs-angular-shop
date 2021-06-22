import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title: String = "front";
  
  constructor(formBuilder: FormBuilder,socialAuthService: SocialAuthService, _location: Location, cookieService: CookieService) {
    AuthService.createInstance(formBuilder, socialAuthService, _location, cookieService);
  }
  
  ngOnInit() { }
}