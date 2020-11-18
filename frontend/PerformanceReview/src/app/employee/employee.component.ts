import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

import { Employee } from './employee.model';
import { EmployeeService } from './employee.service';
import { HelperFunctionService } from '../helper/helper-function.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})

export class EmployeeComponent implements OnInit {
    employees: Array<Employee>;
    selection = new SelectionModel<Employee>(false, null);
    displayEmployeeForm: boolean;
    selectedEmployee: Employee;
    tableColumns: Array<string> = [
        'firstName',
        'lastName',
        'email',
        'isAdmin',
    ]

    constructor(
        private router: Router,
        private employeeService: EmployeeService,
    ) { }

    ngOnInit(): void {
        this.getEmployees();
    }

    getEmployees(): void {
        this.employeeService.getEmployees()
        .subscribe((result: any) => {
            if (result && result.data) {
                this.employees = result.data.map((employee: Employee) => new Employee(employee));
            }
        });
    }

    createNewEmployee(): void {
        this.displayEmployeeForm = true;
    }

    selectedRow(employee: Employee): void {
        this.displayEmployeeForm = true;
        this.selectedEmployee = employee;
    }

    closeForm(): void {
        this.displayEmployeeForm = false;
        this.selectedEmployee = null;
    }

    saveEmployee(employee: Employee): void {
        if (this.selectedEmployee && this.selectedEmployee._id) {
            employee._id = this.selectedEmployee._id;
            this.employeeService.updateEmployee(employee)
                .subscribe((result: any) => {
                    console.log('result from update:', result)
                    this.closeForm();
                    this.getEmployees();
                });
        }
        else {
            this.employeeService.createEmployee(employee)
                .subscribe((result: any) => {
                    console.log('result from create:', result)
                    this.closeForm();
                    this.getEmployees();
                });
        }
    }

    deleteEmployee(employee: Employee): void {
        HelperFunctionService.confirm(`Do you really want to delete this employee ${employee.firstName} ${employee.lastName}`)
            .then((toDelete: boolean) => {
                if (toDelete) {
                    this.employeeService.deleteEmployee(employee)
                        .subscribe((result: any) => {
                            this.closeForm();
                            this.getEmployees();
                        });
                }
            })
            .catch((err: any) => {
                console.error('Error with confirmation popup:', err);
            });
    }
}
