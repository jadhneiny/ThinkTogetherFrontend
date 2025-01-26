import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { RouterModule } from '@angular/router';
import {SearchBarComponent} from "../search-bar/search-bar.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, FooterComponent, HeaderComponent, RouterModule, SearchBarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: any[] = [];
  isLoading = true;
  errorMessage = '';
  filters = {
    category: '',
    sortBy: '',
    searchQuery: ''
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load posts.';
        this.isLoading = false;
      }
    });
  }

  fetchPosts(): void {
    this.isLoading = true;
    this.apiService.getPosts(this.filters).subscribe({
      next: (data) => {
        this.posts = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load posts.';
        this.isLoading = false;
      }
    });
  }

  onSearch(query: string): void {
    this.filters.searchQuery = query;
    this.fetchPosts();
  }

  onFilterChange(): void {
    this.fetchPosts();
  }
}
