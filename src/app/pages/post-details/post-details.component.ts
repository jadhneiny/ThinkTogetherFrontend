import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  post: any = null;
  comments: any[] = [];
  newComment: any = { text: '', author: 'Anonymous', createdAt: new Date() };
  isLoading: boolean = true;
  authorName: string = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const postId = params.get('id');
      if (postId) {
        this.fetchPostData(postId);
      } else {
        this.isLoading = false;
      }
    });
  }

  fetchPostData(postId: string): void {
    this.isLoading = true;

    // Fetch the post data
    this.apiService.getPostById(postId).subscribe({
      next: (data: any) => {
        this.post = data;
        this.isLoading = false;

                // Fetch the author details
                this.apiService.getUserById(this.post.UserId).subscribe({
                  next: (userData: any) => {
                    this.authorName = userData.Name;
                  },
                  error: () => {
                    console.error(`Failed to fetch user with ID ${this.post.UserId}`);
                  }});

        // Fetch comments for the post
        this.apiService.getCommentsByPostId(postId).subscribe({
          next: (commentsData: any[]) => {
            // Fetch user data for each comment
            this.comments = commentsData.map(comment => {
              // Initialize with a placeholder
              const mappedComment = {
                id: comment.Id,
                content: comment.Content,
                userId: comment.UserId,
                mentionedUserId: comment.MentionedUserId,
                flagged: comment.Flagged,
                createdAt: comment.CreatedAt,
                updatedAt: comment.UpdatedAt,
                author: `User ${comment.UserId}`  // Temporary placeholder
              };

              // Fetch actual user details
              this.apiService.getUserById(comment.UserId).subscribe({
                next: (userData: any) => {
                  mappedComment.author = userData.Name;  // Replace with actual username
                },
                error: () => {
                  console.error(`Failed to fetch user with ID ${comment.UserId}`);
                }
              });
              // Fetch actual user details
              this.apiService.getUserById(comment.UserId).subscribe({
                next: (userData: any) => {
                  mappedComment.mentionedUserId = userData.Name;  // Replace with actual username
                },
                error: () => {
                  console.error(`Failed to fetch user with ID ${comment.UserId}`);
                }
              });

              return mappedComment;
            });
          },
          error: (err: any) => {
            console.error('Error fetching comments:', err);
          }
        });
      },
      error: (err: any) => {
        console.error('Error fetching post:', err);
        this.isLoading = false;
      }
    });
  }

  addComment(): void {
    if (this.newComment.text.trim()) {
      this.comments.push({
        text: this.newComment.text,
        author: 'Anonymous',
        createdAt: new Date()
      });
      this.newComment.text = '';
    }
  }
}