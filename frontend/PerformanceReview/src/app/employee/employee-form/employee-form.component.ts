import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Employee } from '../employee.model';

@Component({
    selector: 'app-employee-form',
    templateUrl: './employee-form.component.html',
    styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit, OnChanges {
    @Input() selectedEmployee: Employee;
    @Output() closeFormEvent: EventEmitter<void> = new EventEmitter<void>();
    @Output() saveEmployeeEvent: EventEmitter<Employee> = new EventEmitter<Employee>();
    @Output() deleteEmployeeEvent: EventEmitter<Employee> = new EventEmitter<Employee>();

    employeeForm: FormGroup;

    constructor(
        public fb: FormBuilder,
    ) {
        this.createForm();
    }

    createForm(): void {
        this.employeeForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            isAdmin: false,
        });
    }

    ngOnInit(): void {
        this.resetForm();
    }

    ngOnChanges(): void {
        this.resetForm();
    }

    resetForm(): void {
        this.employeeForm.reset({
            firstName: this.selectedEmployee ? this.selectedEmployee.firstName : '',
            lastName: this.selectedEmployee ? this.selectedEmployee.lastName : '',
            email: this.selectedEmployee ? this.selectedEmployee.email : '',
            password: this.selectedEmployee ? this.selectedEmployee.password : '',
            isAdmin: this.selectedEmployee ? this.selectedEmployee.isAdmin : false,
        });
    }

    closeForm(): void {
        this.closeFormEvent.emit();
    }

    saveEmployee(): void {
        const employeeFormModel = this.employeeForm.value;
        if (this.employeeForm.get('password').pristine) {
            employeeFormModel.password = this.selectedEmployee.password;
        }
        const newEmployee: Employee = new Employee(employeeFormModel);
        this.saveEmployeeEvent.emit(newEmployee);
    }

    deleteEmployee(): void {
        const employeeFormModel = this.employeeForm.value;
        const newEmployee: Employee = new Employee(employeeFormModel);
        this.deleteEmployeeEvent.emit(newEmployee);
    }
}
