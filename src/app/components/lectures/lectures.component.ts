import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/main-services/courses.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-lectures',
  templateUrl: './lectures.component.html',
  styleUrls: ['./lectures.component.css']
})
export class LecturesComponent implements OnInit {
  courseId:string;
  course;
  videoUploaded:boolean
  lecture;
  lectureForm:FormGroup;
  editable:string;
   previewedVid:any='';
   courseLectures=[];
    detailsLecturesSelectedIds=[];
    selectedEditLecture;
  constructor(private spinner :NgxSpinnerService,private activatedRoute:ActivatedRoute,private courseService:CoursesService,private fb :FormBuilder,private db:AngularFirestore) {
    this.lectureForm= this.fb.group({
      lectureName:new FormControl('',Validators.required),
      objectives:new FormControl(''),
      outcome:new FormControl(''),
      video:new FormControl(''),

    })
    this.reset()
    this.course={id:'',data:''}
   }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((parammap)=>{
      this.courseId= parammap.get('id');
       this.courseService.getCourseById(this.courseId).subscribe((res)=>{
        this.course={
          id:res.payload.id,
          data:res.payload.data(),
        }
      })
    })
///////////////////////////////////////////////////////
    this.db.collection('courses').doc(this.courseId).collection('lectures').snapshotChanges().subscribe((res)=>{
      this.courseLectures=res.map((e)=>{
        return{
          id:e.payload.doc.id,
          data:e.payload.doc.data()
        }
      })

    })


    this.db.collection('courses').doc(this.courseId).collection('lectures').snapshotChanges().subscribe((res)=>{
      if(this.courseLectures.length!=res.length)
      {
        document.getElementById('spinner').style.display="none";

      }


    })

  }

 async addForm(){
   this.spinner.show()
    let newLecture=this.lectureForm.value;
    const selectedVid = (<HTMLInputElement>document.getElementById('vid'))
      .files;
    let x = this.selectedEditLecture.id
      
      if(selectedVid.length!=0)
      {
        
    const vid = await this.courseService.uploadVid(selectedVid[0]);
    await vid.ref.getDownloadURL().subscribe(async (url) => {
      newLecture.video=url      
      this.editOrAdd(newLecture,x)
     })
    }
    else{
      this.editOrAdd(newLecture,x)
    }
    this.reset();
  }
  editOrAdd(data,x){
    if(x!='')
    this.db.collection('courses').doc(this.courseId).collection('lectures').doc(x).set(data);
    else
    this.db.collection('courses').doc(this.courseId).collection('lectures').add(data);
  this.spinner.hide()

  }
  reset(){
    this.lectureForm.reset();
    this.editable='Add Lecture';
    this.selectedEditLecture={id:'',data:{}};
    this.videoUploaded=false;
    this.previewedVid=""
  }
   preview(files) {
    var reader = new FileReader();
    reader.onload = (_event) => {
    }
    this.videoUploaded=true;
  }
  details(id){
    if(this.detailsLecturesSelectedIds==[]|| !this.detailsLecturesSelectedIds.includes(id))
   {
    document.getElementById(id).style.display="flex";
    this.detailsLecturesSelectedIds.push(id);
  }
  else if ( this.detailsLecturesSelectedIds.includes(id))
  {
    document.getElementById(id).style.display="none";
    let index=this.detailsLecturesSelectedIds.indexOf(id);
    this.detailsLecturesSelectedIds.splice(index,1);

   }
}
  editLecture(id){
    this.selectedEditLecture.id=id;
    console.log(this.selectedEditLecture.id);
    
    this.editable ="Update Lecture";
     this.selectedEditLecture=this.courseLectures.find((ele)=>ele.id==id);    
    this.formFill();
    this.videoUploaded=true;
  }
  deleteLecture(id){
      if(confirm("Are you sure to delete ")) {
    this.db.collection('courses').doc(this.courseId).collection('lectures').doc(id).delete();
  }
    this.reset();
  }
  formFill(){
    this.lectureForm=this.fb.group({
      lectureName:new FormControl(this.selectedEditLecture.data.lectureName),
      objectives:new FormControl(this.selectedEditLecture.data.objectives),
      outcome:new FormControl(this.selectedEditLecture.data.outcome),
      video:new FormControl(this.selectedEditLecture.data.video),
    })
    this.previewedVid=this.selectedEditLecture.data.video;
  }
}
