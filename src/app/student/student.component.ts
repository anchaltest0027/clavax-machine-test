import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from './student.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  studentEnrollForm: FormGroup
  isSubmitted: boolean = false;
  localstorageData: any;
  id: any;
  constructor(private fb: FormBuilder, private toastr: ToastrService, private studentService: StudentService, private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      this.id = params["id"];
    })
    const nameregex = /^[a-zA-Z ]*$/;
    const digitonlyregex = /^[0-9]*$/;
    const emailregex = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
    //const dobregex = "^[0-9/]*$";
    this.studentEnrollForm = this.fb.group({
      student_name: ["", [Validators.required, Validators.maxLength(56), Validators.pattern(nameregex)]],
      email: ["", [Validators.required, Validators.maxLength(112), Validators.pattern(emailregex)]],
      mobile: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(digitonlyregex)]],
      dob: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      gender: ["", [Validators.required]],
      other: [""],
      address: ["", [Validators.required, Validators.maxLength(256)]],
      additional: ["", [Validators.maxLength(256)]],
      pincode: ["", [Validators.required, Validators.maxLength(6), Validators.minLength(6)]],
      city: ["", [Validators.required,Validators.maxLength(56)]],
      state: ["", [Validators.required,Validators.maxLength(56)]],
    })
    if (this.id != 0) {
      var data = this.studentService.getData();
      var localData;
      if (data.user) {
        localData = JSON.parse(data.user);
        this.studentEnrollForm.patchValue(localData[this.id - 1]);
      }
      //else {
      //  this.data = [];
      //}
    }
  }
  submit() {
    this.isSubmitted = true;
   
    if (this.studentEnrollForm.valid) {
      if (this.studentEnrollForm.value.gender == "other") {
        if (this.studentEnrollForm.value.other == "") {
          this.toastr.error("Other gender is Required");
          return;
        }
        if (this.studentEnrollForm.value.other.toString().length>12) {
          this.toastr.error("Other gender length should be less than 12");
          return;
        }
        if (!(/^[a-zA-Z ]*$/.test(this.studentEnrollForm.value.other))) {
          this.toastr.error("only alphabates and spaces required in other gender ");
          return;
        }
      }
      let localStorageData = this.studentService.getData();
      if (localStorageData.user) {
        this.localstorageData = JSON.parse(localStorageData.user);
      }
      else {
        this.localstorageData = [];
      }
      this.localstorageData[this.localstorageData.length] = this.studentEnrollForm.value
      const data = JSON.stringify(this.localstorageData);
      this.studentService.saveData(data)
      console.log(this.studentEnrollForm.value);
      this.router.navigate(["list"]);
    }
    else {
      this.toastr.error("Please fill all mandatory fields");
     
    }
  }
  cancel() {
    this.router.navigate(["list"]);
  }
}
