import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
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

  ngOnInit(): void {
    // Check if the user is logged in
    this.apiService.getCurrentUser().subscribe({
      next: (user) => {
        console.log('User object:', user); // Log the user object to see its structure
        if (user) {
          this.isLoggedIn = true;
          this.userId = user.Id; // Ensure this matches the actual property name in the user object
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

    console.log('Creating post with data:', newPost);

    this.apiService.createPost(newPost).subscribe({
      next: () => {
        this.successMessage = 'Post created successfully!';
        console.log('Post created successfully.');
        setTimeout(() => this.router.navigate(['/home']), 2000); // Redirect to home after success
      },
      error: (err) => {
        console.error('Error creating post:', err);
        this.errorMessage = 'Failed to create the post. Please try again.';
      }
    });
  }
}