import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = 'https://ksavav.pythonanywhere.com'

  constructor(private http: HttpClient) { }

  data(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/data`, data)
  }
}
