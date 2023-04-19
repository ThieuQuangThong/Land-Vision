import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from "@angular/core";
import { loadModules } from 'esri-loader';
import { setDefaultOptions } from 'esri-loader';
import esri = __esri;
import { log } from "esri/config";

@Component({
  selector: "app-map-example",
  templateUrl: "./map-example.component.html",
  styleUrls: ["./map-example.component.css"],
})
export class MapExampleComponent implements OnInit  {

  @Output() mapLoaded = new EventEmitter<boolean>();
  @ViewChild('mapViewNode', { static: true })
  private mapViewEl!: ElementRef;

  /**
   * @private _zoom sets map zoom
   * @private _center sets map center
   * @private _basemap sets type of map
   */
  private _zoom: number = 18;
  private _center: Array<number> = [108.21147547864406, 16.06505300439531];
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

  constructor() {}

  // async initializeMap() {
  //   try {
  //     const [
  //       EsriMap,
  //       EsriMapView,
  //       Graphic,
  //       GraphicsLayer,
  //       SimpleMarkerSymbol,
  //       SimpleLineSymbol,
  //       SimpleFillSymbol,
  //       Color,
  //       Polygon
  //     ] = await loadModules([
  //       'esri/Map',
  //       'esri/views/MapView',
  //       'esri/Graphic',
  //       'esri/layers/GraphicsLayer',
  //       'esri/symbols/SimpleMarkerSymbol',
  //       'esri/symbols/SimpleLineSymbol',
  //       'esri/symbols/SimpleFillSymbol',
  //       'esri/Color',
  //       'esri/geometry/Polygon'
  //     ]);

  //     const mapProperties: esri.MapProperties = {
  //       basemap: this._basemap
  //     };
  //     const map: esri.Map = new EsriMap(mapProperties);

  //     const graphicsLayer = new GraphicsLayer();
  //     map.add(graphicsLayer);

  //     const polygonSymbol = new SimpleFillSymbol({
  //       color: [0, 0, 255, 0.5],
  //       outline: {
  //         color: [0, 0, 255],
  //         width: 1
  //       }
  //     });

  //     const polygonGraphic = new Graphic({
  //       symbol: polygonSymbol
  //     });

  //     graphicsLayer.add(polygonGraphic);

  //     const mapViewProperties: esri.MapViewProperties = {
  //       container: this.mapViewEl.nativeElement,
  //       center: this._center,
  //       zoom: this._zoom,
  //       map: map
  //     };
  //     const mapView: esri.MapView = new EsriMapView(mapViewProperties);

  //     let vertices: number[][] = [];
  //     console.log("loaded");

  //     mapView.on("click", (event: esri.ViewClickEvent) => {
  //       const point = event.mapPoint.clone();
  //       vertices.push([point.longitude, point.latitude]);
  //       console.log("sau khi push vo verices:"+vertices);

  //       const polygon = new Polygon({
  //         rings: [vertices],
  //         spatialReference: {
  //           wkid: 4326
  //         }
  //       });

  //       polygonGraphic.geometry = polygon;
  //     });

  //     mapView.on("double-click", (event: esri.ViewDoubleClickEvent) => {
  //       if (vertices.length >= 3) {
  //             console.log("polygon:"+vertices);
  //             // Create a new polygon graphic and add it to the graphics layer
  //             const polygon = new Polygon({
  //               rings: [vertices],
  //               spatialReference: {
  //                 wkid: 4326
  //               }
  //             });

  //         const graphic = new Graphic({
  //           geometry: polygon,
  //           symbol: polygonSymbol
  //         });

  //         graphicsLayer.add(graphic);

  //         // Clear the vertices array for the next polygon
  //         vertices = [];
  //       }
  //     }
  //     // }
  //     );

  //     mapView.when(() => {
  //       this.mapLoaded.emit(true);
  //     });
  //   } catch (error) {
  //     alert('We have an error: ' + error);
  //   }
  // }

  async initializeMap() {
    try {
      const [
        EsriMap,
        EsriMapView,
        Graphic,
        GraphicsLayer,
        SimpleMarkerSymbol,
        SimpleLineSymbol,
        SimpleFillSymbol,
        Color,
        Polygon
      ] = await loadModules([
        'esri/Map',
        'esri/views/MapView',
        'esri/Graphic',
        'esri/layers/GraphicsLayer',
        'esri/symbols/SimpleMarkerSymbol',
        'esri/symbols/SimpleLineSymbol',
        'esri/symbols/SimpleFillSymbol',
        'esri/Color',
        'esri/geometry/Polygon'
      ]);

      const mapProperties: esri.MapProperties = {
        basemap: this._basemap
      };
      const map: esri.Map = new EsriMap(mapProperties);

      const graphicsLayer = new GraphicsLayer();
      map.add(graphicsLayer);

      const polygonSymbol = new SimpleFillSymbol({
        color: [0, 0, 255, 0.5],
        outline: {
          color: [0, 0, 255],
          width: 1
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
        map: map
      };
      const mapView: esri.MapView = new EsriMapView(mapViewProperties);

      let vertices: number[][] = [];

      // const clearButton = document.getElementById('Polygon');
      // clearButton!.addEventListener('click', () => {
      //   vertices = [];
      //   polygonGraphic.geometry = null;
      //   graphicsLayer.removeMany(graphicsLayer.graphics.toArray());
      // });

      mapView.on('click', (event: esri.ViewClickEvent) => {
        const point = event.mapPoint.clone();
        vertices.push([point.longitude, point.latitude]);
        console.log('sau khi push vo verices:', vertices);

        const polygon = new Polygon({
          rings: [vertices],
          spatialReference: {
            wkid: 4326
          }
        });

        polygonGraphic.geometry = polygon;
      });

      mapView.on("double-click", (event: esri.ViewDoubleClickEvent) => {
        if (vertices.length > 0) {
          vertices.pop();

          const polygon = new Polygon({
            rings: [vertices],
            spatialReference: {
              wkid: 4326
            }
          });
          polygonGraphic.geometry = polygon;
        }
      });

      mapView.when(() => {
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
