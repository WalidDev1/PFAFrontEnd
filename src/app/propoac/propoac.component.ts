import { Component, OnInit , Input } from '@angular/core';
import { annonces } from '../service/annonces.service';
import { annonce } from '../model/annonce.model';
import { Map } from 'mapbox-gl';
import { mapS } from '../service/map.service';

@Component({
  selector: 'app-propoac',
  templateUrl: './propoac.component.html',
  styleUrls: ['./propoac.component.scss']
})
export class PropoacComponent implements OnInit {
backListePrix  = '';
selectedValue = "Tous les prix";
selectedPiece = "Tous les Piece";
selectedType = "Tous les Types";
selectedTypeC = "Tous les types de contrat";
selectedFiltre = "Prix";
World:string;


  liste_offre:annonce[] = []; 
  listeOrigi = [];
  listeFiltre = [];
  constructor( private annonce : annonces , private mapS:mapS) { 
    
    this.annonce.getListeAnnonces().subscribe((value) => {
      if (value != null) {
        this.liste_offre = value;
        this.listeOrigi = value;
        this.listeFiltre = value ;
        this.mapS.setListeOffreCords(this.liste_offre);
      }
    });
  }

  ngOnInit(): void {
  }

  changePrix(value){
    this.selectedValue = value ;
    this.annonce.filtre(value).subscribe((value) => {
      this.liste_offre = value;
    });
  }
  changePiece(value){
    this.selectedPiece = value ;
    this.annonce.filtrePiece(value).subscribe((value) => {
      this.liste_offre = value;
    });
  }
  changeType(value){
    this.selectedType = value ;
  }
  changeTypeC(value){
    this.selectedTypeC = value ;
  }
  changeFiltre(value){
    this.selectedFiltre = value ;
    this.annonce.trier(value);
  }

  filtreTexte = (arr, requete) => { 
    return arr.filter(el =>  el.toLowerCase().indexOf(requete.toLowerCase()) !== -1);
  }

  search(World = this.World){
    this.liste_offre = [] ;
    this.listeFiltre.filter(function(item:annonce) {
      if (item.Ville.nom.toLowerCase().indexOf(World.toLowerCase()) > -1) {
       
        return item as annonce;
      }
    }).forEach(element => {
      this.liste_offre.push(element);
    });
    this.mapS.setCord(this.liste_offre[0].Ville.lat,this.liste_offre[0].Ville.long) ;
    //console.log(this.liste_offre);
  }
  
}
