import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WeatherPageComponent } from './dashboard/pages/weather-page/weather-page.component';
import { UsersComponent } from './dashboard/components/users/users.component';

import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, pathMatch: 'full' },
    { path: 'signup', component: SignupComponent },
    {
        path: 'dashboard', component: DashboardComponent, canActivate: [authGuard],
        children: [
            {
                path: 'users', loadComponent: () => import('./dashboard/pages/users-page/users-page.component').then(m => m.UsersPageComponent), canActivate: [authGuard]
            },
            {
                path: 'weather',
                loadComponent: () => import('./dashboard/pages/weather-page/weather-page.component').then(m => m.WeatherPageComponent)
            },
        ]
    },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: 'dashboard' }
];
