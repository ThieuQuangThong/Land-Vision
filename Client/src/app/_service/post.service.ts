import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagingModel } from '../models/paging-model';
import { Observable } from 'rxjs';
import { PostResponeModel } from '../models/post-respone-model';
import { API_URL } from 'src/assets/API_URL';
import { PostRequest } from '../models/post-request';
import { PostModel } from '../models/post-model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {}

  getAllPost(pagingModel: PagingModel):Observable<PostResponeModel> {
    return this.http.get<PostResponeModel>(API_URL.GET_ALL_POST(pagingModel),{withCredentials: true})
  }
  getAllPostByTime(pagingModel: PagingModel, startDate : string,endDate : string):Observable<PostResponeModel> {
    return this.http.get<PostResponeModel>(API_URL.GET_ALL_POST_BY_TIME(pagingModel,startDate.replaceAll(' ','-'),endDate.replaceAll(' ','-')),{withCredentials: true})
  }
  addPost(postRequest: PostRequest, userId: number):Observable<any>{
    return this.http.post<any>(API_URL.ADD_POST(userId),postRequest);
  }

  getPostById(id: number):Observable<PostModel>{
    return this.http.get<PostModel>(API_URL.GET_POST_BY_ID(id));
  }
}
