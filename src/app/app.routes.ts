import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
// import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  // Home Route
  { path: '', component: HomeComponent },

  // Login Route
  { path: 'login', component: LoginComponent },

  // Profile Page (User's profile)
  { path: 'profile', component: UserProfileComponent },

  // Create Post Page
  { path: 'create-post', component: CreatePostComponent },

  // Dynamic Route for Post Details
  { path: 'post/:id', component: PostDetailsComponent },

  // 404 Not Found Route
  // { path: 'not-found', component: NotFoundComponent },

  // Wildcard Route for Undefined Paths
  { path: '**', redirectTo: 'not-found' }
];
