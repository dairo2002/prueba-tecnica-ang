import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
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
      this.authServices.Login(this.loginForm.value).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Inicio Sesión',
            text: response.message,
          });
          this.router.navigate(['/dashboard/weather']);
        },
        error: (err) => {          
          this.errorMessage = err.error.message
        }
      });
    } else {
      this.errorMessage = 'Por favor, complete todos los campos correctamente';
    }
  }
}
