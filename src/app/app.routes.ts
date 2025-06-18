import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, pathMatch: 'full' },
    { path: 'signup', component: SignupComponent },
    {
        path: 'dashboard', 
        component: DashboardComponent, 
        children: [
            {
                path: '', redirectTo: 'weather', pathMatch: 'full'
            },
            {
                path: 'users', 
                loadComponent: () => import('./dashboard/pages/users-page/users-page.component').then(m => m.UsersPageComponent)
            },
            {
                path: 'weather',
                loadComponent: () => import('./dashboard/pages/weather-page/weather-page.component').then(m => m.WeatherPageComponent)
            },
        ]
    },
    { path: '**', redirectTo: 'login' }
];
