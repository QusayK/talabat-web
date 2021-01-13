import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const url: string = 'http://localhost:5000/api/auth';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response' as 'response'
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(data: any) {
   return this.http.post(`${url}/register`, data, httpOptions);
  }

  login(data: any) {
    return this.http.post(`${url}/login`, data, httpOptions);
   }
}
