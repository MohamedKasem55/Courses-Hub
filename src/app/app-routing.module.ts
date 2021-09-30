import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceptCoursesComponent } from './components/accept-courses/accept-courses.component';
import { CategoryadditionComponent } from './components/categoryaddition/categoryaddition.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { CoursesadditionComponent } from './components/coursesaddition/coursesaddition.component';
import { CourseslistComponent } from './components/courseslist/courseslist.component';
import { HomeComponent } from './components/home/home.component';
import { LecturesComponent } from './components/lectures/lectures.component';
import { LoginComponent } from './components/login/login.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';
import { RegisterComponent } from './components/register/register.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { AdminGuard } from './core/guards/admin.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { NotIsAdminGuard } from './core/guards/not-is-admin.guard';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"account/login",component:LoginComponent},
  {path:"account/register",component:RegisterComponent},
  {path:"courses/add",component:CoursesadditionComponent, canActivate: [AuthGuard, AdminGuard]},
  {path:"courses",component:CourseslistComponent,canActivate: [AuthGuard, AdminGuard]},
  {path:"my-courses",component:MyCoursesComponent,canActivate:[NotIsAdminGuard,AuthGuard]},
  {path:"courses/:id",component:CourseDetailsComponent},
  {path:"category",component:CategoryadditionComponent, canActivate: [AuthGuard, AdminGuard]},
  {path:"lectures/:id",component:LecturesComponent, canActivate: [AuthGuard, AdminGuard]},
  {path:"dashboard",component:CategoryadditionComponent, canActivate: [AuthGuard, AdminGuard]},
  {path:"students",component:StudentsListComponent, canActivate: [AuthGuard, AdminGuard]},
  {path:"manage-enrolls",component:AcceptCoursesComponent, canActivate: [AuthGuard, AdminGuard]},
  {path:"course/edit/:id",component:CoursesadditionComponent,canActivate: [AuthGuard, AdminGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
