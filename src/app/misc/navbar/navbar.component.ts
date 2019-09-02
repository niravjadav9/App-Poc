import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userStatus: boolean = false;

  constructor(private _authService: AuthServiceService, private _router: Router) { }

  ngOnInit() {
    this._authService.$auth.subscribe((data: any) => {
      console.log(data);
      this.userStatus = JSON.parse(data);
    })
  }

  logOut() {
    this._authService.logOut();
  }

}
