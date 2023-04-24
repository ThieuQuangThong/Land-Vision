import { ShareDataService } from 'src/app/_service/share-data.service';
import { PositionModel } from './../../../models/position-model';
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from "@angular/core";
import { loadModules } from 'esri-loader';
import esri = __esri;

@Component({
  selector: 'app-map-list-detail',
  templateUrl: './map-list-detail.component.html',
  styleUrls: ['./map-list-detail.component.css']
})
export class MapListDetailComponent {

  @Output() mapLoaded = new EventEmitter<boolean>();
  @ViewChild('mapViewNode', { static: true })
  private mapViewEl!: ElementRef;

  /**
   * @private _zoom sets map zoom
   * @private _center sets map center
   * @private _basemap sets type of map
   */
  private _zoom: number = 18;
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

  constructor(private shareDataService: ShareDataService) {}

  async initializeMap() {
    try {
      const [
        EsriMap,
        EsriMapView,
        Extent,
        Graphic,
        GraphicsLayer,
        SimpleFillSymbol,
        Sketch,
        Locate,
        BasemapGallery,
        Fullscreen,
        Search,
        webMercatorUtils
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
      map.add(graphicsLayer);

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
        center: this._center,
        zoom: this._zoom,
        map: map,
        constraints: {
          geometry: extent,
          minScale: 500000,
          maxScale: 2000
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

        mapView.ui.add(search, "top-right");



        this.shareDataService.getPositionPostAsTracking()
        .subscribe(
          respone =>{
            const positionArray: number[][] = [];
            respone.forEach(
              x => {
                const {latitude, longtitude} = x;
                positionArray.push([Number(longtitude), Number(latitude)]);
              }
            )
            const polygon = {
              type: "polygon",
              rings: positionArray
           };



           const polygonGraphic = new Graphic({
            geometry: polygon,
            symbol: polygonSymbol,

         });
         graphicsLayer.add(polygonGraphic);
          }
        )


        this.mapLoaded.emit(true);
      });
    } catch (error) {
      alert('We have an error: ' + error);
    }
  }

  ngOnInit() {
    this.initializeMap();
  }

}
