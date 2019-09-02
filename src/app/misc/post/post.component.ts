import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers:[PostService]
})
export class PostComponent implements OnInit {

  post : object = {};

  userForm : FormGroup;

  constructor(private _postService: PostService, private _fb: FormBuilder, private _router: Router) { }

  ngOnInit() {
    this.userForm = this._fb.group({
      title : ["", Validators.required],
      description : ["", Validators.required],
  });
  }

  create(){
    this._postService.create(this.post).subscribe( (data) => {
      console.log(data);
      this._router.navigate(['listpost']);
    });
  }

}
