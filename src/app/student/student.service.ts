import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor() { }
  saveData(user) {
    localStorage.setItem("userDetail", user);
  } 
  getData() {
    const user = localStorage.getItem("userDetail");
    return {user: user };
  }
}
