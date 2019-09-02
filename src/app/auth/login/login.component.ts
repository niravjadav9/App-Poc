import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { NgForm, FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any;

  userForm: FormGroup;

  constructor(private _authService: AuthServiceService, private _fb: FormBuilder, private _router: Router) { }

  model = {
    email: '',
    password: ''
  };

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;

  ngOnInit() {
    if(this._authService.checkLogin())
    this._router.navigateByUrl('/home');
  }

  onSubmit(form: NgForm) {
    this._authService.login(form.value).subscribe(
      (res) => {
        this._authService.setToken(res['token']);
        this._authService.$auth.next(this._authService.checkLogin());
        this._router.navigateByUrl('/home');
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }


}