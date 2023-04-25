import { ShareDataService } from 'src/app/_service/share-data.service';
import { PositionModel } from './../../../models/position-model';
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from "@angular/core";
import { loadModules } from 'esri-loader';
import esri = __esri;
import { PostService } from 'src/app/_service/post.service';
import { PositonPostModel } from 'src/app/models/positonPost-model';

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

  async initializeMap(centerPos: number[][] =[], otherPos:number[][][], positionPosts: PositonPostModel[] ) {


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
        'esri/widgets/Sketch',
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
      map.add(graphicsLayer);
      map.add(pointGraphics);

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
      const fullscreen  = new Fullscreen ({
        view: mapView
      });

      mapView.ui.add(fullscreen, "bottom-right");


      const basemapGallery = new BasemapGallery({
        view: mapView
      });

      mapView.ui.add(basemapGallery, "bottom-left");

      mapView.when(() => {


        const search = new Search({
          view: mapView
        });

       console.log(otherPos);

       mapView.ui.add(search, "top-right");
       let i = 0;
          otherPos.forEach(
            x =>{
              const popupTemplate = {
                title: "{Name}",
                content: "{Description}"
             }
             const attributes = {
                Description: `<div>
                <p>Tên: ${positionPosts[i].name}</p>
                <a href="http://localhost:4200/productdetails/${positionPosts[i].id}">Địa chỉ: ${positionPosts[i].addressNumber}</a>
                </div>`
             }
              const polygon = {
                type: "polygon",
                rings: x
             };
             const polygonGraphic = new Graphic({
              geometry: polygon,
              symbol: polygonSymbol,
              attributes: attributes,
              popupTemplate: popupTemplate
           });
           graphicsLayer.add(polygonGraphic);
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
              url: "https://static.arcgis.com/images/Symbols/Shapes/BlackStarLargeB.png",
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
             let pointGraphic = new Graphic({
              geometry: point,
              symbol: simpleMarkerSymbol,
           });
           map.add(pointGraphics);
           pointGraphics.add(pointGraphic);
            }
          )
          }
        )

    //      const point = { //Create a point
    //       type: "point",
    //       longitude: 108.20993977685053,
    //       latitude: 16.031755678530747
    //    };
    //    const simpleMarkerSymbol = {
    //     type: "simple-marker",
    //     color: [0, 255, 255, 0.5],
    //     outline: {
    //       color: [0, 0, 0],
    //       width: 1
    //     }
    //  };
    //    const pointGraphic = new Graphic({
    //     geometry: point,
    //     symbol: simpleMarkerSymbol,
    //     attributes: attributes,
    //     popupTemplate: popupTemplate
    //  });
    //       graphicsLayer.add(pointGraphic);
         graphicsLayer.add(polygonGraphic);

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
          const positionPosts: PositonPostModel[] =[];
          const otherPositions: number[][][] = [];
          const positionArray: number[][] = this.shareDataService.tranferToArsgisPos(respone[0].positions);
          let j = 0;
          respone.forEach(
            x =>{
              const otherPositionArray = this.shareDataService.tranferToArsgisPos(x.positions)
              if(otherPositionArray.length > 0){
                otherPositions.push(otherPositionArray);
                positionPosts.push(x);
              }

            }
          )


          this.initializeMap(positionArray,otherPositions,positionPosts);
      }
    )

  }
}
