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
import { ProfileComponent } from './profile/profile.component';
import { ProfileAccountComponent } from './profile-account/profile-account.component';
import { ProfilePasswordComponent } from './profile-password/profile-password.component';
import { ProfileEmailComponent } from './profile-email/profile-email.component';
import {EqualValidator} from "./directives/equal-validator.directive";
import { UserComponent } from './user/user.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { UserTripsComponent } from './user-trips/user-trips.component';
import { UserAlbumsComponent } from './user-albums/user-albums.component';
import {CarouselComponent} from "./carousel/carousel.component";
import { ProfilePhotosComponent } from './profile-photos/profile-photos.component';
import { HomeTripsComponent } from './home-trips/home-trips.component';
import { TripsComponent } from './trips/trips.component';
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

import { DatepickerModule } from 'ng2-bootstrap/datepicker';
import { ModalModule } from 'ng2-bootstrap/modal';
import {DatepickerComponent} from "./trip-planning/datepicker/datepicker.component";

const tripRoutes: Routes = [
  { path: '', component: TripInfoFieldComponent},
  { path: 'trip-info', component: TripInfoFieldComponent},
  { path: 'day/:id', component: TripDayFieldComponent}
];

const profileRoutes: Routes = [
  { path: 'account', component: ProfileAccountComponent},
  { path: 'password', component: ProfilePasswordComponent},
  { path: 'email', component: ProfileEmailComponent},
];

const userRoutes: Routes = [
  { path: 'user-account', component: UserAccountComponent},
  { path: 'user-trips', component: UserTripsComponent},
  { path: 'user-albums', component: UserAlbumsComponent},
];

const appRoutes: Routes =[
  { path: '', component: HomeComponent},
  { path: 'trip-planning', component: TripPlanningComponent, children: tripRoutes },
  { path: 'registered', component: RegisteredComponent},
  { path: 'login', component: SignInComponent},
  { path: 'profile/:id', component: ProfileComponent},
  { path: 'profile/:id', component: ProfileComponent, children: profileRoutes},
  { path: 'user/:id', component: UserComponent},
  { path: 'user/:id', component: UserComponent,children:userRoutes},
  { path: 'album/:id', component: ProfilePhotosComponent},
  { path: 'trips/:id', component: TripsComponent},
  { path: '**', component: NotFoundComponent }
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
    BusDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    DatepickerModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
