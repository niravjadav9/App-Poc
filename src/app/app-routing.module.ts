import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { HomeComponent } from './misc/home/home.component';
import { GuardGuard } from './auth/guard.guard';
import { PostComponent } from './misc/post/post.component';
import { ListpostComponent } from './misc/listpost/listpost.component';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"signup", component:SignUpComponent},
  {path:"home", component:HomeComponent, canActivate:[GuardGuard]},
  {path:"post", component:PostComponent, canActivate:[GuardGuard]},
  {path:"listpost", component:ListpostComponent, canActivate:[GuardGuard]},
  {path:"", redirectTo:"home", pathMatch:"full"},
  {path:"**",  redirectTo:"home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
