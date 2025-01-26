import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './guards/auth.guard'; // Import the AuthGuard for protected routes

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirect root to Login
  { path: 'login', component: LoginComponent }, // Login route
  { path: 'register', component: RegisterComponent }, // Registration route
  { path: 'home', component: HomeComponent }, // Home route
  { path: 'post/:id', component: PostDetailsComponent }, // Post details route
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] }, // Protected profile route
  { path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuard] }, // Protected create-post route
  { path: '**', redirectTo: 'login' } // Redirect all unmatched routes to Login
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: false, onSameUrlNavigation: 'reload' }) // Removed useHash for cleaner URLs
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
