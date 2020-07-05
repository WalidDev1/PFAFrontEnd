import { Component, OnInit } from '@angular/core';
import { mapS } from '../service/map.service';
import { Observable, fromEvent, of, throwError } from 'rxjs';
import { tap, catchError, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ville } from '../model/ville.model';
import { Quartier } from '../model/quartier.model';
import { client } from '../service/client.service';
import { annonces } from '../service/annonces.service';
import { ActivatedRoute } from '@angular/router';
import { annonce } from '../model/annonce.model';
@Component({
  selector: 'app-ajouter-offre',
  templateUrl: './ajouter-offre.component.html',
  styleUrls: ['./ajouter-offre.component.scss']
})
export class AjouterOffreComponent implements OnInit {
  name = "walid";
  model : String ;
  images = [];
  searching = false;
  map: mapboxgl.Map;
  selectInfo = "" ;
  isAddImg = false ; 
  searchFailed = false;
  st:any ;
  states: any = [];
  cords : any = [];
  // var pour l'ajout d'une annonce
  idVendeur:number;
  titre:string;
  verdure:number = 0;
  nbBain:number;
  surface:number;
  nbPiece:number;
  imageData:string []=[];
  nomQ:string = "";
  ville:ville;
  quartier:Quartier;
  nbEtage:number;
  nbGarage:number;
  description:string;
  prix:number;
  typeContrat:number;
  typeImmobilier:number;
  dateConstruction:Date;
  Annonce:annonce;
  constructor(private mapS : mapS ,private actRoute: ActivatedRoute ,private client:client , private annonce:annonces) { 
    
    this.ville = new ville();
    this.quartier = new Quartier();
    this.client.gteVendeur().subscribe((value)=>{
      this.idVendeur = value.idVendeur;
    });

    this.mapS.getlatM().subscribe((value)=>{
      this.quartier.lat = value ;
    });

    this.mapS.getlngM().subscribe((value)=>{
      this.quartier.long = value ;
    });
if(this.actRoute.snapshot.params.id){
  this.annonce.getAnnonces(this.actRoute.snapshot.params.id).subscribe((value)=>{
this.titre = value.Titre;
this.prix = value.Prix;
this.surface = value.Surface;
this.verdure = value.Verdure;
this.nbBain = value.NombreSB;
this.isAddImg = true;
 this.images[0] = "http://localhost:3000"+value.images[0];
 this.images[1] = "http://localhost:3000"+value.images[1];
 this.images[2] = "http://localhost:3000"+value.images[2];
  });
}
   
  }

  input :HTMLInputElement = <HTMLInputElement>document.getElementById('test');

  search = (text$: Observable<string>) =>
    text$.pipe(tap(()=>{
      this.states = [] ;
      this.cords = [] ;
      this.mapS.getPositionMap(this.model);
      this.st = this.mapS.res;
      try {
        this.searching = true ;
        for (let index = 0; index < this.st.features.length; index++) {
          this.states.push(this.st.features[index].text);
          this.cords.push(this.st.features[index].center);
    }
    console.log(this.states);
    console.log('walid');
      } catch (error) {
        console.log('seber');
      }
      return [];
    }),
      debounceTime(200),
      distinctUntilChanged(),
      map(term => this.states),
      tap(() => {this.searching = false;
      
      })
    );

    slidDrag(){
      //const
       //   range = (<HTMLInputElement>document.getElementById('range')),
       //   rangeV =(<HTMLInputElement>document.getElementById('rangeV'))
       //   ;
       //   
      //const setValue = () => {
      //        const
       //           newValue = Number((range().value - range.min) * 100 / (range.max - range.min)),
       //           newPosition = 10 - (newValue * 0.2);
       //       rangeV.innerHTML = `<span>${range.value}</span>`;
       //       rangeV.style.left = `calc(${newValue}% + (${newPosition}px))`;
        //  };
      //document.addEventListener("DOMContentLoaded", setValue);
      //range.addEventListener('input', setValue);
    }

   click(item){
   for (let index = 0; index < this.states.length; index++) {
    console.log(item.item,' => ',this.states),' : ',this.cords[index][0],this.cords[index][1];
     if(item.item == this.states[index]){
      console.log('mcha : ' ,this.states[index] ,' : ',this.cords[index][0],this.cords[index][1]);
      this.mapS.setCord(this.cords[index][0],this.cords[index][1]) ;
      this.ville.nom = this.states[index];
      this.ville.lat = this.cords[index][0];
      this.ville.long = this.cords[index][1];
      break;
     }
   }
   }
  
  ngOnInit(): void {

    this.mapS.isAddOffre.next(true);
    this.mapS.getlatM().subscribe((value) => {
    console.log(value);
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.mapS.isAddOffre.next(false);
  }

  onFileChange(event) {
    this.isAddImg = true ;
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
          reader.onload = (event:any) => {
            //console.log(event.target.result);
              this.images.push(event.target.result); 
            // this.myForm.patchValue({
            //    fileSource: this.images
            // });
          }
        this.imageData.push(event.target.files[i]);
        reader.readAsDataURL(event.target.files[i]);
        }
        console.log( this.imageData);
    }
  }

  onDone(){
    var form = new FormData();
    this.quartier.nom = this.nomQ
    form.append('id',this.idVendeur+"");
    form.append('titre',this.titre);
    form.append('prix',this.prix+"");
    form.append('etage',this.nbEtage+"");
    form.append('bain',this.nbBain+"");
    form.append('surface',this.surface+"");
    form.append('verdure',this.verdure+"");
    form.append('construction',this.dateConstruction+"");
    form.append('parking',this.nbGarage+"");
    form.append('quartierNom',this.quartier.nom);
    form.append('quartierlat',this.quartier.lat+"");
    form.append('quartierlog',this.quartier.long+"");
    form.append('villelog',this.ville.long+"");
    form.append('villelat',this.ville.lat+"");
    form.append('piece',this.nbPiece+"");
    form.append('typeImmo',this.typeImmobilier+"");
    form.append('typeContract',this.typeContrat+"");
    form.append('villeNom',this.ville.nom);
    form.append('Description',this.description);
    this.imageData.forEach(element => {
      form.append('image[]',element);
    });
    
    console.log(form);
    this.annonce.setAnnonce(form).subscribe((value)=>{
      console.log(value);
    });
    console.log(
      'Vendeur : ',this.idVendeur,
      'bain : ',this.nbBain,
      'Surface : ',this.surface,
      'Piece : ',this.nbPiece,
      'ville : ',this.ville,
      'quarier : ',this.quartier,
      'Etage : ',this.nbEtage,
      'Garage : ',this.nbGarage,
      'description : ',this.description,
      'prix : ',this.prix,
      'type contract : ',this.typeContrat,
      'type immobiler : ',this.typeImmobilier,
      'date construction : ',this.dateConstruction,
      'images : ',this.images
    );
  }
}
