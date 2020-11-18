import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { HelperFunctionService } from '../helper/helper-function.service';

import { Employee } from './employee.model';
import { BACKEND_API } from '../app-component.service';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    constructor(
        private httpClient: HttpClient
    ) { }

    getEmployees() {
        const link: string = `${BACKEND_API}/employees`;
        const headers: HttpHeaders = HelperFunctionService.getHeaders();
        const options = { headers: headers };
        return this.httpClient.get(link, options);
    }

    createEmployee(employee: Employee) {
        const link: string = `${BACKEND_API}/employee/`;
        const headers: HttpHeaders = HelperFunctionService.getHeaders();
        const jsonData: string = JSON.stringify(employee);
        let options = { headers: headers };
        return this.httpClient.post(link, jsonData, options);
    }

    updateEmployee(employee: Employee) {
        const link: string = `${BACKEND_API}/employee/${employee._id}`;
        const headers: HttpHeaders = HelperFunctionService.getHeaders();
        const jsonData: string = JSON.stringify(employee);
        let options = { headers: headers };
        return this.httpClient.put(link, jsonData, options);
    }

    deleteEmployee(employee: Employee) {
        const link: string = `${BACKEND_API}/employee/${employee._id}`;
        const headers: HttpHeaders = HelperFunctionService.getHeaders();
        let options = { headers: headers };
        return this.httpClient.delete(link, options);
    }
}
