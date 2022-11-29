import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { ErrorComponent } from './error/error.component';
import { GeneratePasswordComponent } from './generate-password/generate-password.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { PasswordComponent } from './password/password.component';
import { RouteGuardService } from './service/route-guard.service';

const routes : Routes = [
    { path: '', component: LoginComponent},
    { path: 'login', component: LoginComponent },
    { path: 'home/:name', component: HomeComponent, canActivate:[RouteGuardService] },
    { path: 'password/:id', component: PasswordComponent, canActivate:[RouteGuardService] },
    { path: 'generate', component: GeneratePasswordComponent, canActivate:[RouteGuardService] },
    { path: 'logout', component: LogoutComponent, canActivate:[RouteGuardService] },
    { path: 'error', component: ErrorComponent },
    
    { path: '**', component: ErrorComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }