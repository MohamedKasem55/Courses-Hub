import { Component, OnInit } from '@angular/core';
import { CoursesService } from './../../main-services/courses.service';
import { map, take } from 'rxjs/operators';
import { IUser } from './../../interfaces/user';
import { Course } from 'src/app/interfaces/course';
import { StudentsService } from './../../main-services/students.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-accept-courses',
  templateUrl: './accept-courses.component.html',
  styleUrls: ['./accept-courses.component.css']
})
export class AcceptCoursesComponent implements OnInit {

  constructor(
    private _courses: CoursesService,
    private _students: StudentsService
  ) { }


  pendingCourses
  courses
  ngOnInit(): void {
    this.getPendingCourses()
    this.getCourses()
  }

  getPendingCourses(){
    this._courses.getPendingCourses()
      .subscribe(res => {
        this.pendingCourses = res.map((e: any) => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          }
        }).filter(x => x.isAdmin == false && x.pendingCourses.length > 0)
        .map(el => {
          return {
            userId: el.id,
            email: el.email,
            pendingCourses: el.pendingCourses
          }
        })
      })
  }


  getCourses(){
    this._courses.getAllCourses().subscribe(res => this.courses = res.map((el: any) => {
      return {
        id: el.payload.doc.id,
        ...el.payload.doc.data()
      }
    }))
  }
  getCourse(id){
   return this.courses.find(x => x.id == id)
  }

  acceptCourse(userId, courseId){
    this._students.acceptCourse(userId, courseId)
  }
  rejectCourse(userId, courseId){
    this._students.rejectCourse(userId, courseId)
  }

}
