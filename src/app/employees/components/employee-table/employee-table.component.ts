import { Component, ViewChild } from '@angular/core';

import charges from '../../assets/charges.json'
import status from '../../assets/status.json'

import { Table } from 'primeng/table';
import { EmployeesService } from '../../services/employees.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Charge, Employee, Status, StatusValue } from '../../models/Employee';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css'],
})
export class EmployeeTableComponent {
  @ViewChild('dt1')
  dt1!: Table;

  employees: Employee[] = []
  charges: Charge[]
  status: Status[] = status

  clonedEmployees: {[s: string]: Employee} = {};
  inputFilterValue: string = '';

  constructor(
    private employeesService: EmployeesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.charges = charges
    this.charges.forEach(charge => {
      charge.value = charge.descripcion;
      charge.label = charge.descripcion;
    })
  }

  ngOnInit(): void {
    this.employees = this.employeesService.getAllEmployees();
  }

  onRowEditInit(employee: Employee) {
    this.clonedEmployees[employee.id as string] = { ...employee };
  }

  onRowEditSave(employee: Employee) {
    const age = Number(employee.age);
    if (!isNaN(age) && age >= 18) {
      employee.age = age;
      this.employeesService.updateEmployee(employee);
      this.messageService.add({ severity: 'success', summary: 'Editar Empleado', detail: `Empleado ${ employee.name } editado.` });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'La edad debe ser un número válido.' });
      return
    }
  }

  onRowEditCancel(employee: Employee, index: number) {
      this.employees[index] = this.clonedEmployees[employee.id as string];
      delete this.clonedEmployees[employee.id as string];
      this.messageService.add({ severity: 'info', summary: 'Editar Empleado', detail: `Has cancelado la edición.` });
  }

  changeEmployeeStatus(employee: Employee): void {
    const newStatus = employee.status === StatusValue.Active ? StatusValue.Inactive : StatusValue.Active;
    this.employeesService.changeEmployeeStatus(employee.id, newStatus);
    this.messageService.add({ severity: 'success', summary: 'Cambiar Estatus', detail: `Se ha cambiado el estatus del empleado ${ employee.name }.` });
  }

  deleteEmployee(event: Event, employee: Employee) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Estas seguro de eliminar a este empleado?',
      header: 'Borrar',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-text p-button-text",
      rejectButtonStyleClass:"p-button-danger p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cancelar',

      accept: () => {
        this.employeesService.deleteEmployee(employee.id)
        this.messageService.add({ severity: 'success', summary: 'Eliminar Empleado', detail: `Empleado ${ employee.name } eliminado.` });
        this.clear(this.dt1)
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Cancelar Proceso', detail: 'Has cancelado la eliminación.' });
      }
    });
  }

  getStatus(status: StatusValue) {
    switch (status) {
      case StatusValue.Inactive:
        return 'danger';
      case StatusValue.Active:
        return 'success';
      default:
        return '';
    }
  }

  clear(table: Table) {
    table.clear();
  }

}
