import { Component, OnInit } from '@angular/core';
import { AuthService } from './main-services/auth.service';
import { IUser } from './interfaces/user';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CoursesHub';
  constructor(
    private _auth: AuthService,

  ) {

  }
  ngOnInit(): void {
    this._auth.getCurrentUser()
  }

}
