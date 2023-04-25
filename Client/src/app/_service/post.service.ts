import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagingModel } from '../models/paging-model';
import { Observable } from 'rxjs';
import { PostResponeModel } from '../models/post-respone-model';
import { API_URL } from 'src/assets/API_URL';
import { PostRequest } from '../models/post-request';
import { PostModel } from '../models/post-model';
import { SearchModel } from '../models/search-model';
import { PositonPostModel } from '../models/positonPost-model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {}

  getPostCount():Observable<number> {
    return this.http.get<number>(API_URL.GET_POST_COUNT(),{withCredentials: true})
  }

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
    console.log(65564756756);

    return this.http.get<PostModel>(API_URL.GET_POST_BY_ID(id));
  }

  getSearchedPost(pagingModel: PagingModel, searchModel: SearchModel):Observable<PostResponeModel>{
    return this.http.post<PostResponeModel>(API_URL.GET_SEARCHED_POSTS(pagingModel),searchModel);
  }

  hideUnhidePost(id:number):Observable<any>{
    return this.http.put<any>(API_URL.HIDE_UNHIDE(id),{});
  }

  checkIsUserAvailableToPost(userId: number):Observable<boolean>{
    return this.http.get<boolean>(API_URL.CHECK_IS_USER_AVAILABLE_TO_POST(userId));
  }

  getInforPositionPosts(postId: number): Observable<PositonPostModel[]>{
    return this.http.get<PositonPostModel[]>(API_URL.GET_INFOR_POSITION_POST(postId));
  }

}
