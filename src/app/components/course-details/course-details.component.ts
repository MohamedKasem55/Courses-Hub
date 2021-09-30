import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { CoursesService } from './../../main-services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Course, IRate } from 'src/app/interfaces/course';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/main-services/auth.service';
import { IUser } from 'src/app/interfaces/user';
import { StudentsService } from 'src/app/main-services/students.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {


  course$
  currentUser: IUser
  id
  lectures
  currentRate = 0;

  currentUserRate: IRate;
  globalRate = 0;

  constructor(
    private _courses: CoursesService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _auth: AuthService,
    private _student: StudentsService,
    private db:AngularFirestore
  ) {
    this.id = this._route.snapshot.params['id']
    this.getCurrentUser()
    this.course$ = this._courses.getCourseByIdDirect(this.id)
   }



  ngOnInit(): void {
    this._courses.getGlobalRate(this.id).subscribe(
      (res: IRate[]) => {
        let total = 0;
        res.forEach(el => total += el.rate)
        this.globalRate = total / res.length ;
      }
    )

    this.getLec()
/*     this.isEnrolled()
 */  }
  getCurrentUser(){
    this._auth.currentUser$.subscribe(user => {
      this.currentUser = user
      this.checkRate();
    } )
  }
  enroll(id: string) {
    if (!this.currentUser) {
      this._router.navigateByUrl("/account/login")
    }

    this._student.enrollCourse(id)
  }

  checkPendingCourse(id) {
    if (this.currentUser.pendingCourses) {
      if (this.currentUser.pendingCourses.includes(id)) return true;

      return false
    }
  }

  checkEnrolledCourse(id) {
    if (this.currentUser.enrolledCourses) {
      if (this.currentUser.enrolledCourses.includes(id)) return true;

      return false
    }
  }

  getLec(){
    if(this.id){
      this._courses.getCourseLecByIdDirect(this.id).subscribe(res => this.lectures = res)
    }
  }

  checkAdmin(){
    if(this.currentUser && this.currentUser.isAdmin) return true;

    return false
  }
 isEnrolled(){
   if(this.currentUser){
  let courseId=this._route.snapshot.params['id'];
  let enrolledCourses= this.currentUser.enrolledCourses
      if(enrolledCourses.includes(courseId))
        return true;
      else
        return false;
   }
   else
    return false;
    
}

rate(r){
  this._courses.rateCourse(this.currentUser.uid, this.id, r)
  this.checkRate()
}

updateLocalRate(e){
  this.currentRate = e
}
checkRate(){
  if(this.currentUser && this.currentUser.uid){
    this._courses.checkRate(this.currentUser.uid, this.id).subscribe((res: IRate) => this.currentUserRate = res)
  }
}
}
