
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { client } from './service/client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MobiliaColory';
  sizeDiv = "col-sm-8"; // size map
  constructor(private router: Router,private client:client) {
    this.client.getIsAuth().subscribe((value)=>{
      console.log('is connecter : ',value);
    });
    this.router.events
    .subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log('NavigationEnd:', event['url']);
        switch(event['url']){
        case "/Ajout" :
          this.sizeDiv = "col-sm-5" ;
        break;
        case "/connection"  :
          this.sizeDiv = "col-sm-8" ;
        break;
        case  "/insciption" :
          this.sizeDiv = "col-sm-8" ;
        break;
        default: 
        this.sizeDiv = "col-sm-4"; 
        }
        
        
      }
    });
    
  }
}
