import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { Employee } from './employee/employee.model';
export const BACKEND_API = 'http://localhost:3000/api';

@Injectable({
    providedIn: 'root'
})
export class AppComponentService {
    private loggedInUser: BehaviorSubject<Employee> = new BehaviorSubject(<Employee>{});

    loggedInUser$ = this.loggedInUser.asObservable();
    loggedInUserIsAdmin: boolean;

    constructor(
        private router: Router,
    ) { }

    public setLoggedInUser(user: Employee): void {
        this.loggedInUserIsAdmin = user && user.isAdmin;
        user.password = null;
        localStorage.setItem('user', JSON.stringify(user));
        this.loggedInUser.next(user);
    }

    public getLoggedInUser(): Employee {
        return this.loggedInUser.value;
    }

    public getLoggedInUserIsAdmin(): boolean {
        return this.loggedInUserIsAdmin;
    }

    public checkAuthentication(): boolean {
        const user: string = localStorage.getItem('user');
        const employee: Employee = new Employee(JSON.parse(user));
        if (employee && employee.email) {
            this.setLoggedInUser(employee);
            return true;
        }
        return false;
    }

    public logout(): void {
        localStorage.removeItem('user');
        this.setLoggedInUser(<Employee>{});
        this.router.navigate(['/login']);
    }
}
