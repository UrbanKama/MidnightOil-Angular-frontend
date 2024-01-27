import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {BreakpointObserver } from '@angular/cdk/layout'
import { MatSidenav } from '@angular/material/sidenav';
import { AuthenticationService } from '../service/authentication.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { OvertimeShift } from '../models/overtimeShift';
import { OvertimeService } from '../service/overtime.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationType } from '../enums/notification-type.enum';
import { NotificationService } from '../service/notification.service';
import { DatePipe, formatDate } from '@angular/common';

export interface User {
  selectedDate: Date;
}
export interface JSONUser {
  selectedDate: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private titleSubject = new BehaviorSubject<string>('home');
  public titleAction$ = this.titleSubject.asObservable();

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  sidenavMode = '';

  name = ''

  // USER VARIABLES
  userId = '';
  username = '';
  role = '';

  // OVERTIME VARIABLES
  public overtimeShifts: OvertimeShift[];
  private subscriptions: Subscription[] = [];

  // CALENDAR VARIABLES
  public calendarDate ='';
  public DateData = formatDate(new Date(), 'dd-MM-yyyy', 'en');
  public model_result: string = this.DateData;

  constructor(
    private route: ActivatedRoute,
    private observer: BreakpointObserver,
    private authenticationService: AuthenticationService,
    private overtimeService: OvertimeService,
    private notificationService: NotificationService,
    private router: Router
    ){

  }

  ngOnInit(): void {

    // this.user = this.DateData;

    this.name = this.route.snapshot.params['name'];

    if (this.authenticationService.isLoggedIn()){
      this.router.navigateByUrl('/dashboard');
    } else {
      this.router.navigateByUrl('/login');
    }
    this.getUsername();
    // this.getOvertimeShifts(true);

    this.getAvailableOvertimeByDate(this.DateData);
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if(res.matches) {
        this.sidenav.mode = 'over';
        this.sidenavMode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenavMode = 'side';
        this.sidenav.open();
      }
    })
  }

  // CALENDAR
  onChange(args: any){
    this.DateData = args.value;
    this.model_result = formatDate(this.DateData, 'dd-MM-yyyy', 'en');
    console.log(this.model_result)
    this.getAvailableOvertimeByDate(this.model_result);
  }

  getUsername(): void{
    var user = this.authenticationService.getEmployeeFromLocalCache();
    this.username = user.username;
    this.userId = user.userId;
    switch (user.roles) {
      case 'ROLE_USER':
        this.role = 'Retail assistant';
        break;
      case 'ROLE_TEAM_MANAGER':
        this.role = 'Team Manger';
        break;
      case 'ROLE_STORE_MANAGER':
        this.role = 'Store Manager';
        break;
    }
    console.log(user.roles);
  }

  public changeTitle(title: string): void {
    this.titleSubject.next(title);
  }

  // GET AVAILABLE OVERTIME BY DATE
  public getAvailableOvertimeByDate(date: string) {
    console.log(date);
    this.subscriptions.push(
      this.overtimeService.getAvailableOvertimeByDate(date).subscribe(
        (response: OvertimeShift[] | any) => {
          this.overtimeService.addOvertimeShiftsToLocalCache(response);
          this.overtimeShifts = response;
          console.log(response);
          // if(showNotification){
          //   this.sendNotification(NotificationType.SUCCESS, `${response.length} shift(s) for ${this.DateData} loaded`);
          // }
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    )
  }

  // public getOvertimeShifts(showNotification: boolean): void {
  //   this.subscriptions.push(
  //     this.overtimeService.getOvertimeShifts().subscribe(
  //       (response: OvertimeShift[] | any) => {
  //         this.overtimeService.addOvertimeShiftsToLocalCache(response);
  //         this.overtimeShifts = response;
  //         if (showNotification) {
  //           this.sendNotification(NotificationType.SUCCESS, `${response.length} shift(s) loaded successfully`);
  //         }
  //       },
  //       (errorResponse: HttpErrorResponse) => {
  //         this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
  //       }
  //     )
  //   )
  // }

  private sendNotification(notificationType: NotificationType, message: string): void {
    
    if(message){
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occured. Please try again');
    }
  }
  

}
