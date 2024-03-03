import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  routes?: MenuItem[];

  ngOnInit() {
    this.routes = [
      {
        label: 'Menu',
        icon: 'pi pi-bars',
        items: [
          {
            label: 'Agregar Empleado',
            icon: 'pi pi-user-plus',
            routerLink: ['/add-employee'],
          },
          {
            label: 'Empleados',
            icon: 'pi pi-users',
            routerLink: ['/employee-table'],
          },
        ],
      },
    ];
  }
}
