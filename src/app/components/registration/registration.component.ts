import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface IRegister {
  email: string,
  password: string,
  dateOfBirth:Date,
  displayName:string,
  isAdmin:boolean,
  token:string,
  uid:string,
  isAccepted:boolean
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registrationForm: FormGroup;
  submitted = false;
  constructor(
    private fb: FormBuilder, private db:AngularFirestore
  ) { }

  ngOnInit(): void {
    this.registrationFormInit();
  }
  registrationFormInit() {
    this.registrationForm = this.fb.group(
      {
        email:  [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(6)]],
        displayName: [null, [Validators.required, Validators.minLength(6)]],
        dateOfBirth: [null, [Validators.required]],
        isAdmin:null,
        token:null,
        uid:null,
        isAccepted:null

      }
    )
  }
  get f() { return this.registrationForm.controls; };

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registrationForm.invalid) {
        return;
    }
    let form: IRegister = this.registrationForm.value;
    this.db.collection('users').add(form);
}

onReset() {
    this.submitted = false;
    this.registrationForm.reset();
}


}
