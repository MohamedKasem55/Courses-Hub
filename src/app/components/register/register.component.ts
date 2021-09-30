import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IRegister } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/main-services/auth.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  constructor(
    private _formBuilder: FormBuilder,
    private _auth: AuthService,
    private _toastr: ToastrService
  ) { }


  ngOnInit(): void {
    this.registerFormInit();
  }
  registerFormInit() {
    this.registerForm = this._formBuilder.group(
      {
        email:  [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(6)]],
        displayName: [null, [Validators.required, Validators.minLength(6)]]
        
      }
    )
  }
  get f() { return this.registerForm.controls; };

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    let form: IRegister= this.registerForm.value;

      this._auth.register(form).then((res)=> {
        this.submitted = false
      }).catch(err => {
        this.submitted = false;
        this._toastr.error(err.code, err.message)
      })

}
validEmail(){
  let email =this.registerForm.controls['email']
  if( (email.touched) && (!email.dirty))
    {return true;}
  else if( (email.dirty) && ( email.errors.required)  ) 
    {return true;}
  else 
  {return false;}
}
onReset() {
    this.submitted = false;
    this.registerForm.reset();
}

}
