import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../Model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  _url = 'http://localhost:3000/posts';

  constructor(private _http:HttpClient) { }

  getdata(){
    return this._http.get<Employee[]>(this._url);
  }

  postEmp(emp:Employee){
    return this._http.post<Employee>(this._url, emp)
  }

  deleteEmp(id:any){
    return this._http.delete(this._url+'/'+id);
  }

}
