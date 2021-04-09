import { Component, OnInit } from '@angular/core';
import { StudentsService } from 'src/app/shared/students.service';
import * as moment from 'moment';
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
        console.log(response);
      });
      this.getLatestUser();
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
  public updateStudentData($event) {
    this.isEdit = true;
    setTimeout(() => {
      this.studentData = this.selectedRow;
    }, 200);
  }
  public onUpdate(data) {
    this.isEdit = !this.isEdit
    this.studentservice.updateStudent(data).subscribe(() => {
      this.getLatestUser();
    })
  }
  deleteStudent() {
    setTimeout(() => {
      this.studentservice.deleteStudents(this.selectedRow).subscribe(() => {
        this.getLatestUser();
      })
    }, 1000)
  }
}
