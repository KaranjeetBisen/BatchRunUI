import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:8500/api/report'; // Mockoon API URL

  constructor(private http: HttpClient) {}
  
  fetchReports(status: string, start_date: string, end_date: string): Observable<any> {
    console.log("start date "+start_date);
    console.log("endDate"+end_date)
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer AbCdEf123456');
    const requestBody = {
      params: {
        otype: "json",
        nrec: "2500"
      },
      data: {
        bml_app: "72",
        bml_dispatchedat: `[${start_date}T00:00:00Z TO ${end_date}T23:59:59Z]`,
        bml_status: status
      }
    };
  
    return this.http.post<any>(this.apiUrl, requestBody, {headers});
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






