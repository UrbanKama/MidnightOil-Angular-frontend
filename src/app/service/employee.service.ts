import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { JwtHelperService, JwtModule } from "@auth0/angular-jwt";
import { CustomHttpResponse } from '../models/custome-http-response';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getEmployees(): Observable<Employee[] | HttpErrorResponse> {
    return this.http.get<Employee[]>(`${this.host}/employee/list`);
  }

  public addEmployee(formData: FormData): Observable<Employee | HttpErrorResponse> {
    return this.http.post<Employee>(`${this.host}/employee/add`, formData);
  }

  public updateEmployee(formData: FormData): Observable<Employee | HttpErrorResponse> {
    return this.http.post<Employee>(`${this.host}/employee/update`, formData);
  }

  public resetPassword(email: string): Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.http.get<CustomHttpResponse>(`${this.host}/employee/resetpassword/${email}`);
  }

  public updateProfileImage(formData: FormData): Observable<HttpEvent<Employee> | HttpErrorResponse> {
    return this.http.post<Employee>(`${this.host}/employee/updateProfileImage`, formData, 
    {reportProgress: true, observe: 'events'});
  }

  public deleteEmployee(employeeId: number): Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.http.delete<CustomHttpResponse>(`${this.host}/employee/delete/${employeeId}`);
  }

  public addEmployeesToLocalCache(employees: Employee[]): void {
    localStorage.setItem('employees', JSON.stringify(employees));
  }

  public getEmployeesFromLocalCache(): Employee[] | null {
    if (localStorage.getItem('employees')) {
      return JSON.parse(localStorage.getItem('employees') || '{}');
    }
    return null;
  }

  public createEmployeeFormData(loggedInUsername: string, employee: Employee, profileImage: File): FormData {
    const formData = new FormData();
    formData.append('currentUsername', loggedInUsername);
    formData.append('firstName', employee.firstName);
    formData.append('lastName', employee.lastName);
    formData.append('username', employee.username);
    formData.append('email', employee.email);
    formData.append('role', employee.roles);
    formData.append('profileImage', profileImage);
    formData.append('isActive', JSON.stringify(employee.active));
    formData.append('isNonLocked', JSON.stringify(employee.notLocked));
    return formData;
  }
}
