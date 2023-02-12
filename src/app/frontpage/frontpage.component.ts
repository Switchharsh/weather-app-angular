import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
// import{ Constants } from './config/constants'; 
import { Injectable } from '@angular/core';
import { DataService } from '../dataservice';


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent {

  constructor(private dataService: DataService) { }
  dataGeoCode: any; dataWeatherCode: any;

  cityName: any; Lat: any = 0; Lon: any; countryName: any;

  dataFlag = false; weatherFlag: boolean = false;

  tempRN: any;

  onCall(cityName: string) {
    console.log('hereh');
    this.dataService.getGeoCodeData(cityName).subscribe(data => {
      this.dataFlag = true;
      this.dataGeoCode = data;
      console.log(this.dataGeoCode.results[0].name);
      this.cityName = this.dataGeoCode.results[0].name;
      this.countryName = this.dataGeoCode.results[0].country;
      this.Lat = this.dataGeoCode.results[0].latitude;
      this.Lon = this.dataGeoCode.results[0].longitude;
      this.weatherInfoCall(this.Lat,this.Lon);
    });
  }
  weatherInfoCall(latitude: any,longitude: any) {
    console.log('Lat' ,this.Lat);
    if (this.Lat != 0) {
      this.dataService.getWeatherInfo(this.Lat, this.Lon).subscribe(data => {
        this.weatherFlag = true;
        this.dataWeatherCode = data;
        console.log(this.dataWeatherCode);
        this.tempRN = this.dataWeatherCode.dataseries[0].temp2m;
        console.log(this.tempRN);
      })
    }
  }
}
