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
  public displayedColumns : string[] = ['$id', 'name', 'email', 'mobile', 'dob', 'gender']
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
    this.tableDataSource = this.studentsMasterList.map(obj => {obj.dob = this.calculateDate(obj.dob)});
  }
  calculateDate(date) {
    return moment(date).format('DD/MM/YYYY');
  } 
}
