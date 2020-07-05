import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { client } from '../service/client.service';
import { Vendeur } from '../model/vendeur.model';

@Component({
  selector: 'app-promo-ventes',
  templateUrl: './promo-ventes.component.html',
  styleUrls: ['./promo-ventes.component.scss']
})
export class PromoVentesComponent implements OnInit {

  constructor(private router: Router,private Client: client) {

   }
   vendeur:Vendeur;
  ngOnInit(): void {
    this.Client.gteVendeur().subscribe((value) => {
      this.vendeur = value;
    });
  }

  clickChoix(val){
  var form = new FormData ;
  form.append('id',this.vendeur.idVendeur.toString());
  console.log(this.vendeur.id.toString());
    switch(val){
      case 2 : 
      form.append('Promo','1');
      this.Client.setPromo(form).subscribe((value) => {
        if(value == '201'){
         this.router.navigate(['']);
        }
     });
      break;
      case 3 :
      form.append('Promo','2');
      this.Client.setPromo(form).subscribe((value) => {
        if(value == '201'){
         this.router.navigate(['']);
        }
     });
      break;
      default :
      this.router.navigate(['']);
    }
  }
}
