import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-listpost',
  templateUrl: './listpost.component.html',
  styleUrls: ['./listpost.component.css']
})
export class ListpostComponent implements OnInit {


  comments: string;

  pageTittle: string = "products";

  blogPost: any;

  newComment = [];

  Post: any = JSON.parse(localStorage.getItem("Post"));

  constructor(private _postService: PostService) { }

  ngOnInit() {

    this._postService.listPost().subscribe((data: any) => {
      this.blogPost = data.post;
      console.log(this.blogPost);

    });

  }

  onDelete(_id: string) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this._postService.deletePost(_id).subscribe((res) => {
        this._postService.listPost().subscribe((data: any) => {
          this.blogPost = data.post;
          console.log(this.blogPost);
        });
      });
    }
  };

  draftComment(_id: string) {
    this.newComment = [];
    this.newComment.push(_id);
  }

  postComment(_id: string, comments) {
    if (confirm('Are you want to post the comment ?') == true) {
      this._postService.postComment(_id, this.comments).subscribe((res) => {
        this._postService.listPost().subscribe((data: any) => {
          this.blogPost = data.post;
          console.log(this.blogPost);
        });
      });
    }
  };

}
