import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Course, IRate } from '../interfaces/course';
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
      '/lecturesvideos/' +
      vidName +
      '_' +
      (Math.random() * 1024 * 1024).toString(36).substring(2); //+ '-' + n;
    const fileRef = this.afStorage.ref(filePath);
    console.log('before upload');

    const task = await this.afStorage.upload(filePath, vid);
    console.log("after upload");

    return {
      ref: fileRef,
      task: task,
    };
  }

  getAllCourses(){
    return this.db.collection('courses').snapshotChanges();
  }
  getAllCoursesDirect(){
    return this.db.collection('courses').valueChanges();
  }
  getCourseById(id){
    return this.db.collection('courses').doc(id).snapshotChanges();
  }

  getCourseByIdDirect(id){
    return this.db.collection('courses').doc(id).valueChanges();
  }

  getPendingCourses(){
    return this.db.collection("users").snapshotChanges()
  }

  getCourseLecByIdDirect(id){
    return this.db.collection('courses').doc(id).collection("lectures").valueChanges();
  }

  rateCourse(userId, courseId, rate: number){
    let userRate = {user: userId, rate: rate}
    return this.db.collection('courses').doc(courseId).collection("rates").doc(userId).set(userRate)
  }
  checkRate(userId, courseId){
    return this.db.collection('courses').doc(courseId).collection("rates").doc(userId).valueChanges()

  }

  getGlobalRate(courseId){
    return this.db.collection('courses').doc(courseId).collection("rates").valueChanges()
  }

}
