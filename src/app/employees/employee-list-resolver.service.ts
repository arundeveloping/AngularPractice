import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Employee } from '../models/employee.model';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { EmployeeService } from './employee.service';
import { ResolvedEmployeeList } from './resolved-employeelist.model';
import { map, catchError } from 'rxjs/operators';

@Injectable()
// The resolver returns a union type - either an Employee[] or string
// Employee[]  will be returned if the resolver completes successfully
// else the string error message will be returned
export class EmployeeListResolverService implements Resolve<Employee[] | string> {
    constructor(private _employeeService: EmployeeService) {
    }

    // The return type of the resolve() method matches with the above
    // Resolve interface signtaure
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee[] | string> {
        return this._employeeService.getEmployees()
            .pipe(catchError((err: string) => of(err)));
    }
}