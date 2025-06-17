import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  try {
    if (authService.isAuthenticated()) {
      return true;
    }
  } catch (error) {
    console.error('Error in auth guard:', error);
  }
  // Redirect to login page
  return router.parseUrl('/login');
}; 