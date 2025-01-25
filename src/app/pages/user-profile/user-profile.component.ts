import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HeaderComponent],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  userPosts: any[] = [];
  userComments: any[] = [];
  isEditing: boolean = false;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.getCurrentUser().subscribe({
      next: (user) => {
        console.log('User object:', user); // Log the user object to see its structure
        this.user = user;
        this.user.id = user.Id;
        this.user.name = user.Name;
        this.user.email = user.Email;
        this.loadUserPosts();
        this.loadUserComments();
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      }
    });
  }

  loadUserPosts(): void {
    this.apiService.getUserPosts(this.user.id).subscribe({
      next: (posts) => {
        console.log('UserID:', this.user.id); // Debugging statement
        console.log('Fetched user posts:', posts); // Debugging statement
        this.userPosts = posts;
      },
      error: (err) => {
        console.error('Error fetching user posts:', err);
      }
    });
  }

  loadUserComments(): void {
    this.apiService.getUserComments(this.user.id).subscribe({
      next: (comments) => {
        this.userComments = comments;
      },
      error: (err) => {
        console.error('Error fetching user comments:', err);
      }
    });
  }

  editProfile(): void {
    this.isEditing = true;
  }

  saveProfile(): void {
    this.apiService.updateUser(this.user.id, this.user).subscribe({
      next: () => {
        this.isEditing = false;
        console.log('User profile updated successfully');
      },
      error: (err) => {
        console.error('Error updating user profile:', err);
      }
    });
  }

  cancelEdit(): void {
    this.isEditing = false;
  }
}