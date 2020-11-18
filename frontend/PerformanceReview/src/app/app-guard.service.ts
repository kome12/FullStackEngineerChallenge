import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Subscription } from 'rxjs';

import { AppComponentService } from './app-component.service';

import { Employee } from './employee/employee.model';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    authenticated: boolean;
    subscription: Subscription;

    constructor(
        public router: Router,
        private appComponentService: AppComponentService,
    ) {
        this.subscription = appComponentService.loggedInUser$.subscribe((user: Employee) => this.authenticated = user && user.email ? true : false);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkAuthentication(route, state);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkAuthentication(route, state);
    }

    checkAuthentication(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;
        console.log('this.appComponentService.checkAuthentication():', this.appComponentService.checkAuthentication())
        console.log('url:', url)
        if (!this.appComponentService.checkAuthentication() && url !== '/login') {
            console.log('not authenticated')
            this.router.navigate(['/login']);
            return false;
        }
        else if (!this.appComponentService.checkAuthentication()) {
            console.log('came into not authenticated')
            return true;
        }
        else if (this.appComponentService.checkAuthentication() && url === '/login') {
            console.log('authenticated and url not equal to login!')
            this.router.navigate(['/employee']);
            return false;
        }
        else {
            console.log('authenticated!')
            return true;
        }
    }
}
