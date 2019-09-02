import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(private _http: HttpClient, private _router: Router) { }


    create(data) {
        return this._http.post(environment.apiBaseUrl + '/createPost', data);
    }

    listPost() {
        return this._http.get(environment.apiBaseUrl + '/listPost');
    }

    deletePost(_id: String) {
        return this._http.delete(environment.apiBaseUrl + '/delete' + `/${_id}`);
    }

    postComment(_id, comment) {
        const blogData = {
            id: _id,
            comment: comment
        }
        return this._http.post(environment.apiBaseUrl + '/comment', blogData);
    }

}