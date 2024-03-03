import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Charge, Employee, Status, StatusValue } from '../../models/Employee';
import { EmployeesService } from '../../services/employees.service';
import charges from '../../assets/charges.json'
import status from '../../assets/status.json'

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  charges: Charge[] = charges
  status: Status[] = status

  maxDate: Date = new Date()

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    date: ['', [Validators.required]],
    age: ['', [Validators.required],],
    charge: ['', [Validators.required]],
    status: [StatusValue.Active, [Validators.required]],
  });;

  constructor (private fb: FormBuilder, private employeesService: EmployeesService) { }

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
      alert('Ingresa los campos requeridos')
      return
    }
    this.employeesService.addEmployee(this.myForm.value as Employee)
    this.myForm.reset({ status: StatusValue.Active })
  }
}
