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

  categories: any[] = [];  // Store fetched categories
  errorMessage: string = '';
  successMessage: string = '';
  isLoggedIn: boolean = false;
  userId: number | null = null;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    // Check if the user is logged in
    this.apiService.getCurrentUser().subscribe({
      next: (user) => {
        if (user) {
          this.isLoggedIn = true;
          this.userId = user.Id;
        } else {
          this.router.navigate(['/login']);
        }
      },
      error: () => this.router.navigate(['/login'])
    });

    // Fetch categories from the API
    this.apiService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
        this.errorMessage = 'Failed to load categories. Please try again.';
      }
    });
  }

  createPost(): void {
    if (!this.isLoggedIn || !this.userId) {
      this.errorMessage = 'You must be logged in to create a post.';
      return;
    }
  
    const newPost = {
      ...this.postData,
      userId: this.userId
    };
  
    console.log('Sending post data:', newPost);
  
    this.apiService.createPost(newPost).subscribe({
      next: () => {
        this.successMessage = 'Post created successfully!';
        setTimeout(() => this.router.navigate(['/home']), 2000);
      },
      error: (err) => {
        console.error('Error creating post:', err);
        this.errorMessage = 'Failed to create the post. Please try again.';
      }
    });
  }  
}