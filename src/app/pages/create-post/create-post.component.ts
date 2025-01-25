import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  postData = {
    title: '',
    description: '',
    categoryId: '',
    link: '',
    codeSnippet: ''
  };

  errorMessage: string = '';
  successMessage: string = '';
  isLoggedIn: boolean = false;
  userId: number | null = null;

  constructor(private apiService: ApiService, private router: Router) {}

  // ngOnInit(): void {
  //   // Ensure localStorage is accessed in a browser environment
  //   if (typeof window !== 'undefined') {
  //     const token = localStorage.getItem('token');
  //     if (token) {
  //       this.isLoggedIn = true;

  //       // Fetch user data using the token
  //       this.apiService.getCurrentUser().subscribe({
  //         next: (user) => {
  //           this.userId = user.Id;
  //           console.log('User is logged in:', user);
  //         },
  //         error: (err) => {
  //           console.error('Error fetching current user:', err);
  //           this.isLoggedIn = false;
  //           this.router.navigate(['/login']);
  //         }
  //       });
  //     } else {
  //       this.router.navigate(['/login']); // Redirect if not logged in
  //     }
  //   }
  // }


  ngOnInit(): void {
    // Check if the user is logged in
    this.apiService.getCurrentUser().subscribe({
      next: (user) => {
        if (user) {
          this.isLoggedIn = true;
          this.userId = user.id;
          console.log('User is logged in:', user);
        } else {
          this.isLoggedIn = false;
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        console.error('Error fetching current user:', err);
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
      }
    });
  }


  createPost(): void {
    if (!this.isLoggedIn || !this.userId) {
      this.errorMessage = 'You must be logged in to create a post.';
      console.log('User is not logged in or userId is missing.');
      return;
    }

    const newPost = {
      ...this.postData,
      userId: this.userId
    };

    this.apiService.createPost(newPost).subscribe({
      next: () => {
        this.successMessage = 'Post created successfully!';
        console.log('Post created successfully.');
        setTimeout(() => this.router.navigate(['/']), 2000); // Redirect to home after success
      },
      error: (err) => {
        console.error('Error creating post:', err);
        this.errorMessage = 'Failed to create the post. Please try again.';
      }
    });
  }
}
