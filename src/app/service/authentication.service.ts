import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { JwtHelperService, JwtModule } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public host = environment.apiUrl;
  private token: string | null;
  private loggedInUsername: string | null;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }


  public login(employee: Employee): Observable<HttpResponse<Employee> | HttpErrorResponse> {
    return this.http.post<Employee>(`${this.host}/employee/login`, employee, {observe: 'response'});
  }

  public register(employee: Employee): Observable<Employee | HttpErrorResponse> {
    return this.http.post<Employee | HttpErrorResponse>
    (`${this.host}/employee/register`, employee);
  }

  public logOut(): void {
    this.token = null;
    this.loggedInUsername = null;
    localStorage.removeItem('employee');
    localStorage.removeItem('token');
    localStorage.removeItem('employees');
  }

  public saveToken(token: string): void {
    this.token = token;
    this.loggedInUsername = null;
    localStorage.setItem('token', token);
  }

  public addEmployeeToLocalCache(employee: Employee): void {
    localStorage.setItem('employee', JSON.stringify(employee));
  }

  public getEmployeeFromLocalCache(): Employee {
   return JSON.parse(localStorage.getItem('employee') || '{}');
  }

  public loadToken(): void {
    this.token = localStorage.getItem('token');
   }
 
  public getToken(): string {
    return this.token || '{}';
   }

  public isLoggedIn(): boolean {
    this.loadToken();
    if (this.token != null && this.token !== ''){
      if (this.jwtHelper.decodeToken(this.token).sub != null || '') {
        if (!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    } else {
      this.logOut();
      return false;
    }
    return false;
  }

}
