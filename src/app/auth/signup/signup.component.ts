import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.sass'
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authServices: AuthService,
    private router: Router) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      confPwd: ['', [Validators.required, Validators.minLength(3)]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confPwd = control.get('confPwd');
    // Validamos  que los campos concidan
    if (password && confPwd && password.value !== confPwd.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    this.errorMessage = '';
    if (this.signupForm.valid) {
      this.authServices.signup(this.signupForm.value).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Cuenta creada',
            text: response.message,
          });
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.errorMessage = err.error.message
        }
      });
    } else {
      this.errorMessage = 'Por favor, complete todos los campos requeridos';
    }
  }

}
