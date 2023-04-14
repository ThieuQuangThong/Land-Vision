import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/assets/API_URL';
import { CategoryModel } from '../models/category-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategory():Observable<CategoryModel[]>{
    return this.http.get<CategoryModel[]>(API_URL.GET_CATEGORYS());
  }
}
