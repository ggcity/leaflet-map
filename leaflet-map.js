import { Element as PolymerElement } from '../@polymer/polymer/polymer-element.js';

export class LeafletMap extends PolymerElement {
  static get template() {
    return `
     <link rel="stylesheet" href="https://unpkg.com/leaflet@1.2.0/dist/leaflet.css"
   integrity="sha512-M2wvCLH6DSRazYeZRIm1JnYyh22purTM+FDB5CsyxtQJYeKq83arPe5wgbNmcFXGqiSH2XR8dT/fJISVA1r/zQ=="
   crossorigin=""/>

      <style>
        #map {
          width: 100%;
          height: 100%;
          @apply (--leaflet-map-component)
        }
      </style>

      <div id="map"></div>
    `;
  }

  static get properties() {
    return {
      latitude: {
        type: Number
      },
      longitude: {
        type: Number
      },
      zoom: {
        type: Number
      },
      minZoom: {
        type: Number
      },
      maxZoom: {
        type: Number
      },
      attributionPrefix: {
        type: String
      }
    }
  }

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();

    this.loaded = window.L && true;

    if (!this.loaded) {
      let script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.2.0/dist/leaflet.js';
      script.onload = this._initializeMap.bind(this);

      document.getElementsByTagName('head')[0].appendChild(script);

      this.loaded = true;
    }
  }

  _initializeMap() {
    let map = L.map(this.$.map, {
      center: [this.latitude, this.longitude],
      zoom: this.zoom,
      inertiaDeceleration: 3000,
      inertiaMaxSpeed: 3000,
      attributionControl: false,
      minZoom: this.minZoom,
      maxZoom: this.maxZoom
    });

    if (this.attributionPrefix) {
      let attrControl = L.control.attribution({ prefix: this.attributionPrefix });
      map.addControl(attrControl);
    }

    L.tileLayer('//www.ci.garden-grove.ca.us/tileserver/styles/gg-basic/{z}/{x}/{y}.png', {
      maxZoom: 19, 
      attribution: '&copy; OpenStreetMap'
    }).addTo(map);
  }
}

customElements.define('leaflet-map', LeafletMap);
