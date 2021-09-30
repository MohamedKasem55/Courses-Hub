import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequestCount = 0
  constructor(
    private _spinner : NgxSpinnerService
  ) { }

  busy(){
    this.busyRequestCount++;
    this._spinner.show(undefined,
     {
       type: 'timer',
       color: '#333333',
       bdColor: 'rgba(255,255,255,0.7)'
     }
      )
  }

  idle(){
    this.busyRequestCount--;
    if(this.busyRequestCount <= 0){
      this.busyRequestCount = 0
      this._spinner.hide()
    }
  }
}
