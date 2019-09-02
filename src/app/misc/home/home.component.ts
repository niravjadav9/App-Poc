import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userDetails: object = {};

  constructor(private _authService : AuthServiceService, private _router: Router) { }

  ngOnInit() {
   this._authService.getUserProfile().subscribe(
     res=>{
       this.userDetails = res['user']
     },
     err=>{
       console.log("error");
     }
   )
  }

}
