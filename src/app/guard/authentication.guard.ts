import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';
import { NotificationType } from '../enums/notification-type.enum';


export const AuthenticationGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);
  const notificationService = inject(NotificationService);


  if (authenticationService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    // send notification
    notificationService.notify(NotificationType.ERROR, 'You need to log in to access this page');
    return false;
  }
  
  
}
