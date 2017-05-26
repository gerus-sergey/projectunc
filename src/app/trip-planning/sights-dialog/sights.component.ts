import {Component, OnInit} from '@angular/core';
import {Sight} from "../../models/sight";
import {Subject} from "rxjs/Subject";
import {TripService} from "../../services/trip.service";
import {Activities} from "../../models/activities.interface";
import {ActivityType} from "../../models/activityType.interface";
import {Coordinates} from "../../models/coordinates.interface";

declare var google:any;

@Component({
    selector: 'app-sights',
    templateUrl: './sights.component.html',
    styleUrls: ['./sights.component.css']
})
export class SightsComponent implements OnInit {
    
    //sights: Sight[] = [];
    constructor(private tripService:TripService) {
        // this.sights.push(new Sight("name", "location"));
        // this.sight$.subscribe(
        //     sight => {
        //         this.sights.push(sight);
        //         console.log(this.sights);
        //     });
    }


    ngOnInit() {
        var $this = this;
        var sight:any;
        setTimeout(() => {
            var map = new google.maps.Map(document.getElementById('googleMap'),
                {
                    center: {lat: 51.6754966, lng: 39.20888230000003},
                    zoom: 11,
                    mapTypeId: 'roadmap'
                });


            // Create the search box and link it to the UI element.
            var input = document.getElementById('pac-input');
            var searchBox = new google.maps.places.SearchBox(input);
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

            // Bias the SearchBox results towards current map's viewport.
            map.addListener('bounds_changed', function () {
                searchBox.setBounds(map.getBounds());
            });


            var markers = [];
            // Listen for the event fired when the user selects a prediction and retrieve
            // more details for that place.
            searchBox.addListener('places_changed', function () {
                var places = searchBox.getPlaces();

                if (places.length == 0) {
                    return;
                }

                // Clear out the old markers.
                markers.forEach(function (marker) {
                    marker.setMap(null);
                });
                markers = [];

                // For each place, get the icon, name and location.
                var bounds = new google.maps.LatLngBounds();
                places.forEach(function (place) {
                    if (!place.geometry) {
                        console.log("Returned place contains no geometry");
                        return;
                    }

                    sight = place;

                    // Create a marker for each place.
                    var marker = new google.maps.Marker({
                        map: map,
                        title: place.name,
                        position:place.geometry.location
                    });

                    var infowindow = new google.maps.InfoWindow();

                    window['addSight'] = ()=> {
                        var date = new Date((<HTMLInputElement>document.getElementById("date")).value);
                        var coord = sight.geometry.location.toString();
                        var b = coord.substring(2, coord.length-1).split(',');
                        $this.tripService.setActivitySubject(new Activities(null, null, sight.name, sight.formatted_address, null, null, null,
                            new Coordinates("point", b[0] , b[1]), date, new Date(), new ActivityType(2 ,'sight')));
                    };

                    var content =
                        '<div style="height:100px">' +
                            '<strong>' + place.name + '</strong><br />' +
                            place.formatted_address + '<br >' +
                        '<div style="margin-top: 10px"><strong>Start time: </strong>' + '<input style="height: 20px" id="date" type="datetime-local"></div> '+ '<br >' +
                            '<input type="button" value="Add sight" onclick=addSight()>' +
                        '</div>';


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
        });
    }
}
