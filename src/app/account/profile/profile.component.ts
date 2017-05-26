import {Component, OnInit, OnDestroy, ElementRef} from '@angular/core';
import {Subscription} from "rxjs/Rx";
import {ActivatedRoute} from "@angular/router";
import {Response, Headers} from "@angular/http";
import {User} from "../../models/user.interface";
import {HttpService} from "../../services/http.service";
import {Http} from "@angular/http";
import {Country} from "../../models/country.interface";
import {State} from "../../models/state.interface";
import {City} from "../../models/city.interface";
import {Gender} from "../../models/gender.interface";
import {UserNewPassword} from "../../models/user-newpassword.interface";
const URL = 'http://localhost:8181/fileUploadPage';

export class newEmail{
    email:string;
}

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    providers: [HttpService]
})



export class ProfileComponent implements OnInit,OnDestroy {

    public userProfile:User;
    private routeSubscription:Subscription;
    updateProfile:User;
    listCities:Country[] = [];
    listStateOfTheCountry:State[] = [];
    listCityesOfTheState:City[] = [];
    private sub:any;
    public id:number;
    private pathToPhoto:string;
    public userPassword:UserNewPassword;
    confPass:boolean = false;
    newEmail:newEmail;
    constructor(private route:ActivatedRoute, private httpService:HttpService, private http:Http, private el:ElementRef) {

    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    ngOnInit() {
        this.newEmail = {
            email:''
        }
        this.userPassword = {
            oldPassword: '',
            password: '',
            confirmPassword: ''
        };

        this.httpService.getUser(this.route.parent.snapshot.params["id"])
            .subscribe((resp:Response) => {
                let user = resp.json();
                if (user)
                    this.userProfile = user;
                this.pathToPhoto = this.userProfile.userPhoto;


            });

        this.sub = this.route.parent.params.subscribe(params => {
            this.id = +params["id"];

        });

        this.httpService.getCountries()
            .subscribe((resp:Response) => {
                let cityList = resp.json();
                for (let index in cityList) {
                    let city = cityList[index];
                    this.listCities.push(city);
                }
                //console.log(this.listCities);
            });
    }

    setCountryId(idCountry:string) {
        console.log(idCountry);
        this.listStateOfTheCountry = [];
        this.listCityesOfTheState = [];
        this.httpService.getStatesOfTheCountry(idCountry)
            .subscribe((resp:Response) => {
                let stateList = resp.json();
                for (let index in stateList) {
                    let state = stateList[index];
                    this.listStateOfTheCountry.push(state);
                }
                //console.log(this.listCities);
            });
    }


    setStateId(idState:string) {
        console.log(idState);
        this.listCityesOfTheState = [];
        this.httpService.getCitiesOfTheState(idState)
            .subscribe((resp:Response) => {
                let citiesList = resp.json();
                for (let index in citiesList) {
                    let city = citiesList[index];
                    this.listCityesOfTheState.push(city);
                }
                // console.log(this.listCities);
            });
    }

    updateUser(model:User, isValid:boolean) {
        console.log(model);
        if (isValid) {
            if (isNaN(parseInt(model.city.toString()))) {
                this.updateProfile = new User(this.userProfile.id, model.lastName, model.firstName, model.birthday,
                    this.userProfile.email, this.userProfile.password, new Gender(model.gender, ""), this.userProfile.city, model.info, null);
                console.log(this.updateProfile);
            } else {
                this.updateProfile = new User(this.userProfile.id, model.lastName, model.firstName, model.birthday,
                    this.userProfile.email, this.userProfile.password, new Gender(model.gender, ""), new City(model.city.toString(), ""), model.info, null);
                console.log(this.updateProfile);
            }

            this.httpService.updateUser(this.updateProfile)
                .subscribe((data) => {
                    console.log(data);
                    // this.userProfile = data;
                });
        }
    }

    updatePassword(model:UserNewPassword, isValid:boolean) {
        console.log(this.userProfile.password);
        if(isValid){
            if(model.oldPassword != this.userProfile.password){
                this.confPass = true
            }else{
                this.userProfile.password = model.password;
                this.httpService.updateUser(this.userProfile)
                    .subscribe((data) => {
                        console.log(data);
                         this.userProfile = data;
                    });
            }
        }
    }
        // updateEmail(model:newEmail, isValid:boolean){
        //
        // }

    upload() {
        // var csrf_token = jQuery("meta[name='_csrf']").attr("content");
        // var csrf_token_name = jQuery("meta[name='_csrf_header']").attr("content");
        // //noinspection TypeScriptValidateTypes
        // let headers = new Headers({
        //   'Content-Type': 'application/json;charset=utf-8'
        // });
        // if (csrf_token_name && csrf_token)
        //   headers.set(csrf_token_name, csrf_token);

        //locate the file element meant for the file upload.
        let inputEl:HTMLInputElement = this.el.nativeElement.querySelector('#photo');
        //get the total amount of files attached to the file input.
        let fileCount:number = inputEl.files.length;
        //create a new fromdata instance
        let formData = new FormData();
        //check if the filecount is greater than zero, to be sure a file was selected.
        if (fileCount > 0) { // a file was selected
            //append the key name 'photo' with the first file in the element
            formData.append('file', inputEl.files.item(0));
            //call the angular http method
            console.log();
            this.http
            //post the form data to the url defined above and map the response. Then subscribe //to initiate the post. if you don't subscribe, angular wont post.
                .post(URL, formData)
                .map((res:Response) => res.json()).subscribe((data) => {
                this.pathToPhoto = data;
                console.log(this.pathToPhoto);
                this.userProfile.userPhoto = data;
                this.httpService.addUser(this.userProfile).subscribe((data) => {
                    this.userProfile = data;
                });
            })
        }
    }
}
