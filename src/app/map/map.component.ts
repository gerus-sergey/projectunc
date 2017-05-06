import { Component} from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']

})
export class MapComponent {
  constructor(private localStorageService: LocalStorageService){}
  name:string;

  addSight(){
    console.log("sd");
  }

  ngOnInit() {
    var sight: any;
    var map = new google.maps.Map(document.getElementById('googleMap'), {
      center: {lat: 51.6754966, lng: 39.20888230000003},
      zoom: 11,
      mapTypeId: 'roadmap'
    });

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    
    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }

        sight = place;

        // Create a marker for each place.
        var marker = new google.maps.Marker({
          map: map,
          title: place.name,
          position: place.geometry.location
        })

        var infowindow = new google.maps.InfoWindow();
        var ad = sight.name;
        var content = '<div><strong>' +
          place.name +
          '</strong><br>' +
          place.formatted_address + '<br>' +
          '<input type="button" value="Add sight" onclick="addSight()"></div>'
        
        alert(sight.name);
        alert(sight.geometry.location);
        
        infowindow.setContent(content);
        infowindow.open(map, marker);
        markers.push(marker);
        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  }
}
