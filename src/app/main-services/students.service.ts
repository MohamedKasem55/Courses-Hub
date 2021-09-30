import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { IUser } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  currentUser: IUser;
  constructor(
    private db :AngularFirestore,
    private _account: AuthService,
  ) {
    this._account.currentUser$.subscribe(res => this.currentUser = res)
   }

  getSutdents(){
    return this.db.collection('users').valueChanges().pipe(
      map((users: IUser[]) => (
          users.filter((x: IUser) => x.isAdmin == false)
      ))
    )}

    enrollCourse(courseId: string){
      this.currentUser.pendingCourses.push(courseId)
      this.db.collection('users').doc(this.currentUser.uid).update(this.currentUser)
      this._account.currentUserSource.next(this.currentUser)
    }
    acceptCourse(userId: string, courseId: string){
      this.db.collection('users').doc(userId).valueChanges().pipe(take(1)).subscribe((res: IUser) => {

        res.enrolledCourses.push(courseId)
        let index = res.pendingCourses.findIndex(x => x == courseId)
        res.pendingCourses.splice(index, 1)
        this.db.collection('users').doc(userId).update(res)
      })
    }

    rejectCourse(userId: string, courseId: string){
        this.db.collection('users').doc(userId).valueChanges().pipe(take(1)).subscribe((res: IUser) => {
        let index = res.pendingCourses.findIndex(x => x == courseId)
        res.pendingCourses.splice(index, 1)
        this.db.collection('users').doc(userId).update(res)
      })
    }
}
