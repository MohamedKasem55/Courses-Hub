import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/interfaces/course';
import { CoursesService } from 'src/app/main-services/courses.service';

@Component({
  selector: 'app-coursesaddition',
  templateUrl: './coursesaddition.component.html',
  styleUrls: ['./coursesaddition.component.css']
})
export class CoursesadditionComponent implements OnInit {
courseForm:FormGroup;
previewedImg:any='';
allCategories
editable:string
editCourse;
imageNotChanged:boolean;

  constructor(private router:Router, private activatedRoute:ActivatedRoute, private coursesService:CoursesService , private db:AngularFirestore,private fb:FormBuilder) {
this.courseForm = this.fb.group({
  title: new FormControl(''),
  description:new FormControl(''),
  image:new FormControl(''),
  link:new FormControl(''),
  requirements:new FormControl(''),
  category:new FormControl(''),
  price:new FormControl(''),
  university:new FormControl(''),
})
this.allCategories=[];
this.editCourse={id:'',data:{}}
this.editable="Add New Course";
this.imageNotChanged=true;

}

  ngOnInit(): void {
    this.db.collection('categories').snapshotChanges().subscribe((res)=>{
      this.allCategories= res.map((e)=>{
        return{
          id:e.payload.doc.id,
          data:e.payload.doc.data(),
        }
      })
    })
    this.activatedRoute.paramMap.subscribe((parammap)=>{
      this.editCourse.id=parammap.get('id');

          if(this.editCourse.id!==null)
        {
          this.courseFormFill(); 
          this.editable="Edit Course";
          this.imageNotChanged=false;

        }
        else if (this.editCourse.id === null)
          {this.editCourse.id = ''}
          console.log(this.editCourse.id);

  });

  }
 
   async addCourse(){
     
    let data=this.courseForm.value;
    const selectedImg = (<HTMLInputElement>document.getElementById('img'))
    .files;

    if(selectedImg.length!=0)
    {      
    const img = await this.coursesService.uploadImg(selectedImg[0]);
    await img.ref.getDownloadURL().subscribe(async (url) => {
        data.image=url;
        console.log(data);
        console.log(this.editCourse.id);
        this.editOrAdd(data)  ;
        
    })
    
    }
    else if(this.editCourse.id!='')
      this.editOrAdd(data) 
     else{
      document.getElementById('reqimg').style.display='inline' ;
    }
this.reset();
this.router.navigate(['/courses/']);
  }
  editOrAdd(data){
    if(this.editCourse.id!='')
    this.db.collection('courses').doc(this.editCourse.id).set(data);
    else
    this.db.collection('courses').add(data);
  }

   preview(files) {
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.previewedImg =reader.result;
      };
      this.imageNotChanged=false;

  }

  reset(){
    this.courseForm.reset();
    this.previewedImg="";
    this.imageNotChanged=true;

  } 
  courseFormFill(){
    this.coursesService.getCourseById(this.editCourse.id).subscribe((res)=>{
      this.editCourse={
        id:res.payload.id,
        data:res.payload.data(),
      }
      this.formFill();
      console.log(this.editCourse);

    })
  }
formFill(){
  this.courseForm=this.fb.group({
    title: new FormControl(this.editCourse.data.title),
    description:new FormControl(this.editCourse.data.description),
    image:new FormControl(this.editCourse.data.image),
    link:new FormControl(this.editCourse.data.link),
    requirements:new FormControl(this.editCourse.data.requirements),
    category:new FormControl(this.editCourse.data.category),
    price:new FormControl(this.editCourse.data.price),
    university:new FormControl(this.editCourse.data.university),
  })
  this.previewedImg=this.editCourse.data.image;
}
}
