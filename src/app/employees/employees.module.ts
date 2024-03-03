import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { AddEmployeePageComponent } from './pages/add-employee-page/add-employee-page.component';
import { EmployeeTablePageComponent } from './pages/employee-table-page/employee-table-page.component';

import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EmployeeTableComponent } from './components/employee-table/employee-table.component';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AddEmployeePageComponent,
    EmployeeTablePageComponent,
    AddEmployeeComponent,
    EmployeeTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    SelectButtonModule,
    CalendarModule,
    ButtonModule,
    TableModule,
    TagModule,
    MultiSelectModule,
    ConfirmDialogModule
  ],
  exports: [
    AddEmployeePageComponent,
    EmployeeTablePageComponent
  ],
  providers: [
    MessageService,
    ConfirmationService
  ]
})
export class EmployeesModule { }
