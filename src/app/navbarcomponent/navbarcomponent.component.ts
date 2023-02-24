import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
// import{ Constants } from './config/constants'; 
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from '../dataservice';
import { FrontpageComponent } from '../frontpage/frontpage.component'


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-navbarcomponent',
  templateUrl: './navbarcomponent.component.html',
  styleUrls: ['./navbarcomponent.component.css'],
  providers: [FrontpageComponent],
})
export class NavbarcomponentComponent {

  constructor(private dataService: DataService,
    private sanitizer: DomSanitizer,
) { }
  
    callApis(city: any){
      // this.frontpage.onCall(city);
      this.dataService.search(city)
    }
}
