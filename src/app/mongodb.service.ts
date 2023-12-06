import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MongoDBService {
  private baseUrl = 'http://localhost:3000'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  getData(searchTerm: string): Observable<any[]> {
    const url = `${this.baseUrl}/search?term=${searchTerm}`;
    return this.http.get<any[]>(url).pipe(
      catchError((error) => {
        console.error('Error fetching data:', error);
        return throwError(error);
      })
    );
  }
}

