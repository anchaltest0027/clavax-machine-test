import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {
  @Input() basicInfoform: FormGroup;
  @Input() isSubmitted: boolean;
  showOtherFiled: boolean = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  genderChange(gender) {
    console.log(">>>>gender", gender)
    if (gender == "other") {
      this.showOtherFiled = true;
    }
    else {
      this.showOtherFiled = false;
    }
  }
  redirect() {
    this.router.navigate(["list"]);
  }
}
