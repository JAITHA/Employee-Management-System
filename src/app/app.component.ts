import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Employee } from './Model/employee.model';
import { EmployeeService } from './service/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('fileInput') fileInput: any;
  title = 'emp-system';
  alert:boolean = false;

  employeeform: FormGroup;

  employees: Employee[];
  empTodisplay: Employee[];
  educations = ['10th pass', 'iploma', 'Graduate', 'Master', 'Phd'];
  @ViewChild('addEmployeeButton') addEmployeeButton: any;

  constructor(private fb: FormBuilder, private empservice: EmployeeService) {
    this.employeeform = fb.group({});
    this.employees = [];
    this.empTodisplay = this.employees;
  }

  ngOnInit(): void {
    this.employeeform = this.fb.group({
      firstname: this.fb.control(''),
      lastname: this.fb.control(''),
      birthday: this.fb.control(''),
      gender: this.fb.control(''),
      education: this.fb.control(''),
      company: this.fb.control(''),
      jobexp: this.fb.control(''),
      sallery: this.fb.control(''),
    });

    this.empservice.getdata().subscribe((res) => {

      // if employee add the system
      for(let emp of res){
        this.employees.unshift(emp);
      }
      this.empTodisplay = this.employees;
    });
  }

  ngAfterViewInit(): void {
  }

  addEmployee() {
    let employee: Employee = {
      firstname: this.Firtsname.value,
      lastname: this.Lastname.value,
      birthday: this.Birthday.value,
      gender: this.Gender.value,
      education: this.educations[parseInt(this.Education.value)],
      company: this.Company.value,
      jobexp: this.JobExp.value,
      sallery: this.Sallery.value,
      profile: this.fileInput.nativeElement.files[0]?.name,
    };
    this.empservice.postEmp(employee).subscribe((res) => {
      this.employees.unshift(res);
      this.clearForm();
    });
  }

  deleteEmployee(id:any){
    this.empservice.deleteEmp(id).subscribe( {
      next:()=>{
        this.alert = true;
      },
    error:()=>{
      this.alert = false;
    }})
  }

  deletemsg(){
    window.location.reload();
  }

  // load the valus in the form

  setForm(emp : Employee){
    this.Firtsname.setValue(emp.firstname);
    this.Lastname.setValue(emp.lastname);
    this.Birthday.setValue(emp.birthday);
    this.Gender.setValue(emp.gender);
    let educationIndex = 0;
    this.educations.forEach((val, index) => {
      if (val === emp.education) educationIndex = index;
    });
    this.Education.setValue(educationIndex);
    this.Company.setValue(emp.company);
    this.JobExp.setValue(emp.jobexp);
    this.Sallery.setValue(emp.sallery);
    this.fileInput.nativeElement.value = '';
  }

  editEmployee(event: any) {
    this.employees.forEach((val) => {
      if (val.id === event) {
        this.setForm(val);
      }
    });
    // this.deleteEmployee(event);
    this.addEmployeeButton.nativeElement.click();
  }

  searchEmployee(event:any){
    let fileteremp:Employee [] = [];

    if(event == ''){
      this.empTodisplay = this.employees;
    }else{
      fileteremp = this.employees.filter((val, index)=>{
        let targetKey = val.firstname.toLowerCase() + '' + val.lastname.toLowerCase();
        let searchKey = event.toLowerCase();
        return targetKey.includes(searchKey);
      });
      this.empTodisplay = fileteremp;
    }
  }

  // addemp() {
  //   this.empservice.postEmp(this.employeeform.value).subscribe((res) => {
  //     console.log(res);
  //   });
  // }

  clearForm(){
    this.Firtsname.setValue('');
    this.Lastname.setValue('');
    this.Birthday.setValue('');
    this.Gender.setValue('');
    this.Education.setValue('');
    this.Company.setValue('');
    this.JobExp.setValue('');
    this.Sallery.setValue('');
    this.fileInput.nativeElement.value = '';
  }

    // Form validation

  public get Firtsname(): FormControl {
    return this.employeeform.get('firstname') as FormControl;
  }

  public get Lastname(): FormControl {
    return this.employeeform.get('lastname') as FormControl;
  }

  public get Birthday(): FormControl {
    return this.employeeform.get('birthday') as FormControl;
  }

  public get Gender(): FormControl {
    return this.employeeform.get('gender') as FormControl;
  }

  public get Education(): FormControl {
    return this.employeeform.get('education') as FormControl;
  }

  public get Company(): FormControl {
    return this.employeeform.get('company') as FormControl;
  }
  public get JobExp(): FormControl {
    return this.employeeform.get('jobexp') as FormControl;
  }
  public get Sallery(): FormControl {
    return this.employeeform.get('sallery') as FormControl;
  }
}
