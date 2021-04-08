import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  public uuid = 0; 

  constructor(private _http: HttpClient) { }
  studentForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', [Validators.required, Validators.maxLength(56), Validators.pattern('^[a-zA-Z ]*$')]),
    email: new FormControl('', [Validators.required, Validators.maxLength(112) , Validators.email]),
    mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    dob: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    gender: new FormControl('', [Validators.required, Validators.maxLength(12), Validators.pattern('^[a-zA-Z ]*$')])
  });

  public initializeFormGroup() {
    this.studentForm.setValue({
      id: null,
      name: '',
      email: '',
      mobile: '',
      dob: '',
      gender: ''
    })
  };

  public onFormSubmit(data) {
    this.uuid++;
    const dataObject = {...data, id: this.uuid}
   return this._http.post("http://localhost:3000/students", dataObject);  
  }
  public getAllUser() {
    return this._http.get("http://localhost:3000/students");
  }
}