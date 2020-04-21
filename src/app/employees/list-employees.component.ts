import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ResolvedEmployeeList } from './resolved-employeelist.model';

@Component({
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})

export class ListEmployeesComponent implements OnInit {
  employees: Employee[];
  filteredEmployees: Employee[];
 
  employeeToDisplay: Employee;
  private arrayIndex = 1;
  dataFromChild: Employee;
 
  // Use this property to stored filtered employees, so we do not
  // lose the original list and do not have to make a round trip
  // to the web server on every new search
  

  private _searchTerm: string;
  error: string;

  // We are binding to this property in the view template, so this
  // getter is called when the binding needs to read the value
  get searchTerm(): string {
    return this._searchTerm;
  }

  // This setter is called everytime the value in the search text box changes
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredEmployees = this.filterEmployees(value);
  }

  constructor(private _employeeService: EmployeeService,
    private _router: Router,
    private _route: ActivatedRoute) {

      const resolvedData: string | Employee[] = this._route.snapshot.data['employeeList'];

// If the resolver completed without errors resolvedData is an Employee[]
if (Array.isArray(resolvedData)) {
  this.employees = resolvedData;
} else {
  this.error = resolvedData;
}

    if (this._route.snapshot.queryParamMap.has('searchTerm')) {
      this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
    } else {
      this.filteredEmployees = this.employees;
    }
  }

    ngOnInit() {
     
    }
  nextEmployee(): void {
    if (this.employeeToDisplay.id <= 3) {
      this.employeeToDisplay = this.employees[this.arrayIndex];
      this.arrayIndex++;
    } else {
      this.employeeToDisplay = this.employees[0];
      this.arrayIndex = 1;
    }
  }
  handleNotify(eventData: Employee) {
    this.dataFromChild = eventData;
  }
  onClick(employeeId: number) {
    this._router.navigate(['employees', employeeId], {
      queryParams: { 'searchTerm': this.searchTerm, 'testParam': 'testValue' }
    });
  }
  filterEmployees(searchString: string) {
    return this.employees.filter(employee =>
      employee.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }
  onDeleteNotification(id: number) {
    const i = this.filteredEmployees.findIndex(e => e.id === id);
    if (i !== -1) {
      this.filteredEmployees.splice(i, 1);
    }
  } 
}
 