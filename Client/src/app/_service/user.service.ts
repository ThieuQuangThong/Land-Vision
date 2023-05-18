import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagingModel } from '../models/paging-model';
import { UserResponeModel } from '../models/user-respone-model';
import { Observable } from 'rxjs';
import { API_URL } from 'src/assets/API_URL';
import { PatchModel } from '../models/patch-model';
import { ContactInformation } from '../models/update-contact-information-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserCount():Observable<number> {
    return this.http.get<number>(API_URL.GET_USER_COUNT(),{withCredentials: true})
  }

  editSingleFieldUser(userId: number, value: string, path: string):Observable<any>{

    let patchModels: PatchModel[] = [];
    patchModels.push({
      path: path,
      op: 'replace',
      value: value
  })

    return this.http.patch(API_URL.UPDATE_USER_PATCH_BY_USER_ID(userId),patchModels)
  }

  editUserContactInformation(userId: number, value: ContactInformation):Observable<any>{
    let patchModels: PatchModel[] = [];
    const keyNames = Object.keys(value);

    const valueAny = value as any;
    keyNames.forEach(
      x => {
        patchModels.push({
          path: "/"+ x,
          op: 'replace',
          value: valueAny[x]
      })
      }
    )

    return this.http.patch(API_URL.UPDATE_USER_PATCH_BY_USER_ID(userId),patchModels)
  }


  getAllUser(pagingModel: PagingModel):Observable<UserResponeModel> {
    return this.http.get<UserResponeModel>(API_URL.GET_ALL_USER(pagingModel),{withCredentials: true})
  }

  updateVip(userId : number, vipId : number):Observable<any> {
    return this.http.put<any>(API_URL.UPDATE_USER_VIP(userId,vipId),{withCredentials: true})

  }
}
