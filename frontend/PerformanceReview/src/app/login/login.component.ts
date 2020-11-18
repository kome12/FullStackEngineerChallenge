import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppComponentService } from '../app-component.service';
import { LoginService } from './login.service';
import { Employee } from '../employee/employee.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    errorMessage: string;

    constructor(
        public fb: FormBuilder,
        public router: Router,
        private appComponentService: AppComponentService,
        private loginService: LoginService,
    ) {
        this.createForm();
    }

    createForm(): void {
        this.loginForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    ngOnInit(): void {
    }

    login(): void {
        this.errorMessage = '';
        const loginFormModel = this.loginForm.value;
        console.log('loginFormModel:', loginFormModel)
        this.loginService.login(loginFormModel.email, loginFormModel.password)
            .subscribe((result: any) => {
                console.log('result:', result)
                if (result.data) {
                    const user = new Employee(result.data);
                    this.appComponentService.setLoggedInUser(user);
                    this.router.navigate(['/']);
                }
            },
            (err: any) => {
                console.error(`Error logging in: ${err}`);
                this.errorMessage = 'Error logging in';
            });
    }
}
