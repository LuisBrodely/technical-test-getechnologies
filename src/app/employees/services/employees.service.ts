import { Injectable } from '@angular/core';
import { ChargeValue, Employee, StatusValue } from '../models/Employee';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  public employees: Employee[] = [
    {
      id: uuidv4(),
      name: 'Steve Jobs',
      birthdate: new Date(),
      age: 56,
      charge: ChargeValue.Subdirector,
      status: StatusValue.Inactive
    },
    {
      id: uuidv4(),
      name: 'Mark Zuckerberg',
      birthdate: new Date(),
      age: 39,
      charge: ChargeValue.Coordinador,
      status: StatusValue.Active
    },
    {
      id: uuidv4(),
      name: 'Bill Gates',
      birthdate: new Date(),
      age: 68,
      charge: ChargeValue.Coordinador,
      status: StatusValue.Inactive
    },
    {
      id: uuidv4(),
      name: 'Elonk Musk',
      birthdate: new Date(),
      age: 52,
      charge: ChargeValue.Gerente,
      status: StatusValue.Active
    },
  ];

  constructor() { }

  getAllEmployees(): Employee[] {
    return this.employees;
  }

  addEmployee(employeeData: Employee): void {
    const newEmployee: Employee = { ...employeeData, id: uuidv4() };
    this.employees.push(newEmployee);
    console.log('Agregar =>', this.employees)
  }

  updateEmployee(updatedEmployee: Employee): void {
    const index = this.employees.findIndex(employee => employee.id === updatedEmployee.id);
    if (index !== -1) {
      this.employees[index] = updatedEmployee;
    }
    console.log('Actualizar =>', this.employees)
  }

  changeEmployeeStatus(employeeId: string, newStatus: StatusValue): void {
    const employee = this.employees.find(emp => emp.id === employeeId);
    if (employee) {
      employee.status = newStatus;
    }
    console.log('Cambiar estado =>', this.employees);
  }

  deleteEmployee(employeeId: string): void {
    const index = this.employees.findIndex(employee => employee.id === employeeId);
    if (index !== -1) {
      this.employees.splice(index, 1);
    }
    console.log('Borrar =>', this.employees)
  }

}
