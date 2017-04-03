import { Component, OnInit } from '@angular/core';

export class Place{
  constructor(public country: string,
              public state: string,
              public city: string,
              public sight: string)
  { }
}

@Component({
  selector: 'app-sights',
  templateUrl: './sights.component.html',
  styleUrls: ['./sights.component.css']
})
export class SightsComponent implements OnInit {

  place: Place = new Place("Country", "State", "City", "Sight");
  places: Place[] = [];
  countries: string[] = ["Russia", "Italy", "Germany", "Spain", "France", "Canada", "USA"];
  states: string[] = ["1", "2", "3", "4", "5", "6", "7"];
  cities: string[] = ["Moscow", "Roma", "Berlin", "Madrid", "Paris", "Ottawa", "Washington"];
  sights: string[] = ["1", "2", "3", "4", "5", "6", "7"];
  addPlace(){
    this.places.push(new Place(this.place.country, this.place.state, this.place.city, this.place.sight));
  }

  ngOnInit() {
  }

}
