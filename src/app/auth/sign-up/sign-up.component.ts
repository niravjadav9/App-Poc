import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user: object = {};

  userForm: FormGroup;

  constructor(private _authService: AuthServiceService, private _fb: FormBuilder, private _http: HttpClient, private _router: Router) { }

  ngOnInit() {
    this.userForm = this._fb.group({
      email: ["", [Validators.required, Validators.minLength(5)]],
      password: ["", [Validators.required, Validators.minLength(5)]],
      firstname: ["", [Validators.required, Validators.minLength(2)]],
      phone: ["", [Validators.required, Validators.minLength(10)]],
      gender: ["", Validators.required],
    });
  }

  signUp() {
    this._authService.signUp(this.userForm.value).subscribe((data) => {
      console.log(data);
      this._router.navigate(['login'])
    });
  }

}
