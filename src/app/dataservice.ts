import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getGeoCodeData(cityName: string) {
   return this.http.get(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`);
    // return this.http.get(`https://geocoding-api.open-meteo.com/v1/search?name=Jaipur`);

  }

  getWeatherInfo(latitude: any, longitude: any){
    return this.http.get(`http://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=astro&output=json`);
  }
}