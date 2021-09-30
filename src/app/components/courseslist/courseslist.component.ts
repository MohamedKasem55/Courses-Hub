import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Course } from 'src/app/interfaces/course';
import { IUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/main-services/auth.service';
import { CoursesService } from 'src/app/main-services/courses.service';

@Component({
  selector: 'app-courseslist',
  templateUrl: './courseslist.component.html',
  styleUrls: ['./courseslist.component.css']
})
export class CourseslistComponent implements OnInit {
  selectedIds = [];
  coursesList;
  categories;
  @ViewChild('delete') deleteModal
  deleteId=""
  user$: Observable<IUser>;
  constructor(private coursesService: CoursesService, private db: AngularFirestore, private _auth: AuthService,
    private spinner: NgxSpinnerService,
    private _toastr: ToastrService,
    private afstorage :AngularFireStorage,
    private modalService : NgbModal
    ) {
    this.coursesList = [];

  }

  ngOnInit(): void {
    this.user$ =  this._auth.currentUser$
    this.getCategories()

    this.db.collection('courses').snapshotChanges().subscribe((res) => {

      this.coursesList = res.map((e) => {
        return {
          id: e.payload.doc.id,
          data: e.payload.doc.data(),
        }
      })
    })
  }


  editCourse() {

  }

  details(id) {
    if (this.selectedIds == [] || !this.selectedIds.includes(id)) {
      document.getElementById(id).style.display = "flex";

      this.selectedIds.push(id);
    }
    else if (this.selectedIds.includes(id)) {
      document.getElementById(id).style.display = "none";
      let index = this.selectedIds.indexOf(id);
      this.selectedIds.splice(index, 1);

    }


  }
  deleteDisplay(id){
this.deleteId=id;
this.modalService.open(this.deleteModal,{ centered: true, size: 'lg' })

  }
  deleteCourse() {

    this.db.collection('courses').doc(this.deleteId).delete();
    this.deleteId=""
  }
  noDeleteCourse(){
    this.deleteId=""
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
    this.coursesList.forEach((course)=>{
      if(course.id==courseId)
        c=course
    })      
    let cat 
    this.categories.forEach((category)=>{
      if(category.id==c.data.category)
        cat=category.data.categoryName
    })
    return cat;    
    
  }
}
