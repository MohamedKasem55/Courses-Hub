import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/main-services/courses.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/main-services/auth.service';
import { IUser } from 'src/app/interfaces/user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { StudentsService } from './../../main-services/students.service';
import { finalize } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _coursesService: CoursesService,
    private _toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private _auth: AuthService,
    private _router: Router,
    private _student: StudentsService,
    private db:AngularFirestore
  ) {
   }
   keyWordsSearch;
  courses=[]
  currentUser: IUser;
  students=[]
  categories=[]
  ngOnInit(): void {
    this._auth.currentUser$.subscribe(res => this.currentUser = res)
    this.getCourses()
    this.getCategories();

    this.db.collection('users').snapshotChanges().subscribe(
      (res)=>{
        this.students=res.map((e)=>{
          return {
            id:e.payload.doc.id,
            data:e.payload.doc.data()
          }
        })
      }
      )

  }

  checkAdmin(){
    if(this.currentUser && this.currentUser.isAdmin) return true;

    return false
  }
  getCourses(){
    this.spinner.show();
    this._coursesService.getAllCourses().pipe(finalize(()=> this.spinner.hide())).subscribe(res => {
      if (res) { this.spinner.hide(); }
      this.courses = res.map((e: any) => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        }
      });
    },
      err => {

      }
    )
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
getCategories(){
  
  this.db.collection('categories').snapshotChanges().subscribe(
    (res)=>{
      this.categories=res.map((e)=>{
        return {
          id:e.payload.doc.id,
          data:e.payload.doc.data()
        }
      })
    }
    )
}
getCatByCourseId(courseId){
  let c 
  this.courses.forEach((course)=>{
    if(course.id==courseId)
      c=course
  })  
  let cat 
  this.categories.forEach((category)=>{
    if(category.id==c.category)
      cat=category.data.categoryName
  })
  return cat
  
}
}
