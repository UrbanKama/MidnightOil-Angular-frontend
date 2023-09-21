import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';

export const isRouteGuard : CanActivateFn = (route:
  ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    return inject(RouteGuardService).canActivate(route,state);
  }

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService{

  constructor() { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    return true;
  }
}
