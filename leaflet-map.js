import { Element as PolymerElement } from '../../@polymer/polymer/polymer-element.js';
import { FlattenedNodesObserver } from '../../@polymer/polymer/lib/utils/flattened-nodes-observer.js';
import '../../@ggcity/leaflet-iife/dist/leaflet.js';

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

      <div id="map">
        <slot></slot>
      </div>
    `;
  }

  static get properties() {
    return {
      map: Object,
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
      },
      _childrenObserver: Object
    }
  }

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();

    this.map = L.map(this.$.map, {
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
      this.map.addControl(attrControl);
    }

    let slot = this.shadowRoot.querySelector('slot');
    this._childrenObserver = new FlattenedNodesObserver(slot, this._bindDependencies.bind(this));
  }
  
  _bindDependencies({addedNodes}) {
    addedNodes.forEach(n => {
      n.map = this.map;
    });
  }
}

customElements.define('leaflet-map', LeafletMap);
