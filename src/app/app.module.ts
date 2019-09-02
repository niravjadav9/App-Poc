import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { HomeComponent } from './misc/home/home.component';
import { NavbarComponent } from './misc/navbar/navbar.component';
import { PostComponent } from './misc/post/post.component';
import { ListpostComponent } from './misc/listpost/listpost.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthServiceService } from './auth/auth-service.service';
import { GuardGuard } from './auth/guard.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    NavbarComponent,
    PostComponent,
    ListpostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthServiceService,GuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
