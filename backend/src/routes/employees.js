const express = require('express');
const employeeRouter = express.Router();

const mongoose = require('mongoose');

const Employee = require('../models/employee');

employeeRouter.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (email && password) {
        Employee.findOne({
            email: email
        }, (err, employee) => {
            if (!employee) {
                return res.status(401).json({ message: 'Employee not found' });
            }
            new Employee(employee).comparePassword(password, (err, isMatch) => {
                if (err) {
                    return res.status(400).json({ message: 'Error in logging in', err: err });
                }
                if (!isMatch) {
                    return res.status(401).json({ message: 'Incorrect username or password' });
                }
                console.log('Successfully logged in:', employee)
                return res.status(200).json({ message: 'Successfully logged in', data: employee });
            });
        })
    }
    else {
        return res.status(401).json({ message: 'No email or password provided' });
    }
});

employeeRouter.post('/employee', (req, res) => {
    const tempEmployee = req.body;
    if (tempEmployee) {
        const employee = new Employee(tempEmployee).save((err, employee) => {
            if (err) {
                console.error('Error, could not create employee:', err);
                return res.status(400).json({ message: 'Error, could not create employee', err: err });
            }
            else {
                return res.status(200).json({ message: 'Successfully created employee', data: employee });
            }
        });
    }
    else {
        return res.status(400).json({ message: 'no user provided' });
    }
});

employeeRouter.get('/employees', (req, res) => {
    Employee.find({}, (err, employees) => {
        if (err) {
            console.error('Error, could not get employees:', err);
            return res.status(400).json({ message: 'Error, could not get employees', err: err });
        }
        else {
            console.log('got employess:', employees)
            return res.status(200).json({ message: 'Successfully got employees:', data: employees });
        }
    });
});

employeeRouter.get('/employee/:id', (req, res) => {
    const id = req.params.id;
    if (id) {
        Employee.findById(id, (err, employee) => {
            if (err) {
                console.error(`Error, could not get employee with id ${id}`, err);
                return res.status(400).json({ message: `Error, could not get employee with id ${id}`, err: err });
            }
            else {
                console.log('got employes:', employee)
                return res.status(200).json({ message: 'Successfully got employee:', data: employee });
            }
        });
    }
    else {
        console.error('No id provided to find employee', err);
        return res.status(400).json({ message: 'No id provided to find employee', err: err });
    }
});

employeeRouter.put('/employee/:id', (req, res) => {
    const id = req.params.id;
    const updatedEmployee = req.body;
    if (id && updatedEmployee) {
        Employee.findById(id, (err, savedEmployee) => {
            savedEmployee.firstName = updatedEmployee.firstName;
            savedEmployee.lastName = updatedEmployee.lastName;
            savedEmployee.email = updatedEmployee.email;
            savedEmployee.password = updatedEmployee.password;
            savedEmployee.isAdmin = updatedEmployee.isAdmin;
            new Employee(savedEmployee).save((err, newEmployee) => {
                if (err) {
                    console.error('Error, could not update employee:', err);
                    return res.status(400).json({ message: 'Error, could not update employee', err: err });
                }
                else {
                    return res.status(200).json({ message: 'Successfully updated employee', data: newEmployee });
                }
            });
        });
    }
    else {
        console.error('No id provided to update employee', err);
        return res.status(400).json({ message: 'No id provided to update employee', err: err });
    }
});

employeeRouter.delete('/employee/:id', (req, res) => {
    const id = req.params.id;
    if (id) {
        Employee.findOneAndDelete(id, (err, deletedEmployee) => {
            if (err) {
                console.error(`Error, could not delete employee with id ${id}`, err);
                return res.status(400).json({ message: `Error, could not delete employee with id ${id}`, err: err });
            }
            else {
                return res.status(200).json({ message: 'Successfully deleted employee', data: deletedEmployee });
            }
        });
    }
    else {
        console.error('No id provided to delete employee', err);
        return res.status(400).json({ message: 'No id provided to delete employee', err: err });
    }
});

module.exports = employeeRouter;
