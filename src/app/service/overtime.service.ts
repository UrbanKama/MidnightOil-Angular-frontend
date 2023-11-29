import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { OvertimeShift } from '../models/overtimeShift';

@Injectable({
  providedIn: 'root'
})
export class OvertimeService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // GET ALL OVERTIME SHIFTS
  public getOvertimeShifts(): Observable<OvertimeShift[] | HttpErrorResponse> {
    return this.http.get<OvertimeShift[]>(`${this.host}/overtime/list`)
  }

  // CREATE AN OVERTIME SHIFT


  // ADD SHIFTS TO LOCAL CACHE
  public addOvertimeShiftsToLocalCache(overtimeShifts: OvertimeShift[]): void {
    localStorage.setItem('OT-shifts', JSON.stringify(overtimeShifts));
  }
  //GET OT SHIFTS FROM LOCAL CACHE
  public getOvertimeShiftsFromLocalCache(): OvertimeShift[] | null {
    if (localStorage.getItem('OT-shifts')) {
      return JSON.parse(localStorage.getItem('OT-shifts') || '{}')
    }
    return null;
  }
}
