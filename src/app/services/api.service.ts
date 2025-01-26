import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = 'http://localhost:8080/ThinkTogether/public';

  constructor(private http: HttpClient) {}

  // getPosts(): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/posts`);
  // }

  getPosts(filters?: any): Observable<any[]> {
    let params = new HttpParams();
    if (filters) {
      if (filters.searchQuery) {
        params = params.set('search', filters.searchQuery);
      }
      if (filters.category) {
        params = params.set('category', filters.category);
      }
      if (filters.sortBy) {
        params = params.set('sortBy', filters.sortBy);
      }
    }
    return this.http.get<any[]>(`${this.apiUrl}/posts`, { params });
  }

  getPostById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/posts/${id}`);
  }

  getCommentsByPostId(postId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/posts/${postId}/comments`);
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${userId}`);
  }  

  createPost(postData: any): Observable<any> {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/posts`, postData, { headers });
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  getCurrentUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/users/current`, {}, { headers });
}

getUserPosts(userId: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/users/${userId}/posts`);
}

getUserComments(userId: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/users/${userId}/comments`);
}

updateUser(userId: number, userData: any): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.put(`${this.apiUrl}/users/${userId}`, userData, { headers });
}
}