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
import { MoneyTranformPipe } from '../_pipes/money-tranform.pipe';
import { RejectModel } from '../models/reject-model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private moneyTranformPipe: MoneyTranformPipe, private http: HttpClient) {}

  getPostCount():Observable<number> {
    return this.http.get<number>(API_URL.GET_POST_COUNT(),{withCredentials: true})
  }

  getAllApprovePost(pagingModel: PagingModel):Observable<PostResponeModel> {
    return this.http.get<PostResponeModel>(API_URL.GET_ALL_APPROVED_POST(pagingModel),{withCredentials: true})
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

  getPostById(id: number, sawNotification:boolean = false):Observable<PostModel>{
    return this.http.get<PostModel>(API_URL.GET_POST_BY_ID(id,sawNotification));
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
    return this.http.get<PositonPostModel[]>(API_URL.GET_INFOR_POSITION_POST(postId))
  }

  getPostsByUserId(userId: number): Observable<PostModel[]>{
    return this.http.get<PostModel[]>(API_URL.GET_POSTS_BY_USER_ID(userId));
  }

  updatePostById(postId: number, userId: number, postRequest: PostRequest): Observable<any>{
    return this.http.put(API_URL.UPDATE_POST_BY_ID(postId,userId),postRequest);
  }

  deletePostById(postId: number, userId: number): Observable<any>{
    return this.http.delete(API_URL.DELETE_POST_ID(postId, userId));
  }

  getUnapprovedPosts(pagingModel: PagingModel): Observable<PostResponeModel>{
    return this.http.get<PostResponeModel>(API_URL.GET_UNAPPROVED_POSTS(pagingModel));
  }

  getUnapprovedPostById(postId: number): Observable<PostModel>{
    return this.http.get<PostModel>(API_URL.GET_UNAPPROVED_POST_BY_ID(postId));
  }

  approvePost(postId: number): Observable<any>{
    return this.http.post(API_URL.APPROVE_POST_BY_ID(postId),{});
  }

  getApprovedPostByUserId(userId: number):  Observable<PostModel[]>{
    return this.http.get<PostModel[]>(API_URL.GET_APPROVED_POST_BY_USER_ID(userId));
  }

  getRejectedPost(pagingModel: PagingModel):Observable<PostResponeModel>{
    return this.http.get<PostResponeModel>(API_URL.GET_ALL_REJECTED_POST(pagingModel));
  }

  rejectPostById(postId: number, rejectReason: RejectModel): Observable<any> {
    return this.http.post(API_URL.REJECT_POST_BY_ID(postId),rejectReason);
  }
}
