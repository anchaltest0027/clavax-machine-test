import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { StudentListComponent } from './student-list/student-list.component';

const routes: Routes = [
  {
    path: "",
    component: StudentListComponent,
    pathMatch:"full"
  },
   {
    path: "list",
    component: StudentListComponent,
  },
  {
    path: "add/:id",
    component: StudentComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
