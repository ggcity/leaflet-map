import { Element as PolymerElement } from '../../@polymer/polymer/polymer-element.js';
import { FlattenedNodesObserver } from '../../@polymer/polymer/lib/utils/flattened-nodes-observer.js';
import { Map } from '../../leaflet/src/map';
import { Attribution } from '../../leaflet/src/control/Control.Attribution.js'

// Need these side effects
import '../../leaflet/src/control';
import '../../leaflet/src/layer';

export class LeafletMap extends PolymerElement {
  static get template() {
    return `
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css" />

      <!-- FIXME: Figure out Shadow DOM so this doesn't have to be included here -->
      <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.3.0/dist/MarkerCluster.css" media="screen">
      <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.3.0/dist/MarkerCluster.Default.css" media="screen">

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
      map: {
        type: Object,
        notify: true
      },
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
      zoomControl: {
        type: Boolean,
        value: false
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

    this.map = new Map(this.$.map, {
      center: [this.latitude, this.longitude],
      zoom: this.zoom,
      zoomControl: this.zoomControl,
      inertiaDeceleration: 3000,
      inertiaMaxSpeed: 3000,
      attributionControl: false,
      minZoom: this.minZoom,
      maxZoom: this.maxZoom,
      tapTolerance: 40,
      tap: false
    });
    
    if (this.attributionPrefix) {
      let attrControl = new Attribution({ prefix: this.attributionPrefix });
      this.map.addControl(attrControl);
    }

    // L.marker([this.latitude, this.longitude]).addTo(this.map);

    let slot = this.shadowRoot.querySelector('slot');
    this._childrenObserver = new FlattenedNodesObserver(slot, this._bindDependencies.bind(this));
  }
  
  /* Shitty way of passing value to children */
  _bindDependencies({addedNodes}) {
    addedNodes.forEach(n => {
      n.map = this.map;
    });
  }
}

customElements.define('leaflet-map', LeafletMap);
