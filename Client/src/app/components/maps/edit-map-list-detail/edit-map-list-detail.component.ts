import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { loadModules } from 'esri-loader';
import { ShareDataService } from 'src/app/_service/share-data.service';
import { PositionModel } from 'src/app/models/position-model';
import esri = __esri;
import { PositonPostModel } from 'src/app/models/positonPost-model';
import { PostService } from 'src/app/_service/post.service';

@Component({
  selector: 'app-edit-map-list-detail',
  templateUrl: './edit-map-list-detail.component.html',
  styleUrls: ['./edit-map-list-detail.component.css']
})
export class EditMapListDetailComponent {
  @Output() mapLoaded = new EventEmitter<boolean>();
  @Input() postId: number =0;
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

  constructor(private shareDataService: ShareDataService, private postService: PostService) {}

  async initializeMap(centerPos: number[][] =[], otherPos:number[][][],positionPosts:PositonPostModel[]) {
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
        Expand,
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
        "esri/widgets/Expand",
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
        color: [0, 0, 255, 0.5],
        outline: {
          color: [0, 0, 255],
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
        center: centerPos[0],
        zoom: this._zoom,
        map: map,
        constraints: {
          geometry: extent,
          minScale: 500000,
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

      // mapView.ui.add(basemapGallery, "bottom-left");
      const bgExpand = new Expand({
        view: mapView,
        content: basemapGallery
      });
      mapView.ui.add(bgExpand, "top-left");

      mapView.when(() => {
        const sketch = new Sketch({
          layer: graphicsLayer,
          view: mapView,
          visibleElements: {
            selectionTools: {
              "lasso-selection": false,
              "rectangle-selection": false
            },
            createTools: {
              "point": false,
              "polyline": false
            }
          },
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
              const geographicRings: PositionModel[] = [];
              for (let i = 0; i < rings.length; i++) {
                const ring = rings[i];
              for (let j = 0; j < ring.length; j++) {
                const geographicRing: PositionModel = new PositionModel();
                  const webMercatorPoint = {
                    x: ring[j][0],
                    y: ring[j][1]
                  };
                  const geographicPoint = webMercatorUtils.webMercatorToGeographic(webMercatorPoint);

                  geographicRing.longtitude = geographicPoint.x.toString();
                  geographicRing.latitude = geographicPoint.y.toString()

                  geographicRings.push(geographicRing);
                }

              }
              // In kết quả ra console
              console.log(geographicRings);
              this.shareDataService.setPositionPost(geographicRings);
            }
          }
        });

        sketch.on("update", (event: any) => {
          const graphic: __esri.Graphic = event.graphics[0];
          if (graphic.geometry.type === "polygon") {
            const polygon: __esri.Polygon = graphic.geometry as __esri.Polygon;
            const rings = polygon.rings;
            // Chuyển đổi tọa độ từ EPSG: 3857 sang EPSG: 4326
            const geographicRings: PositionModel[] = [];
            for (let i = 0; i < rings.length; i++) {
              const ring = rings[i];
              for (let j = 0; j < ring.length; j++) {
                const geographicRing: PositionModel = new PositionModel();
                const webMercatorPoint = {
                  x: ring[j][0],
                  y: ring[j][1]
                };
                const geographicPoint = webMercatorUtils.webMercatorToGeographic(webMercatorPoint);
                geographicRing.longtitude = geographicPoint.x.toString();
                geographicRing.latitude = geographicPoint.y.toString();
                geographicRings.push(geographicRing);
              }
            }

            if (event.toolEventInfo && (event.toolEventInfo.type === "move-stop" || event.toolEventInfo.type === "reshape-stop")) {
              // In kết quả ra console
              console.log(geographicRings);
              this.shareDataService.setPositionPost(geographicRings);
            }
          }
        });

        let i =0;
        otherPos.forEach(
          x =>{
            if(i > 0){
              return;
            }
            console.log('fsfef');

           const popUpOb = this.shareDataService.setPopUpObject(`<p>Tên: ${positionPosts[i].name} </p><a href="http://localhost:4200/productdetails/${positionPosts[i].id}">Địa chỉ: ${positionPosts[i].addressNumber}</a>`)
            const polygon = {
              type: "polygon",
              rings: x
           };
           const polygonGraphic = new Graphic({
            geometry: polygon,
            symbol: polygonSymbol,
            // attributes: attributes,
            // popupTemplate: popupTemplate
         });
         graphicsLayer.add(polygonGraphic);
         i++;
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
