import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './dashboard/users/users.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, pathMatch: 'full'},
    { path: 'signup', component: SignupComponent },
    { path: 'dashboard', component: DashboardComponent },    
    { path: 'users', component: UsersComponent },    
    { path: '**', redirectTo: 'login' }

];
