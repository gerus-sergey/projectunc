import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { RegisteredComponent } from './registered/registered.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {Routes, RouterModule} from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';

import {EqualValidator} from "./directives/equal-validator.directive";
import { UserComponent } from './user/user.component';
import {CarouselComponent} from "./home/carousel/carousel.component";
import { HomeTripsComponent } from './home/home-trips/home-trips.component';
import {BusDialogComponent} from "./trip-planning/bus-dialog/bus-dialog.component";
import {CarDialogComponent} from "./trip-planning/car-dialog/car-dialog.component";
import {RailDialogComponent} from "./trip-planning/rail-dialog/rail-dialog.component";
import {FlightDialogComponent} from "./trip-planning/flight-dialog/flight-dialog.component";
import {LodgingComponent} from "./trip-planning/lodging-dialog/lodging.component";
import {SightsComponent} from "./trip-planning/sights-dialog/sights.component";
import {DialogComponent} from "./trip-planning/dialog/dialog.component";
import {TripPlanningComponent} from "./trip-planning/trip-planning.component";
import { TransportationComponent } from './trip-planning/transportation/transportation.component';

import { ModalModule } from 'ng2-bootstrap/modal';
import {DatepickerComponent} from "./trip-planning/datepicker/datepicker.component";
import { ChatComponent } from './chat/chat.component';
import {MomentModule} from 'angular2-moment';
import { AccountComponent } from './account/account.component';
import {ProfilePhotosComponent} from "./account/profile-photos/profile-photos.component";
import {TripsComponent} from "./account/trips/trips.component";
import {ProfileComponent} from "./account/profile/profile.component";

import { LocalStorageModule } from 'angular-2-local-storage';
import {MainGuard} from "./guards/main.guard";
import {LoginGuard} from "./guards/login.guard";
import { MapComponent } from './map/map.component';
import { MessagesComponent } from './messages/messages.component';
import {TripService} from "./services/trip.service";
import {ParticipantsComponent} from "./trip-planning/participants/participants.component";
import { CreatedTripComponent } from './created-trip/created-trip.component';
import { Ng2SearchPipe } from 'ng2-search-filter';
import { FacebookModule } from 'ngx-facebook';
import { Angular2SocialLoginModule } from 'angular2-social-login';
import {HttpService} from "./services/http.service";
import {DatepickerModule} from 'ng2-bootstrap';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
const transportRoutes: Routes = [
  { path: 'flight', component: FlightDialogComponent},
  { path: 'rail', component: RailDialogComponent},
  { path: 'bus', component: BusDialogComponent},
  { path: 'car', component: CarDialogComponent}
];

const tripRoutes: Routes = [
  { path: 'participants', component: ParticipantsComponent},
  { path: 'transport', component: TransportationComponent, children: transportRoutes},
  { path: 'lodging', component: LodgingComponent},
  { path: 'sights', component: SightsComponent},
];

const accountRoutes: Routes = [
  { path: 'profile', component: ProfileComponent, canActivate: [MainGuard, LoginGuard]},
  { path: 'trips', component: TripsComponent, canActivate: [MainGuard, LoginGuard]},
  { path: 'album', component: ProfilePhotosComponent, canActivate: [MainGuard, LoginGuard]}
];

const appRoutes: Routes =[
  { path: '', component: HomeComponent},
  { path: 'account/:id', component: AccountComponent, children: accountRoutes},
  { path: 'registered', component: RegisteredComponent},
  { path: 'trip-planning/:id', component: TripPlanningComponent, children: tripRoutes },
  { path: 'map', component: MapComponent},
  { path: 'login', component: SignInComponent},
  { path: 'user/:id', component: UserComponent},
  { path: '**', component: NotFoundComponent },
];

let providers = {
  'facebook': {'clientId': '1455074181180837',
    'apiVersion': 'v2.9'}
};

@NgModule({
  declarations: [
    AppComponent,
    RegisteredComponent,
    EqualValidator,
    SidebarComponent,
    HomeComponent,
    NotFoundComponent,
    SignInComponent,
    ProfileComponent,
    UserComponent,
    CarouselComponent,
    ProfilePhotosComponent,
    HomeTripsComponent,
    TripsComponent,
    TripPlanningComponent,
    DialogComponent,
    SightsComponent,
    LodgingComponent,
    DatepickerComponent,
    FlightDialogComponent,
    RailDialogComponent,
    CarDialogComponent,
    BusDialogComponent,
    TransportationComponent,
    ChatComponent,
    AccountComponent,
    MapComponent,
    MessagesComponent,
    ParticipantsComponent,
    CreatedTripComponent
    // ,
    // Ng2SearchPipe

  ],
  imports: [
    NKDatetimeModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    DatepickerModule.forRoot(),
    ModalModule.forRoot(),
    MomentModule,
    LocalStorageModule.withConfig({
      prefix: 'app-root',
      //  storageType: 'localStorage'
      storageType: 'sessionStorage'
    }),
    FacebookModule.forRoot(),
    Angular2SocialLoginModule
  ],
  providers: [MainGuard, LoginGuard,TripService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }

