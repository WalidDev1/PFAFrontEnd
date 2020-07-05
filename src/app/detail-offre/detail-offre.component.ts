import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { annonces } from '../service/annonces.service';
import { annonce } from '../model/annonce.model';
import { Vendeur } from '../model/vendeur.model';
import { client } from '../service/client.service';
import { mapS } from '../service/map.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-detail-offre',
  templateUrl: './detail-offre.component.html',
  styleUrls: ['./detail-offre.component.scss']
})
export class DetailOffreComponent implements OnInit  {
  
listeImg = [] // la liste des images de l'annonces
liked = false ;
colorNoLike = "#A3ABAB";
colorLike = "#E60245";
user : User;
idOffre : number;
selectedImg = this.listeImg[0];
Annonce:annonce;
Vendeure:Vendeur; // objet de model vendeur , peut etre null si c'est client
isPro:boolean = false ; // si cette annonce appartien a ce vendeur
isAuth:boolean;
isVendeur:boolean =true; // si cette user et un vendeur
ProfileVendeur:string;
Num:string = "06 61 ** ** ** Afficher Le Numéro";
  constructor(private actRoute: ActivatedRoute , private annonce:annonces , private client:client , private maps:mapS) {
    this.user = new User();
    this.client.getUser().subscribe((value)=>{
      this.user.id = value.id['id'];
    });

    this.annonce.getListeAnnonces().subscribe((value) => {
      if (value != null) {
        this.maps.setListeOffreCords(value);
      }
    });

    this.annonce.getAnnonces(this.actRoute.snapshot.params.id).subscribe((value)=>{
      if(value != null){
        this.Annonce = value;
      }
      
      this.Refresh(this.Annonce);
    });

    this.annonce.getVendeur().subscribe((value)=>{
      if(value != null ){

        console.log(value);
        this.Vendeure = value;
      }
    });

    this.client.getIsAuth().subscribe((value)=>{
      this.isAuth = value;
    });

    this.client.gteVendeur().subscribe((value)=>{
      if (value.id == null) {
        this.isVendeur = false ;
      }else{
        this.isVendeur = true ;
      }
    });

    this.client.getLikes().subscribe((value)=>{
      value.forEach(element => {
        if (element == this.actRoute.snapshot.params.id) {
          this.liked = true ;
        }
      });
    });
  }

  ngOnInit(): void {
    this.Annonce = new annonce();
    this.Vendeure = new Vendeur();
    this.idOffre = this.actRoute.snapshot.params.id;
  }

  Refresh(annonce:annonce){
    if (annonce != null) {
        annonce.images.forEach(element => {
          this.listeImg.push('http://localhost:3000'+element);
        });
        this.selectedImg = 'http://localhost:3000'+annonce.images[0];
      }
  }

  onClickImg(value){
    this.selectedImg = value;
  }

  showNum(){
    if (this.isAuth) {
      this.Num = this.Vendeure.tele+"" ;
    } else {
      alert("Vous devez vous connecter");
    }
    
  }

  showMail(){
    if (this.isAuth) {
      alert(this.Vendeure.mail);
    } else {
      alert("Vous devez vous connecter");
    }
  }

  likedPost(){
    (this.liked) ? this.liked=false:this.liked=true ;
    if (this.liked) {
      console.log(this.user.id , this.actRoute.snapshot.params.id);
      this.annonce.likeAnnonces(this.user.id , this.actRoute.snapshot.params.id);
    }else{

    }
  }

  UpdateOffre(){
    
  }

}
