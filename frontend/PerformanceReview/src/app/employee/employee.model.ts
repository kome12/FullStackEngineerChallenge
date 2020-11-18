export class Employee {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isAdmin: boolean;

    constructor(employee?: Employee) {
        if (employee) {
            this._id = employee._id;
            this.firstName = employee.firstName;
            this.lastName = employee.lastName;
            this.email = employee.email;
            this.password = employee.password;
            this.isAdmin = employee.isAdmin;
        }
    }

    getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}
