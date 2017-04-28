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
import {TripDayFieldComponent} from "./trip-planning/trip-day-field/trip-day-field.component";
import {TripInfoFieldComponent} from "./trip-planning/trip-info-field/trip-info-field.component";
import {DialogComponent} from "./trip-planning/dialog/dialog.component";
import {TripPlanningComponent} from "./trip-planning/trip-planning.component";
import { TransportationComponent } from './trip-planning/transportation/transportation.component';
import { DatepickerModule } from 'ng2-bootstrap/datepicker';
import { ModalModule } from 'ng2-bootstrap/modal';
import {DatepickerComponent} from "./trip-planning/datepicker/datepicker.component";
import { ChatComponent } from './chat/chat.component';
import {MomentModule} from 'angular2-moment';
import {UserAccountComponent} from "./user/user-account/user-account.component";
import {UserAlbumsComponent} from "./user/user-albums/user-albums.component";
import {UserTripsComponent} from "./user/user-trips/user-trips.component";
import { AccountComponent } from './account/account.component';
import {ProfilePhotosComponent} from "./account/profile-photos/profile-photos.component";
import {TripsComponent} from "./account/trips/trips.component";
import {ProfileAccountComponent} from "./account/profile/profile-account/profile-account.component";
import {ProfilePasswordComponent} from "./account/profile/profile-password/profile-password.component";
import {ProfileEmailComponent} from "./account/profile/profile-email/profile-email.component";
import {ProfileComponent} from "./account/profile/profile.component";

import { LocalStorageModule } from 'angular-2-local-storage';
import {MainGuard} from "./guards/main.guard";
import {LoginGuard} from "./guards/login.guard";
import { MapComponent } from './map/map.component';


const userRoutes: Routes = [
  { path: 'user-account', component: UserAccountComponent},
  { path: 'user-trips', component: UserTripsComponent},
  { path: 'user-albums', component: UserAlbumsComponent},
];

const transportRoutes: Routes = [
  { path: 'flight', component: FlightDialogComponent},
  { path: 'rail', component: RailDialogComponent},
  { path: 'bus', component: BusDialogComponent},
  { path: 'car', component: CarDialogComponent}
];

const eventRoutes: Routes = [
  { path: 'transport', component: TransportationComponent, children: transportRoutes},
  { path: 'lodging', component: LodgingComponent},
  { path: 'sights', component: SightsComponent},
];

const tripRoutes: Routes = [
  { path: '', component: TripInfoFieldComponent},
  { path: 'trip-info', component: TripInfoFieldComponent},
  { path: 'day/:id', component: TripDayFieldComponent, children: eventRoutes}
];


const tripPlaningRoutes: Routes = [
  { path: 'trip-planning/:id', component: TripPlanningComponent, children: tripRoutes },
];

const profileRoutes: Routes = [
  { path: 'account', component: ProfileAccountComponent},
  { path: 'password', component: ProfilePasswordComponent},
  { path: 'email', component: ProfileEmailComponent}
];

const accountRoutes: Routes = [
  { path: 'profile', component: ProfileComponent, children: profileRoutes, canActivate: [MainGuard, LoginGuard]},
  { path: 'trips', component: TripsComponent, children: tripPlaningRoutes, canActivate: [MainGuard, LoginGuard]},
  { path: 'album', component: ProfilePhotosComponent, canActivate: [MainGuard, LoginGuard]}
];

const appRoutes: Routes =[
  { path: '', component: HomeComponent},
  { path: 'account/:id', component: AccountComponent, children: accountRoutes},
  { path: 'registered', component: RegisteredComponent},
  { path: 'map', component: MapComponent},
  { path: 'login', component: SignInComponent},
  { path: 'user/:id', component: UserComponent,children:userRoutes},
  { path: '**', component: NotFoundComponent },

];

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
    ProfileAccountComponent,
    ProfilePasswordComponent,
    ProfileEmailComponent,
    UserComponent,
    UserAccountComponent,
    UserTripsComponent,
    UserAlbumsComponent,
    CarouselComponent,
    ProfilePhotosComponent,
    HomeTripsComponent,
    TripsComponent,
    TripPlanningComponent,
    DialogComponent,
    TripInfoFieldComponent,
    TripDayFieldComponent,
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
    MapComponent
  ],
  imports: [
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
    })
  ],
  providers: [MainGuard, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

