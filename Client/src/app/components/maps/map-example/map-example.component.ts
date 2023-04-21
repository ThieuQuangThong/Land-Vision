import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from "@angular/core";
import { setDefaultOptions } from 'esri-loader';
import { loadModules } from 'esri-loader';
import esri = __esri;
// import Zoom from "@arcgis/core/widgets/Zoom.js";

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

  async initializeMap() {
    try {
      const [
        EsriMap,
        EsriMapView,
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
        'esri/Graphic',
        'esri/layers/GraphicsLayer',
        'esri/symbols/SimpleFillSymbol',
        'esri/widgets/Sketch',
        'esri/widgets/Locate',
        'esri/widgets/BasemapGallery',
        "esri/widgets/Fullscreen",
        'esri/widgets/Search',
        'esri/geometry/support/webMercatorUtils'
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
        const sketch = new Sketch({
          layer: graphicsLayer,
          view: mapView,
          // graphic will be selected as soon as it is created
          creationMode: "update"
        });

        mapView.ui.add(sketch, "top-right");

        const search = new Search({
          view: mapView
        });

        mapView.ui.add(search, "top-right");

        //SKETCH
        sketch.on("create", (event: any) => {
          if (event.state === "complete") {
            const graphic: __esri.Graphic = event.graphic;
            if (graphic.geometry.type === "polygon") {
              const polygon: __esri.Polygon = graphic.geometry as __esri.Polygon;
              const rings = polygon.rings;
              // Chuyển đổi tọa độ từ EPSG: 3857 sang EPSG: 4326
              const geographicRings = [];
              for (let i = 0; i < rings.length; i++) {
                const ring = rings[i];
                const geographicRing = [];
                for (let j = 0; j < ring.length; j++) {
                  const webMercatorPoint = {
                    x: ring[j][0],
                    y: ring[j][1]
                  };
                  const geographicPoint = webMercatorUtils.webMercatorToGeographic(webMercatorPoint);
                  geographicRing.push([geographicPoint.x, geographicPoint.y]);
                }
                geographicRings.push(geographicRing);
              }

              // In kết quả ra console
              console.log(geographicRings);
            }
          }
        });

        sketch.on("update", (event: any) => {
          const graphic: __esri.Graphic = event.graphics[0];
          if (graphic.geometry.type === "polygon") {
            const polygon: __esri.Polygon = graphic.geometry as __esri.Polygon;
            const rings = polygon.rings;
            // Chuyển đổi tọa độ từ EPSG: 3857 sang EPSG: 4326
            const geographicRings = [];
            for (let i = 0; i < rings.length; i++) {
              const ring = rings[i];
              const geographicRing = [];
              for (let j = 0; j < ring.length; j++) {
                const webMercatorPoint = {
                  x: ring[j][0],
                  y: ring[j][1]
                };
                const geographicPoint = webMercatorUtils.webMercatorToGeographic(webMercatorPoint);
                geographicRing.push([geographicPoint.x, geographicPoint.y]);
              }
              geographicRings.push(geographicRing);
            }
            if (event.toolEventInfo && (event.toolEventInfo.type === "move-stop" || event.toolEventInfo.type === "reshape-stop")) {
              // In kết quả ra console
              console.log(geographicRings);
            }
          }
        });

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
