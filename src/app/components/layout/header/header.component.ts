import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/interfaces/user';
import { AuthService } from './../../../main-services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user$ : Observable<IUser>;

  constructor(
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
   this.user$ = this._auth.currentUser$
    // .subscribe(
    //   res => {
    //     if(res){
    //       this.user = res
    //       console.log(res)
    //     }
    //   }
    // )
  }

  logout(){
    this._auth.SignOut();
  }

}
