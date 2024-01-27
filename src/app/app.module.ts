import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AuthenticationService } from './service/authentication.service';
import { EmployeeService } from './service/employee.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthenticationGuard } from './guard/authentication.guard';
import { provideRouter } from '@angular/router';
import { NotificationModule } from './notification.module';
import { NotificationService } from './service/notification.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CalendarModule, DatePickerModule, TimePickerModule, DateRangePickerModule, DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    DashboardComponent,
    ErrorComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    NotificationModule,
    CalendarModule, DatePickerModule, TimePickerModule, DateRangePickerModule, DateTimePickerModule
  ],
  providers: [ NotificationService, AuthenticationService, EmployeeService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, provideRouter([
    {
      path: '',
      component: LoginComponent,
      canActivate: [AuthenticationGuard]
    }
  ])],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
