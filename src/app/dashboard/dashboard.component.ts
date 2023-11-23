import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {BreakpointObserver } from '@angular/cdk/layout'
import { MatSidenav } from '@angular/material/sidenav';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  sidenavMode = '';

  name = ''

  userId = '';
  username = '';
  role = '';

  constructor(
    private route: ActivatedRoute,
    private observer: BreakpointObserver,
    private authenticationService: AuthenticationService,
    private router: Router){

  }

  ngOnInit(): void {
    this.name = this.route.snapshot.params['name'];
    console.log(this.route.snapshot.params['name']);

    if (this.authenticationService.isLoggedIn()){
      this.router.navigateByUrl('/dashboard');
    } else {
      this.router.navigateByUrl('/login');
    }

    this.getUsername();
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

  

}
