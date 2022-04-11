import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private http: HttpClient
  ) { }

  private baseUrl = 'http://localhost:3000/data';

  addData(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }

  updateData(data: any, id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  getData(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
