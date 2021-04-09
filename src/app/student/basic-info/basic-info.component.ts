import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentsService } from 'src/app/shared/students.service';
import * as moment from 'moment';
import { FormGroupDirective } from '@angular/forms';
@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {
  public tableDataSource = [];
  public studentsMasterList;
  public selectedRow;
  public displayedColumns : string[] = ['$id', 'name', 'email', 'mobile', 'dob', 'gender', 'update', 'delete']
  public studentData = {name: '', email:'', mobile: '', dob: '', gender: '' ,id: ''}
  public isEdit = false;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  constructor(public studentservice: StudentsService) { }

  ngOnInit(): void {
    this.getLatestUser();
  }
  public gendersList = [
    { name: 'Male', value: 'Male'},
    {name: 'Female', value: 'Female'},
    {name: 'Other', value: 'Other'}
  ]
  
  public onClear() {
    this.studentservice.studentForm.reset();
    this.studentservice.initializeFormGroup();
  }
  public onSubmit(data) {
    if(this.studentservice.studentForm.valid) {
      this.studentservice.onFormSubmit(data).subscribe((response) => {
        this.getLatestUser();
      });
      setTimeout(() => 
      this.formGroupDirective.resetForm(), 0);
    }
  }
  public getLatestUser() {
    this.studentservice.getAllUser().subscribe((response) => {
      this.studentsMasterList = response;
      this.transformDataSource();
    })
  };
  public transformDataSource() {
    this.tableDataSource = this.studentsMasterList.map(obj => {obj.formattedDob = this.calculateDate(obj.dob)});
  }
  public calculateDate(date) {
    return moment(date).format('DD/MM/YYYY');
  } 
  public highlight(row, $event) {
    this.selectedRow = row;
    $event.stopPropagation();
  }
  public updateStudentData(element) {
    console.log(element);
    this.isEdit = true;
    this.studentData = element;
  }
  public onUpdate(data,) {
    this.isEdit = !this.isEdit
    this.studentservice.updateStudent(data).subscribe(() => {
      this.getLatestUser();
      this.formGroupDirective.resetForm();
    })
  }
  deleteStudent(student) {
      this.studentservice.deleteStudents(student).subscribe(() => {
        this.getLatestUser();
      })
  }
}
