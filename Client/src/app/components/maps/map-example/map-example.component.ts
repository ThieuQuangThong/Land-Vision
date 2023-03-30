import { Component } from "@angular/core";

// import arcgis lib
// import Map from "@arcgis/core/Map";
// import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
// import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
// import PictureFillSymbol from "@arcgis/core/symbols/PictureFillSymbol";
// import CartographicLineSymbol from "@arcgis/core/symbols";
// import Graphic from "@arcgis/core/Graphic";
// import Color from "@arcgis/core/Color";
// import {exp} from "dojo/dom";
// import {once} from "dojo/on";
// import ready from "dojo/domReady!";

// declare const google: any;

@Component({
  selector: "app-map-example",
  templateUrl: "./map-example.component.html",
  styleUrls: ["./map-example.component.css"],
})
export class MapExampleComponent  {
  constructor() {}

  // ngOnInit(): void {
  // }

  //  map:any, tb:any;

  //   require([
  //     "esri/map", "esri/toolbars/draw",
  //     "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol",
  //     "esri/symbols/PictureFillSymbol", "esri/symbols/CartographicLineSymbol",
  //     "esri/graphic",
  //     "esri/Color", "dojo/dom", "dojo/on", "dojo/domReady!"
  //   ], function(
  //     Map, Draw,
  //     SimpleMarkerSymbol, SimpleLineSymbol,
  //     PictureFillSymbol, CartographicLineSymbol,
  //     Graphic,
  //     Color, dom, on
  //   ) {
  //     map = new Map("mapDiv", {
  //       basemap: "osm",
  //       center: [108.22397570156461, 16.061099090499123],
  //       zoom: 30
  //     });


  //     map.on("load", initToolbar);

  //     // markerSymbol is used for point and multipoint, see http://raphaeljs.com/icons/#talkq for more examples
  //     var markerSymbol = new SimpleMarkerSymbol();
  //     markerSymbol.setPath("M16,4.938c-7.732,0-14,4.701-14,10.5c0,1.981,0.741,3.833,2.016,5.414L2,25.272l5.613-1.44c2.339,1.316,5.237,2.106,8.387,2.106c7.732,0,14-4.701,14-10.5S23.732,4.938,16,4.938zM16.868,21.375h-1.969v-1.889h1.969V21.375zM16.772,18.094h-1.777l-0.176-8.083h2.113L16.772,18.094z");
  //     markerSymbol.setColor(new Color("#00FFFF"));

  //     // lineSymbol used for freehand polyline, polyline and line.
  //     var lineSymbol = new CartographicLineSymbol(
  //       CartographicLineSymbol.STYLE_SOLID,
  //       new Color([255,0,0]), 1,
  //       CartographicLineSymbol.CAP_ROUND,
  //       CartographicLineSymbol.JOIN_MITER, 5
  //     );

  //     // fill symbol used for extent, polygon and freehand polygon, use a picture fill symbol
  //     // the images folder contains additional fill images, other options: sand.png, swamp.png or stiple.png
  //     var fillSymbol = new PictureFillSymbol(
  //       "https://www.iconpacks.net/icons/2/free-tree-icon-1578-thumb.png",
  //       new SimpleLineSymbol(
  //         SimpleLineSymbol.STYLE_SOLID,
  //         new Color('#000'),
  //         1
  //       ),
  //       42,
  //       42
  //     );

  //     function initToolbar() {
  //       tb = new Draw(map);
  //       tb.on("draw-end", addGraphic);

  //       // event delegation so a click handler is not
  //       // needed for each individual button
  //       on(dom.byId("info"), "click", function(evt) {
  //         if ( evt.target.id === "info" ) {
  //           return;
  //         }
  //         var tool = evt.target.id.toLowerCase();
  //         map.disableMapNavigation();
  //         tb.activate(tool);
  //       });
  //     }

  //     function addGraphic(evt) {
  //       //deactivate the toolbar and clear existing graphics
  //       tb.deactivate();
  //       map.enableMapNavigation();

  //       // figure out which symbol to use
  //       var symbol;
  //       if ( evt.geometry.type === "point" || evt.geometry.type === "multipoint") {
  //         symbol = markerSymbol;
  //       } else if ( evt.geometry.type === "line" || evt.geometry.type === "polyline") {
  //         symbol = lineSymbol;
  //       }
  //       else {
  //         symbol = fillSymbol;
  //       }

  //       map.graphics.add(new Graphic(evt.geometry, symbol));
  //     }
  //   });

}
