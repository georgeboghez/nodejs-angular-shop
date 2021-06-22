import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './components/cart/cart.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductsComponent } from './components/products/products.component';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { AUTH_IDs } from './config';
import { ProfileComponent } from './components/profile/profile.component';
import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    NavbarComponent,
    ProductsComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SocialLoginModule
  ],
  providers: [ CookieService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(AUTH_IDs.googleId)
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(AUTH_IDs.facebookId)
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
