import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Course } from '../interfaces/course';
@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor( private afStorage:AngularFireStorage,private db :AngularFirestore) { }

  /* form=new FormGroup({
  title:new FormControl('',[Validators.required,Validators.minLength(7)]),
  description:new FormControl(''),
  image:new FormControl(''),
  link:new FormControl(''),
  requirements:new FormControl(''),
  }) */
  courseForm:Course
  async uploadImg(img) {
    let n = Date.now();
    let imgNameArr = img.name.split('.');
    let imgName = '';
    for (let i = 0; i <= imgNameArr.length; i++) {
      if (i == imgNameArr.length - 1) break;
      else imgName += imgNameArr[i];
    }
    const filePath =
      'coursesImages/' +
      imgName +
      '_' +
      (Math.random() * 1024 * 1024).toString(36).substring(2); //+ '-' + n;
    const fileRef = this.afStorage.ref(filePath);
    const task = await this.afStorage.upload(filePath, img);
    return {
      ref: fileRef,
      task: task,
    };
  }
  async uploadVid(vid) {
    let n = Date.now();
    let vidNameArr = vid.name.split('.');
    let vidName = '';
    for (let i = 0; i <= vidNameArr.length; i++) {
      if (i == vidNameArr.length - 1) break;
      else vidName += vidNameArr[i];
    }
    const filePath =
      'lecturesvideos/' +
      vidName +
      '_' +
      (Math.random() * 1024 * 1024).toString(36).substring(2); //+ '-' + n;
    const fileRef = this.afStorage.ref(filePath);
    const task = await this.afStorage.upload(filePath, vid);
    return {
      ref: fileRef,
      task: task,
    };
  }

  getAllCourses(){
    return this.db.collection('courses').snapshotChanges();
  }
  getCourseById(id){
    return this.db.collection('courses').doc(id).snapshotChanges();
  }
}
