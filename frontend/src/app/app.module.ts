import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { AlertListComponent } from './alert-list/alert-list.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { LogoutComponent } from './logout/logout.component';
import { AlertComponent } from './alert/alert.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpInterceptorAuthService } from './service/http/http-interceptor-auth.service';
import { SignupComponent } from './signup/signup.component';
import { OrderByPipe } from './order-by.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    HomeComponent,
    AlertListComponent,
    MenuComponent,
    FooterComponent,
    LogoutComponent,
    AlertComponent,
    SignupComponent,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorAuthService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
