import { ShareDataService } from 'src/app/_service/share-data.service';
import { PositionModel } from './../../../models/position-model';
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from "@angular/core";
import { loadModules } from 'esri-loader';
import esri = __esri;
import { PlaceModel } from 'src/app/models/place-model';
import { PostService } from 'src/app/_service/post.service';
import { PositonPostModel } from 'src/app/models/positonPost-model';
import { PopupTemplate } from 'src/app/models/popupTemplate';
import { Attributes } from 'src/app/models/attributes';
import { PopUpObject } from 'src/app/models/popUpObject';


@Component({
  selector: 'app-map-list-detail',
  templateUrl: './map-list-detail.component.html',
  styleUrls: ['./map-list-detail.component.css']
})
export class MapListDetailComponent {

  @Output() mapLoaded = new EventEmitter<boolean>();
  @Input() postId: number =0;
  @ViewChild('mapViewNode', { static: true })
  private mapViewEl!: ElementRef;

  /**
   * @private _zoom sets map zoom
   * @private _center sets map center
   * @private _basemap sets type of map
   */
  private _zoom: number = 22;
  private _center: Array<number> = [108.24473386336861, 16.06329028488975];
  private _basemap: string = 'osm';

  @Input()
  set zoom(zoom: number) {
    this._zoom = zoom;
  }

  get zoom(): number {
    return this._zoom;
  }

  @Input()
  set center(center: Array<number>) {
    this._center = center;
  }

  get center(): Array<number> {
    return this._center;
  }

  @Input()
  set basemap(basemap: string) {
    this._basemap = basemap;
  }

  get basemap(): string {
    return this._basemap;
  }

  constructor(private shareDataService: ShareDataService, private postService: PostService) {}

  async initializeMap(centerPos: number[][] =[], otherPos:number[][][],positionPosts:PositonPostModel[] ) {

    try {
      const [
        EsriMap,
        EsriMapView,
        Extent,
        Graphic,
        GraphicsLayer,
        SimpleFillSymbol,
        Locate,
        BasemapGallery,
        Fullscreen,
        Search,
      ] = await loadModules([
        'esri/Map',
        'esri/views/MapView',
        'esri/geometry/Extent',
        'esri/Graphic',
        'esri/layers/GraphicsLayer',
        'esri/symbols/SimpleFillSymbol',
        'esri/widgets/Locate',
        'esri/widgets/BasemapGallery',
        "esri/widgets/Fullscreen",
        'esri/widgets/Search',
        'esri/geometry/support/webMercatorUtils',
      ]);

      const mapProperties: esri.MapProperties = {
        basemap: this._basemap
      };
      const map: esri.Map = new EsriMap(mapProperties);

      const graphicsLayer = new GraphicsLayer();
      let pointGraphics = new GraphicsLayer();
      let realEstateGraphic = new GraphicsLayer();
      map.add(graphicsLayer);
      map.add(pointGraphics);
      map.add(realEstateGraphic);

      const polygonSymbol = new SimpleFillSymbol({
        color: [0, 255, 255, 0.5],
        outline: {
          color: [0, 0, 0],
          width: 1
        }
      });

      const extent = new Extent({
        xmin: 108.07368447123736,
        ymin: 15.976433319718469,
        xmax: 108.32431008158854,
        ymax: 16.131502117889013,
        spatialReference: {
          wkid: 4326
        }
      });

      const polygonGraphic = new Graphic({
        symbol: polygonSymbol
      });
      graphicsLayer.add(polygonGraphic);
      const mapViewProperties: esri.MapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: centerPos.length === 0 ? this._center :centerPos[0],
        zoom: this._zoom,
        map: map,
        constraints: {
          geometry: extent,
          minScale: 500000,
          // maxScale: 3000
        }
      };
      const mapView: esri.MapView = new EsriMapView(mapViewProperties);

      const locate = new Locate({
        view: mapView
      });
      mapView.ui.add(locate, "top-left");

      const basemapGallery = new BasemapGallery({
        view: mapView
      });
      mapView.ui.add(basemapGallery, "bottom-left");

      const fullscreen  = new Fullscreen ({
        view: mapView
      });
      mapView.ui.add(fullscreen, "bottom-right");



      mapView.when(() => {


        const search = new Search({
          view: mapView
        });
        mapView.ui.add(search, "top-right");

          let i =0;
          otherPos.forEach(
            x =>{
              if(i > 0){
                return;
              }

             const popUpObect = this.shareDataService.setPopUpObject(`<p>Tên: ${positionPosts[i].name} </p>
             <a href="http://localhost:4200/productdetails/${positionPosts[i].id}">Địa chỉ: ${positionPosts[i].addressNumber}</a>`)
              const polygon = {
                type: "polygon",
                rings: x
             };
             const polygonGraphic = new Graphic({
              geometry: polygon,
              symbol: polygonSymbol,
              attributes: popUpObect.Attributes,
              popupTemplate: popUpObect.PopupTemplate
           });

           pointGraphics = new GraphicsLayer();
           const simpleMarkerSymbol1 = {
             type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
             url: "https://static.arcgis.com/images/Symbols/Shapes/RedStarLargeB.png",
             width: "64px",
             height: "64px"
          };
          let point1 = { //Create a point
            type: "point",
            longitude: Number(positionPosts[i].positions[0].longtitude),
            latitude: Number(positionPosts[i].positions[0].latitude)
         };
          let pointGraphic1 = new Graphic({
            geometry: point1,
            symbol: simpleMarkerSymbol1,
         });
          console.log(point1);

           graphicsLayer.add(polygonGraphic);
           realEstateGraphic.add(pointGraphic1);
           i++;
            }
          )

        this.shareDataService.getRelativePlaceAsTracking()
        .subscribe(
          respone =>{
            map.remove(pointGraphics);
            pointGraphics = new GraphicsLayer();
            const simpleMarkerSymbol = {
              type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
              url: "https://static.arcgis.com/images/Symbols/Shapes/BlueStarLargeB.png",
              width: "64px",
              height: "64px"
           };
          respone.forEach(
            x =>{
              let point = { //Create a point
                type: "point",
                longitude: Number(x.longtitude),
                latitude: Number(x.latitude)
             };

            const popUpOb = this.shareDataService.setPopUpObject(`<p>Tên: ${x.place?.name} </p>
            <a >Địa chỉ: ${x.place?.formatted_address}</a>`)

             let pointGraphic = new Graphic({
              geometry: point,
              symbol: simpleMarkerSymbol,
              attributes: popUpOb.Attributes,
              popupTemplate: popUpOb.PopupTemplate
           });
           map.add(pointGraphics);
           pointGraphics.add(pointGraphic);
            }
          )
          }
        )


        this.mapLoaded.emit(true);
      });
    } catch (error) {
      alert('We have an error: ' + error);
    }
  }

  ngOnInit() {
    this.postService.getInforPositionPosts(this.postId)
    .subscribe(
      respone =>{
          const positionPosts:  PositonPostModel[] =[];
          const otherPositions: number[][][] = [];
          const positionArray: number[][] = this.shareDataService.tranferToArsgisPos(respone[0].positions);

          respone.forEach(
            x =>{
              const otherPositionArray = this.shareDataService.tranferToArsgisPos(x.positions)
              if(otherPositionArray.length >0){
                otherPositions.push(otherPositionArray);
                positionPosts.push(x)
              }
            }
          )

          this.initializeMap(positionArray,otherPositions,positionPosts);
      }
    )

  }


}
