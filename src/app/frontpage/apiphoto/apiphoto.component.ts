import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from 'src/app/dataservice';

@Component({
  selector: 'app-apiphoto',
  templateUrl: './apiphoto.component.html',
  styleUrls: ['./apiphoto.component.css']
})
export class ApiphotoComponent {
  selectedValue!: string;


  constructor(private dataService: DataService,
    private sanitizer: DomSanitizer,
) { }
  
    callApis(city: any){
      // this.frontpage.onCall(city);
      this.dataService.search(city);
      console.log("selectedValue "+this.selectedValue);
      this.dataService.apiSelect(this.selectedValue);
    }
}
