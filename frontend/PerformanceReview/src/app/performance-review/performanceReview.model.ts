import { Employee } from '../employee/employee.model';

export class PerformanceReview {
    _id: string;
    prForId: string;
    prFromId: string;
    requestedToId: string;
    comment: string;
    prFor: string;
    prFrom: string;
    requestedTo: string;

    constructor(performanceReview?: PerformanceReview) {
        this._id = performanceReview._id;
        this.prForId = performanceReview.prForId;
        this.prFor = this.prForId;
        this.prFromId = performanceReview.prFromId;
        this.prFrom = this.prFromId;
        this.requestedToId = performanceReview.requestedToId;
        this.requestedTo = this.requestedToId;
        this.comment = performanceReview.comment;
    }

    populateEmployeeIds(employees: Array<Employee>): void {
        if (employees) {
            const prFor: Employee = this.findOneFromEmployeeById(employees, this.prForId);
            if (prFor) {
                this.prFor = prFor.getFullName();
            }
            const prFrom: Employee = this.findOneFromEmployeeById(employees, this.prFromId);
            if (prFrom) {
                this.prFrom = prFrom.getFullName();
            }
            const requestedTo: Employee = this.findOneFromEmployeeById(employees, this.requestedToId);
            if (requestedTo) {
                this.requestedTo = requestedTo.getFullName();
            }
        }
    }

    findOneFromEmployeeById(employees: Array<Employee>, id: string): Employee {
        return employees.find((employee: Employee) => employee._id === id);
    }
}
