import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient) { }

  get(url: string) {
    return this.http.get(url);
  }

  post(url: string, data) {
    return this.http.post(url, data);
  }

  put(url: string, data) {
    return this.http.put(url, data);
  }

  delete(url: string) {
    return this.http.delete(url);

  }
}
