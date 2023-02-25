import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private searchKey = new BehaviorSubject('');
  searchKeyOberserver = this.searchKey.asObservable()
  constructor(private http: HttpClient) { }

  search(str: string){
    this.searchKey.next(str)
  }
  getGeoCodeData(cityName: string) {
   return this.http.get(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`);
    // return this.http.get(`https://geocoding-api.open-meteo.com/v1/search?name=Jaipur`);

  }

  getWeatherInfo(latitude: any, longitude: any){
    return this.http.get(`https://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=astro&output=json`);
  }

  getWeatherImage(latitude: any, longitude:any): Observable<Blob> {
    return this.http.get(`https://www.7timer.info/bin/civil.php?lon=${longitude}&lat=${latitude}&ac=0&lang=en&unit=metric&output=internal&tzshift=0`,
     { responseType: 'blob' });
    // let img = this.http.get(`https://www.7timer.info/bin/civil.php?ac=0&lang=en&unit=metric&tzshift=0&lon=75.78781&lat=26.91962`, { responseType: 'blob' })

    // return img;
     }

    
     getDadJokes(): Observable<any> {
      const headers = new HttpHeaders({
        'Accept': 'application/json',
      });
      console.log( this.http.get(`https://icanhazdadjoke.com/`,{ headers }));

      return this.http.get(`https://icanhazdadjoke.com/`,{ headers });
    }

   
  }