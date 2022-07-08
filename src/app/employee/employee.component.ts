import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from '../Model/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

 @Input() employee!: Employee;
 @Output() deleteemp = new EventEmitter<any>();
 @Output() editemp = new EventEmitter<any>();
  constructor() { 
    this.employee = {
      firstname: '',
      lastname: '',
      birthday: '',
      gender: '',
      education: '',
      company: '',
      jobexp: 0,
      sallery: 0,
      profile: '',
    };

  }

  ngOnInit(): void {
  }

  deleteviewEmp(){
    this.deleteemp.emit(this.employee.id);
  }

  editemployee(){
    this.editemp.emit(this.employee.id)
  }

}
