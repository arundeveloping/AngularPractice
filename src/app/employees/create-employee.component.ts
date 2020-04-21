import { Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from "../models/department.model";
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
}) 
export class CreateEmployeeComponent implements OnInit {
  panelTitle: string;
  @ViewChild('employeeForm') public createEmployeeForm: NgForm;
  email;
  name;
  gender;
  phoneNumber;
  isActive;
  department;
  departments: Department[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Payroll' }
  ];
  dateOfBirth;
  photoPath;
  employee: Employee = {
    id: null,
    name: null,
    gender: null,
    
    phoneNumber: null,
    email: '',
    dateOfBirth: null,
    department: '-1',
    isActive: null,
    photoPath: null
  };
   
  constructor(private _employeeService: EmployeeService,
    private _router: Router, private _route:ActivatedRoute) { }

    ngOnInit() {
      this._route.paramMap.subscribe(parameterMap => {
        const id = +parameterMap.get('id');
        this.getEmployee(id);
      });
    }
    
    saveEmployee(empForm: NgForm): void {
      if (this.employee.id == null) {
        console.log(this.employee);
        this._employeeService.addEmployee(this.employee).subscribe(
          (data: Employee) => {
            console.log(data);
            empForm.reset();
            this._router.navigate(['list']);
          },
          (error: any) => { console.log(error); }
        );
      } else {
        this._employeeService.updateEmployee(this.employee).subscribe(
          () => {
            empForm.reset();
            this._router.navigate(['list']);
          },
          (error: any) => { console.log(error); }
        );
      }
    }
    private getEmployee(id: number) {
      // If the id is 0, we want to create a new employee. So we intialise the employee 
      // property with an Employee object with all properties set to null. The template 
      // is bound to this employee property so all the form fields are displayed blank, 
      // to enter details of a new employee we want to create
      if (id === 0) {
        this.employee = {
          id: null,
          name: null,
          gender: null,
          
          phoneNumber: null,
          email: '',
          dateOfBirth: null,
          department: null,
          isActive: null,
          photoPath: null
        };
        // Resetting the form, resets any previous validation errors
       // this.createEmployeeForm.reset();
        this.panelTitle = 'Create Employee';
      } else {
        this._employeeService.getEmployee(id).subscribe(
          (employee) => { this.employee = employee; },
          (err: any) => console.log(err)
        );
        this.panelTitle = 'Edit Employee';
      }
      }
    }


   