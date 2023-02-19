import { Component, OnInit, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
// import{ Constants } from './config/constants'; 
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from '../dataservice';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {
  private data = new Subject<any>();

  constructor(private dataService: DataService,
    private sanitizer: DomSanitizer) { }
    ngOnInit(){
    }
    // ngOnChanges(){
    //   this.onChangesFlag;

    // }
  //data from the APIs coming or not
  dataGeoCode: any; dataWeatherCode: any; dataWeatherImageCode: any;

  // data of the geocoding api
  cityName: any; Lat: any = 0; Lon: any; countryName: any;

  //flags for the 2 apis for using in *ngIf
  dataFlag = false; weatherFlag: boolean = false; weatherImageFlag: boolean = false;
  // onChangesFlag = false;

  tempRN: any;

  onCall(cityName: string) {
    // setting the flags to false to remove old data
    this.dataFlag = false;
    this.weatherFlag = false;
    this.weatherImageFlag = false;
    // this.onChangesFlag = true;

    //hardcoding cityName for developing time saving
    // cityName = "Jaipur";

    // console.log('hereh');
    this.dataService.getGeoCodeData(cityName).subscribe(data => {
      this.dataFlag = true;
      this.dataGeoCode = data;
      // console.log(this.dataGeoCode.results[0].name);
      this.cityName = this.dataGeoCode.results[0].name;
      this.countryName = this.dataGeoCode.results[0].country;
      this.Lat = this.dataGeoCode.results[0].latitude;
      this.Lon = this.dataGeoCode.results[0].longitude;
      this.weatherInfoCall(this.Lat, this.Lon);
      console.log("calling image api");
      this.weatherImageCall(this.Lat, this.Lon);
    });
  }

  weatherInfoCall(_latitude: any, _longitude: any) {
    // console.log('Lat', this.Lat);
    if (this.Lat != 0) {
      this.dataService.getWeatherInfo(this.Lat, this.Lon).subscribe(data => {
        this.weatherFlag = true;
        this.dataWeatherCode = data;
        console.log(this.dataWeatherCode);
        this.tempRN = this.dataWeatherCode.dataseries[0].temp2m;
        // console.log(this.tempRN);
      })
    }
  }

  weatherImageCall(_latitude: any, _longitude: any) {
    console.log("image api initiating")
    // if(this.lL)
    if (this.Lat != 0) {
      this.dataService.getWeatherImage(this.Lat, this.Lon).subscribe(data => {
        this.weatherImageFlag = true;

        this.createImageFromBlob(data);

        // console.log("weather image api" + this.dataWeatherCode);
      })
    }
  }

  imageToShow: any;

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

}

