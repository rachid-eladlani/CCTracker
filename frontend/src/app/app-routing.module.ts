import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { AlertListComponent } from './alert-list/alert-list.component';
import { LogoutComponent } from './logout/logout.component';
import { AlertComponent } from './alert/alert.component';
import { RouteGuardService } from './service/route-guard.service';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'logout', component: LogoutComponent, canActivate:[RouteGuardService] },
  { path: 'home/:name', component: HomeComponent, canActivate:[RouteGuardService] },
  { path: 'home', component: HomeComponent, canActivate:[RouteGuardService] },
  { path: 'alerts-list', component: AlertListComponent, canActivate:[RouteGuardService] },
  { path: 'alerts/:id', component: AlertComponent, canActivate:[RouteGuardService] },
  { path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
