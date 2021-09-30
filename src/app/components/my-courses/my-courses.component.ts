import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IUser } from 'src/app/interfaces/user';
import { CoursesService } from 'src/app/main-services/courses.service';
import { AuthService } from './../../main-services/auth.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {

  allCourses
  enrolledCourses
  constructor(
    private _courses: CoursesService,
    private _auth: AuthService,
    private db :AngularFirestore
  ) { }

  ngOnInit(): void {
    this.getCourses()
    this.studentCourses()
    this.getEnrolledCourses()
  }
  getCourses(){
    this._courses.getAllCourses().subscribe((res) => 
      this.allCourses = res.map((el: any) => {
      return {
        id: el.payload.doc.id,
        ...el.payload.doc.data()
      }
    })
    
    )
  }

  getCourse(id){
    return this.allCourses.find(x => x.id == id)
   }

   studentCourses(){
    this._auth.currentUser$.subscribe((res: IUser) => this.enrolledCourses = res.enrolledCourses)
   }

   getEnrolledCourses(){
     let studentId= localStorage.getItem("uid");
     console.log(studentId);
     
     this.db.collection("users").doc(studentId).collection('enrolledCourses').snapshotChanges().subscribe((res)=>{
       console.log(res);
       
     })
     this.db.collection("users").doc(studentId).collection('pendingCourses').snapshotChanges().subscribe((res)=>{
       console.log(res);
       
     })
   }
}
