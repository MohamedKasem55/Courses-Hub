import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, ReplaySubject } from 'rxjs';
import { IRegister, IUser } from '../interfaces/user';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _af: AngularFireAuth, private _db: AngularFirestore, private _router: Router) { }
  currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();

  login(email: string, password: string) {
    return this._af.signInWithEmailAndPassword(email, password)
      .then(async res => {
        let userToken = (await this._af.currentUser).getIdToken();
        //console.log('logged', res);

        let user: IUser = {
          uid: res.user.uid,
          token: (await userToken).toString(),
          email: res.user.email,
          displayName: res.user.displayName ? res.user.displayName : res.user.email,
        }
        this._db.collection('users').doc(user.uid).update(user)
        localStorage.setItem('token', user.token)
        localStorage.setItem('uid', user.uid)

        this.getCurrentUser()
        this._router.navigateByUrl('/')
        // console.log(res)
        return res
      })

      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  SignOut() {
    this._af
      .signOut();
    localStorage.clear();
    this.getCurrentUser()
    this._router.navigateByUrl("/")
  }

  isAuthenticated() {
    let isAuth = false
    this.currentUser$.pipe(
      map(res => {
       this.checkToken(res.uid).subscribe(auth =>{
         isAuth = auth
       })
      })

    )
    return isAuth
  }

  checkToken(uid){
    return this._db.doc("users/" + uid).valueChanges().pipe(map((us: IUser) => {
      if(us.token == localStorage.getItem('token')) return true;

      return false;
    })
    )}

    getCurrentUser(){
      const uid = localStorage.getItem('uid')
      if(uid) {
        return  this._db.collection('users').doc(uid).valueChanges().subscribe((res:IUser) => {
          if(res){ this.currentUserSource.next(res);}
        })
      }else {
        this.currentUserSource.next(null)}

    }

    register(sentUser: IRegister){
      return this._af.createUserWithEmailAndPassword(sentUser.email,sentUser.password)
      .then(async res => {
        let userToken = (await this._af.currentUser).getIdToken();
        let user: IUser = {
          uid: res.user.uid,
          token: (await userToken).toString(),
          email: res.user.email,
          displayName: sentUser.displayName ? sentUser.displayName : res.user.email,
          isAdmin: false,
          pendingCourses: [],
          enrolledCourses: []
                }
        if(user){
          this._db.collection('users').doc(user.uid).set(user).then(()=>{
            localStorage.setItem('token', user.token)
            localStorage.setItem('uid', user.uid)
            this.getCurrentUser()
            this._router.navigateByUrl('/')
          })
          return res
        } else {
          return null
        }

    })}
}
