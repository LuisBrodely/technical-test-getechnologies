import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import charges from '../../assets/charges.json'
import status from '../../assets/status.json'

import { MessageService } from 'primeng/api';
import { EmployeesService } from '../../services/employees.service';
import { Charge, Employee, Status, StatusValue } from '../../models/Employee';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  charges: Charge[] = charges
  status: Status[] = status

  maxDate: Date = new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate());

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    date: ['', [Validators.required]],
    age: ['', [Validators.required, Validators.min(18)],],
    charge: ['', [Validators.required]],
    status: [StatusValue.Active, [Validators.required]],
  });;

  constructor (
    private fb: FormBuilder,
    private employeesService: EmployeesService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.myForm.get('date')?.valueChanges.subscribe(date => {
      if (date) {
        this.calculateAge(date);
      }
    });
  }

  calculateAge(dateOfBirth: Date) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    this.myForm.patchValue({ age });
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.messageService.add({ severity: 'warn', summary: 'Validar Campos', detail: 'Verifica los datos para poder continuar.' });
      return;
    }
    const employee: Employee = { ...this.myForm.value, charge: this.myForm.value.charge.descripcion };
    this.employeesService.addEmployee(employee);
    this.messageService.add({ severity: 'success', summary: 'Agregar Empleado', detail: `Empleado ${ employee.name } agregado con exito.` });
    this.myForm.reset({ status: StatusValue.Active });
    this.router.navigate(['/employee-table']);
  }
}
