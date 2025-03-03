import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {
  private apiUrl = 'http://localhost:3001/progress'; // Mockoon endpoint

  private api2Url = 'http://localhost:3001/files';
  constructor(private http: HttpClient) { }

  getProgressStatus(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  getFileProgress(filename: string): Observable<any> {
    return this.http.get<any>(this.api2Url);  // Fetch all files
  }

}
