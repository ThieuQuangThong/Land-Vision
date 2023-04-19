import { Injectable } from '@angular/core';
import { PositionModel } from '../models/position-model';

@Injectable({
  providedIn: 'root'
})
export class NearByServiceService {

  constructor() { }
  onCloseLocation(positionModel : PositionModel, limitDistance: number, query: string) : google.maps.places.PlaceResult[]{
    console.log(positionModel);

    var map: google.maps.Map | HTMLDivElement;
    var infowindow;
    var pyrmont = new google.maps.LatLng(Number(positionModel.latitude), Number(positionModel.longtitude));

    infowindow = new google.maps.InfoWindow();

    map = new google.maps.Map(
        document.getElementById('map')!, {center: pyrmont, zoom: 25});

    var request = {
      location: pyrmont,
      radius: 100,
      query: query
    };

    var service = new google.maps.places.PlacesService(map);
    let finalResults: google.maps.places.PlaceResult[] = [] ;
    service.textSearch(request, (results,status) => {
      finalResults = JSON.parse(JSON.stringify(results));
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        finalResults = results.filter(item => this.calculate({
          latitude: item.geometry?.location.lat().toString()!,
          longtitude: item.geometry?.location.lng().toString()!,
        },
        positionModel,
        limitDistance))
      }
    });
    return finalResults;
  };

  calculate(positionModel1 : PositionModel,positionModel2 : PositionModel, limitDistance: number): boolean{
    const lat1 = Number(positionModel1.latitude) * Math.PI / 180;
    const long1 = Number(positionModel1.longtitude) * Math.PI / 180;
    const lat2 = Number(positionModel2.latitude) * Math.PI / 180;
    const long2 = Number(positionModel2.longtitude) * Math.PI / 180;
    console.log(232);
    console.log(positionModel1);
    const R = 6371000; // bán kính trung bình của trái đất (đơn vị: m)

    const delta_long = long2 - long1;

    const a = (Math.cos(lat2) * Math.sin(delta_long)) ** 2 + (Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(delta_long)) ** 2;
    const b = Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(delta_long);
    const c = Math.atan2(Math.sqrt(a), b);
    const d = R * c;

    return d < limitDistance;
  }
}
