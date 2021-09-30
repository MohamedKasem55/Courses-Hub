import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ILogin } from 'src/app/interfaces/user';
import { AuthService } from './../../main-services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  constructor(
    private _formBuilder: FormBuilder,
    private _auth: AuthService,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loginFormInit();
  }
  loginFormInit() {
    this.loginForm = this._formBuilder.group(
      {
        email:  [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(6)]]
      }
    )
  }
  get f() { return this.loginForm.controls; };

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    let form: ILogin = this.loginForm.value;

    this._auth.login(form.email, form.password).then(()=> this.submitted = false ).catch(err => {
      this.submitted = false;
      this._toastr.error(err.code, err.message)
    })
}

onReset() {
    this.submitted = false;
    this.loginForm.reset();
}


}
