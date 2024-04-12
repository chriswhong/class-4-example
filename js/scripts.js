
// instantiate the map
mapboxgl.accessToken = 'pk.eyJ1IjoiY3dob25nIiwiYSI6IjAyYzIwYTJjYTVhMzUxZTVkMzdmYTQ2YzBmMTM0ZDAyIn0.owNd_Qa7Sw2neNJbK6zc1A';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-73.99579, 40.69942],
    zoom: 15.64
});

// a rough polygon of NY state border, hand-drawn in geojson.io
var dummyPolygonGeojson = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "coordinates": [
                    [
                        [
                            -73.29228495508514,
                            45.02822319122947
                        ],
                        [
                            -74.87017016472582,
                            45.031175954816334
                        ],
                        [
                            -75.49479423639039,
                            44.70514327362806
                        ],
                        [
                            -76.7956233365435,
                            43.66562560626828
                        ],
                        [
                            -78.71296833816652,
                            43.65207338648987
                        ],
                        [
                            -79.10125617106235,
                            43.37428660374522
                        ],
                        [
                            -79.07425801731928,
                            43.16547924354467
                        ],
                        [
                            -78.81284412547222,
                            42.92245785671531
                        ],
                        [
                            -79.79840849894245,
                            42.47820659442209
                        ],
                        [
                            -79.77587838805854,
                            42.00594633777271
                        ],
                        [
                            -75.36567472786035,
                            42.02486311571934
                        ],
                        [
                            -75.05417102514392,
                            41.74556110855346
                        ],
                        [
                            -75.04102410000004,
                            41.522131587675034
                        ],
                        [
                            -74.7109763069367,
                            41.39816240033426
                        ],
                        [
                            -73.9883804362436,
                            40.94601087702034
                        ],
                        [
                            -74.24266429886984,
                            40.581532646751384
                        ],
                        [
                            -73.99929133898698,
                            40.574981352523935
                        ],
                        [
                            -73.05122929910274,
                            40.68961081241295
                        ],
                        [
                            -71.88265244342685,
                            41.05073616239193
                        ],
                        [
                            -72.63748041147247,
                            40.88575797534409
                        ],
                        [
                            -72.55798042528703,
                            41.068407921647974
                        ],
                        [
                            -73.62015541939502,
                            40.9616710638432
                        ],
                        [
                            -73.72116985627268,
                            41.08388591005817
                        ],
                        [
                            -73.54088839256703,
                            41.21056910228597
                        ],
                        [
                            -73.52601926111186,
                            42.026980906154535
                        ],
                        [
                            -73.25732548460525,
                            42.793481039612175
                        ],
                        [
                            -73.39273296888709,
                            43.66252168279368
                        ],
                        [
                            -73.29228495508514,
                            45.02822319122947
                        ]
                    ]
                ],
                "type": "Polygon"
            }
        }
    ]
}

// add a navigation control
map.addControl(new mapboxgl.NavigationControl());

// wait! don't execute this code until the map is finished it's initial load
map.on('load', () => {

    // add a geojson source for the dummy data
    map.addSource('dummyPolygon', {
        "type": "geojson",
        "data": dummyPolygonGeojson
    })

    // add a fill layer using this dummy data
    map.addLayer({
        'id': 'dummyPolygon-fill',
        'type': 'fill',
        'source': 'dummyPolygon',
        'layout': {},
        'paint': {
            'fill-color': '#ccc',
            'fill-opacity': 0.7
        }
    }, 'path-pedestrian-label');

    // add a line layer using this dummy data
    map.addLayer({
        'id': 'dummyPolygon-line',
        'type': 'line',
        'source': 'dummyPolygon',
        'layout': {},
        'paint': {
            'line-color': 'steelblue',
            'line-width': 6,
            'line-dasharray': [2, 2]
        }
    }, 'path-pedestrian-label');

    // list all the layers on the map in the console
    console.log(
        map.getStyle().layers
    )


    // add the PLUTO data we filtered in QGIS
    map.addSource('brooklyn-heights-ish', {
        "type": "geojson",
        "data": "data/brooklyn-heights-ish.geojson"
    })

    // add a line layer using the PLUTO data
    map.addLayer({
        'id': 'brooklyn-heights-ish-line',
        'type': 'line',
        'source': 'brooklyn-heights-ish',
        'layout': {},
        'paint': {
            'line-color': '#000',
            'line-width': 2.5
        }
    }, 'path-pedestrian-label');

  // add a fill layer using the PLUTO data
    map.addLayer({
        'id': 'brooklyn-heights-ish-fill',
        'type': 'fill',
        'source': 'brooklyn-heights-ish',
        'layout': {},
        'paint': {
            'fill-color': [ // use an expression for data-driven styling
                'interpolate',
                ['linear'],
                ['get', "UnitsRes"],
                0,
                '#ece7f2',
                4,
                '#a6bddb',
                10,
                '#2b8cbe'


            ],
            'fill-opacity': 0.7
        }
    }, 'path-pedestrian-label');

})