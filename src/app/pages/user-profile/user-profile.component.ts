import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  userPosts: any[] = [];
  userComments: any[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.getCurrentUser().subscribe({
      next: (user) => {
        this.user = user;
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
    this.router.navigate(['/edit-profile']);
  }
}