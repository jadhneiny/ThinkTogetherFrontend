import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerData = {
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  };

  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(private apiService: ApiService, private router: Router) {}

  register(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.errorMessage = "Passwords do not match.";
      return;
    }

    this.isLoading = true;

    this.apiService.register(this.registerData).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.successMessage = "Registration successful! Redirecting to login...";
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        console.error('Registration failed:', error);
        this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
        this.isLoading = false;
      }
    });
  }
}
