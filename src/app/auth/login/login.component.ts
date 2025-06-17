import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  
  constructor(
    private fb: FormBuilder,
    private authServices: AuthService,
    private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit(): void {
    this.errorMessage = ''; // Limpiar mensaje de error anterior
    
    if (this.loginForm.valid) {
      this.authServices.Login(this.loginForm.value)
        .pipe(
          catchError(error => {
            if (error.status === 401) {
              this.errorMessage = error.error?.message;
            } else {
              this.errorMessage = 'Error al intentar iniciar sesión';
            }
            return of(null); // Retornar un observable vacío para evitar que el error se propague
          })
        )
        .subscribe(response => {
          if (response) {
            if (response.success) {
              this.router.navigate(['/dashboard']);
            } else {
              this.errorMessage = response.message || 'Error al iniciar sesión';
            }
          }
        });
    } else {
      this.errorMessage = 'Por favor, complete todos los campos correctamente';
    }
  }
}
