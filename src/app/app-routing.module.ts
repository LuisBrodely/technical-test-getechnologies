import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeePageComponent } from './employees/pages/add-employee-page/add-employee-page.component';
import { EmployeeTablePageComponent } from './employees/pages/employee-table-page/employee-table-page.component';

const routes: Routes = [
  { path: 'add-employee', component: AddEmployeePageComponent },
  { path: 'employee-table', component: EmployeeTablePageComponent},
  { path: '', redirectTo: '/add-employee', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
