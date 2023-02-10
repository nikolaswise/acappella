<h1>
  Venues, Maps, and Points.
</h1>

<h2>Endpoints</h2>

<h3><code>/api/autocomplete</code></h3>

<pre><code>
GET http://localhost:5173/api/autocomplete?query=franks&radius=25000&latLng=45.512514553756034,-122.67504711758102

{@html `{
  "query": "franks",
  "radius": "25000",
  "latLng": [
    "45.512514553756034",
    "-122.67504711758102"
  ],
  "results": [
    {
      "name": "Frank's Noodle House",
      "fsq_id": "https://api.foursquare.com/v3/places/4c81bf19d4e237043f566188",
      "address": "822 NE Broadway St (at NE 8th Ave), Portland, OR 97232",
      "longitude": -122.657132,
      "latitude": 45.534959,
      "tel": "(503) 288-1007",
      "website": "http://www.franksnoodlehousepdx.com",
      "id": "uri:uuid:123",
      "type": "vox:Venue",
      "description": "Authentic hand-pulled noodles on one of Portland's most neglected corridors."
    },
    {
      "name": "Frank's Noodle House",
      "fsq_id": "https://api.foursquare.com/v3/places/594abcbabb8d363671f1caed",
      "address": "15950 SW Regatta Ln, Beaverton, OR 97006",
      "longitude": -122.841547,
      "latitude": 45.516269,
      "tel": "(503) 430-0901",
      "website": "http://www.franksnoodlehousepdx.com/beaverton-home"
    },
    …
  ]
}`}
</code></pre>

<h3><code>/api/venues</code></h3>

<pre><code>
GET http://localhost:5173/api/venues

{@html `{
  "venues": [
    {
      "id": "uri:uuid:123",
      "type": "vox:Venue",
      "description": "Authentic hand-pulled noodles on one of Portland's most neglected corridors.",
      "fsq_id": "https://api.foursquare.com/v3/places/4c81bf19d4e237043f566188"
    }
  ]
}`}
</code></pre>

<pre><code>
POST http://localhost:5173/api/venues

BODY
| key             | val                                                                          |
| --------------- | ---------------------------------------------------------------------------- |
| id              | uri:uuid:123                                                                 |
| vox:fsq_id :    | https://api.foursquare.com/v3/places/4c81bf19d4e237043f566188                |
| vox:description | Authentic hand-pulled noodles on one of Portland's most neglected corridors. |
</code></pre>


<h3><code>/api/venues/[id]</code></h3>

<pre><code>
GET http://localhost:5173/api/venues/uri:uuid:123

{@html `{
  "venue": {
    "id": "uri:uuid:123",
    "type": "vox:Venue",
    "description": "Authentic hand-pulled noodles on one of Portland's most neglected corridors.",
    "fsq_id": "https://api.foursquare.com/v3/places/4c81bf19d4e237043f566188",
    "map": "uri:uuid:dumplingsmap",
    "point": "uri:uuid:point123"
  }
}`}
</code></pre>

<h3><code>/api/points</code></h3>

<pre><code>
GET http://localhost:5173/api/points

{@html `{
  "points": [
    {
      "id": "uri:uuid:point123",
      "type": "vox:Point",
      "description": "Dont' be fooled by the name, Frank's also has killer dumplings.",
      "map": "uri:uuid:dumplingsmap",
      "venue": "uri:uuid:123",
      "venueDescription": "Authentic hand-pulled noodles on one of Portland's most neglected corridors."
    }
  ]
}`}
</code></pre>

<pre><code>
POST http://localhost:5173/api/points

BODY
| key             | val                                                             |
| --------------- | --------------------------------------------------------------- |
| id              | uri:uuid:point123                                               |
| vox:venue :     | uri:uuid:123                                                    |
| vox:description | Dont' be fooled by the name, Frank's also has killer dumplings. |
| vox:map :       | uri:uuid:dumplingsmap                                           |
</code></pre>

<h3><code>/api/points/[id]</code></h3>

<pre><code>
GET http://localhost:5173/api/points/uri:uuid:point123

{@html `{
  "point": {
    "name": "Frank's Noodle House",
    "address": "822 NE Broadway St (at NE 8th Ave), Portland, OR 97232",
    "longitude": -122.657132,
    "latitude": 45.534959,
    "tel": "(503) 288-1007",
    "website": "http://www.franksnoodlehousepdx.com",
    "id": "uri:uuid:point123",
    "type": "vox:Point",
    "description": "Dont' be fooled by the name, Frank's also has killer dumplings.",
    "fsq_id": "https://api.foursquare.com/v3/places/4c81bf19d4e237043f566188",
    "map": "uri:uuid:dumplingsmap",
    "venue": "uri:uuid:123"
  }
}`}
</code></pre>

<h3><code>/api/maps</code></h3>

<pre><code>
GET http://localhost:5173/api/maps
{@html `{
  "maps": [
    {
      "id": "uri:uuid:dumplingsmap",
      "type": "vox:Map",
      "point": "uri:uuid:point123"
    }
  ]
}`}
</code></pre>

<h3><code>/api/maps/[id]</code></h3>

<pre><code>
GET http://localhost:5173/api/maps/uri:uuid:dumplingsmap
{@html `{
  "map": {
    "id": "uri:uuid:dumplingsmap",
    "type": "vox:Map",
    "point": "uri:uuid:point123"
  }
}`}
</code></pre>

<!-- <CreateResource /> -->