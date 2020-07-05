import { Component, OnInit, SimpleChanges } from '@angular/core';
import { client } from '../service/client.service';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { annonce } from '../model/annonce.model';
import { annonces } from '../service/annonces.service';
import { Vendeur } from '../model/vendeur.model';
@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.scss']
})
export class AcceuilComponent implements OnInit {
  isAuth = false ; 
  user:User;
  typecompte:number;
  vendeur:Vendeur;
  vendeurType:number=0;
  constructor(private client : client,private router:Router) {
     this.vendeur = new Vendeur();
    this.client.getIsAuth().subscribe((value) => {
      console.log(value);
      this.isAuth = value;
    });
      this.client.getCompte().subscribe((value)=>{
        this.typecompte = value ;
      });
      this.client.getUser().subscribe((value) => {
        this.user = value;
        console.log(value);
      });
      this.client.gteVendeur().subscribe((value) => {
        if(value != null){
          this.vendeur = value;
        }
      });
  }

  ngOnInit(): void {

    
  }

  OnClickAjoutOffre(){
    this.router.navigate(['Ajout']);
  }

  OnclickProfile(){
    this.router.navigate(['Vendeur']);
  }

  logOut(){
    this.router.navigate(['connection']);
    this.client.logout();
  }
}
