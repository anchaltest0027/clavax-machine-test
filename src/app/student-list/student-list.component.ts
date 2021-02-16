import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../student/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  data: any;
  constructor(private router: Router, private studentService: StudentService) { }

  ngOnInit(): void {
    this.getData();
  }
  redirect() {
    this.router.navigate(["add/0"]);
  }
  getData() {
    var data = this.studentService.getData();
    if (data.user) {
      this.data = JSON.parse(data.user);
    }
    else {
      this.data = [];
    }
    console.log(">>>data hahaha", this.data);
  }
  edit(id) {
    this.router.navigate([`add/${id}`])
  }
   
}
