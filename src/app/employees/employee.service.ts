import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Observable, of,throwError} from 'rxjs';
import { delay, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

// The @Injectable() decorator is used to inject other dependencies
// into this service. As our service does not have any dependencies
// at the moment, we may remove the @Injectable() decorator and the
// service works exactly the same way. However, Angular recomends
// to always use @Injectable() decorator to ensures consistency
@Injectable()
export class EmployeeService {
  baseUrl = 'http://localhost:3000/employees';
  constructor(private httpClient: HttpClient) {
  }

    private listEmployees: Employee[] = [
        {
            id:1,
            name:"Arun",
            gender:"Male",
            email:"a@arun.com",
            phoneNumber:7259804436,
            
            dateOfBirth:new Date("06/17/1993"),
            department:"3",
            isActive:true,
            photoPath:"assets/images/arun.jpg",
            
        },
        {
          id:2,
            name:"Naruto",
            gender:"Male",
            email:"naruto@arun.com",
            phoneNumber:7259804436,
            
            dateOfBirth:new Date("10/10/1993"),
            department:"4",
            isActive:true,
            photoPath:"assets/images/naruto.jpg",
            
        },
        {
          id:3,
            name:"Sasuke",
            gender:"Male",
            email:"Sasuke@arun.com",
            phoneNumber:7259804436,
           
            dateOfBirth:new Date("07/23/1993"),
            department:"4",
            isActive:true,
            photoPath:"assets/images/sasuke.jpg",
            
        },
        {
          id:4,
            name:"Shikamaru",
            gender:"Male",
            email:"Shikamaru@arun.com",
            phoneNumber:7259804436,
           
            dateOfBirth:new Date("09/22/1993"),
            department:"4",
            isActive:true,
            photoPath:"assets/images/shikamaru.png",
           
        }
    ];

    getEmployees(): Observable<Employee[]> {
      return this.httpClient.get<Employee[]>(this.baseUrl).pipe(catchError(this.handleError));
  }
  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
        console.error('Client Side Error :', errorResponse.error.message);
    } else {
        console.error('Server Side Error :', errorResponse);
    }
    // return an observable with a meaningful error message to the end user
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
}

getEmployee(id: number): Observable<Employee> {
  return this.httpClient.get<Employee>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
}

    addEmployee(employee: Employee): Observable<Employee> {
      
          // const maxId = this.listEmployees.reduce(function (e1, e2) {
          //     return (e1.id > e2.id) ? e1 : e2;
          // }).id;
          // employee.id = maxId + 1;
          // employee.id = 0;
  
          // this.listEmployees.push(employee);
          return this.httpClient.post<Employee>('http://localhost:3000/employees',
              employee, {
                  headers: new HttpHeaders({
                      'Content-Type': 'application/json'
                  })
              })
              .pipe(catchError(this.handleError));
      
  }
  updateEmployee(employee: Employee): Observable<void> {
    return this.httpClient.put<void>(`${this.baseUrl}/${employee.id}`, employee, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    })
    .pipe(catchError(this.handleError));
}
deleteEmployee(id: number): Observable<void> {
  return this.httpClient.delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
}
}