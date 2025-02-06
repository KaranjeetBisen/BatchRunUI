import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BatchrunServiceService {

  private baseUrl = '/broadside/api';

  constructor(private http: HttpClient) {}

  getConfigFiles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getConfigFiles`);
  }

  startBatchRun(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/StartNewPreprocessor`, data);
  }

}
