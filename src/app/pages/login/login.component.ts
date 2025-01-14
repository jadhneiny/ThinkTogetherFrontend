import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private apiService: ApiService, private router: Router) {}

  login(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.apiService.login(this.loginData).subscribe({
      next: (response) => {
        console.log('Login successful:', response);

        // Save token to localStorage (for session management)
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.userId);

        // Redirect to the home page
        this.router.navigate(['/home']);  
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Invalid email or password. Please try again.';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
