\<leaflet-map\>
===============
Leaflet map web component. Requires Polymer 3.x.

Installation
------------

This currently comes in as pure ES6 only.

    $ yarn add @ggcity/leaflet-map

Usage
-----

```html
<script type="module" src="./node_modules/@ggcity/leaflet-map/leaflet-map.js"></script>

<leaflet-map
  latitude="33.778724"
  longitude="-117.960058"
  zoom="13"
  min-zoom="11"
  max-zoom="19"
  attribution-prefix="City of Garden Grove"
></leaflet-map>
```

Maintainers
-----------

* Rachot Moragraan ([mooman](https://github.com/mooman)) - moo@ci.garden-grove.ca.us

License
-------

    Copyright (C) 2017 City of Garden Grove

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.