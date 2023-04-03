import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagingModel } from '../models/paging-model';
import { Observable } from 'rxjs';
import { PostResponeModel } from '../models/post-respone-model';
import { API_URL } from 'src/assets/API_URL';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {}

  getAllPost(pagingModel: PagingModel):Observable<PostResponeModel> {
    return this.http.get<PostResponeModel>(API_URL.GET_ALL_POST(pagingModel))
  }
}
