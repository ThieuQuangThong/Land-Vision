import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DistrictModel } from '../models/district-model';
import { API_URL } from 'src/assets/API_URL';
import { WardModel } from '../models/ward-model';
import { StreetModel } from '../models/street-model';

@Injectable({
  providedIn: 'root'
})
export class CityInformationService {

  constructor(private http: HttpClient) { }


  getDistrict():Observable<DistrictModel[]>{
    return this.http.get<DistrictModel[]>(API_URL.GET_DISTRICT());
  }

  getWard():Observable<WardModel[]>{
    return this.http.get<WardModel[]>(API_URL.GET_WARD());
  }

  getStreetByDistrictId(districtId: number):Observable<StreetModel[]>{
    return this.http.get<StreetModel[]>(API_URL.GET_STREET_BY_DISTRICT(districtId));
  }

  getWardByDistrictId(districtId: number):Observable<WardModel[]>{
    return this.http.get<WardModel[]>(API_URL.GET_WARD_BY_DISTRICT(districtId));
  }

  getDirections():Observable<string[]>{
    return this.http.get<string[]>(API_URL.GET_DIRECTIONS());
  }

}
