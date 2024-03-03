import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { EmployeesService } from '../../services/employees.service';
import { Charge, Employee, Status, StatusValue } from '../../models/Employee';
import charges from '../../assets/charges.json'
import status from '../../assets/status.json'
import { ConfirmationService, Message, MessageService } from 'primeng/api';

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
    this.employeesService.updateEmployee(employee)
    this.messageService.add({ severity: 'success', summary: 'Edidato con exito', detail: `Usuario ${ employee.name} editado.` });
    this.employees = this.employeesService.getAllEmployees();
  }

  onRowEditCancel(employee: Employee, index: number) {
      this.employees[index] = this.clonedEmployees[employee.id as string];
      delete this.clonedEmployees[employee.id as string];
  }

  deleteEmployee(event: Event, employee: Employee) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Quieres eliminar a este empleado?',
      header: 'Borrar',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",

      accept: () => {
        this.employeesService.deleteEmployee(employee.id)
        this.messageService.add({ severity: 'success', summary: 'Eliminar Empleado', detail: `Usuario ${ employee.name } eliminado.` });
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
