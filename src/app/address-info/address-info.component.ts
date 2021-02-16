import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-address-info',
  templateUrl: './address-info.component.html',
  styleUrls: ['./address-info.component.css']
})
export class AddressInfoComponent implements OnInit {
  @Input() addressInfoform: FormGroup;
  @Input() isSubmitted: boolean;
  constructor() { }

  ngOnInit(): void {
  }
}
