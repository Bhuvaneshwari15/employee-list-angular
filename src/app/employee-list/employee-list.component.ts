// src/app/employee-list/employee-list.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Employee, EmployeeService } from '../employee.service';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  isLoading: boolean = true;

  constructor(private employeeService: EmployeeService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (data: Employee[]) => {
        this.employees = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching employee data', error);
        this.isLoading = false;
      }
    );
  }

  openDialog(employee?: Employee): void {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '400px',
      data: employee || { id: 0, name: '', username: '', email: '', phone: '', address: {}, company: {} }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.updateEmployee(result);
        } else {
          this.addEmployee(result);
        }
      }
    });
  }

  addEmployee(employee: Employee): void {
    this.employees.push({ ...employee, id: this.employees.length + 1 });
  }

  updateEmployee(updatedEmployee: Employee): void {
    const index = this.employees.findIndex(emp => emp.id === updatedEmployee.id);
    if (index !== -1) {
      this.employees[index] = updatedEmployee;
    }
  }

  editEmployee(employee: Employee): void {
    this.openDialog(employee);
  }

  deleteEmployee(employee: Employee): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employees = this.employees.filter(emp => emp.id !== employee.id);
      }
    });
  }
}
