import { Component, OnInit } from '@angular/core';
import { StudentsService } from './../../main-services/students.service';
import { Observable } from 'rxjs';
import { IUser } from './../../interfaces/user';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  constructor(
    private _ss: StudentsService
  ) { }

  student$ :Observable<IUser[]>
  ngOnInit(): void {
    this.student$ = this._ss.getSutdents()
  }

}
