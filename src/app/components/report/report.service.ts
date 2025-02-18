import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:3001/report'; // Mockoon API URL

  constructor(private http: HttpClient) {}

  fetchReports(status: string): Observable<any> {
    const requestBody = {
      params: {
        otype: "json",
        nrec: 10
      },
      data: {
        bml_app: "90",
        bml_dispatchedat: "2024-07-23T15:40:24.472Z TO 2024-07-23T23:59:59Z",
        bml_status: status
      }
    };

    return this.http.post<any>(this.apiUrl, requestBody);
  }

  fetchReports2(status: string, start_date: string, end_date: string): Observable<any> {
    const requestBody = {
      params: {
        otype: "json",
        nrec: 10
      },
      data: {
        bml_app: "90",
        bml_dispatchedat: start_date,
        bml_sentat: end_date,
        bml_status: status
      }
    };

    return this.http.post<any>(this.apiUrl, requestBody);
  }
}
