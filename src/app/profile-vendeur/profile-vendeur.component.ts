import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';
import { client } from '../service/client.service';
import { element } from 'protractor';
import { annonce } from '../model/annonce.model';
import { ActivatedRoute } from '@angular/router';
import { Vendeur } from '../model/vendeur.model';
import { User } from '../model/user.model';
@Component({
  selector: 'app-profile-vendeur',
  templateUrl: './profile-vendeur.component.html',
  styleUrls: ['./profile-vendeur.component.scss']
})
export class ProfileVendeurComponent implements OnInit  {
  vendeur:Vendeur;
  liste_offre = [];
  fileData: File = null;
  form:FormData;
  nom :any;
  prenom:any;
  tele:any;
  user:User;
  previewUrl:any = "../../assets/images/add_Img_profile.png";
  constructor(private client:client,private actRoute: ActivatedRoute ) {
    this.vendeur = new Vendeur();
    this.user = new User();
    this.client.getProfileVendeur(this.actRoute.snapshot.params.id ,this.actRoute.snapshot.params.P).subscribe((value)=>{
      if (value != null) {
      this.vendeur = value;
      console.log(this.vendeur);
      this.previewUrl = (this.vendeur.imagesP != '')? "http://localhost:3000/"+this.vendeur.imagesP : "../../assets/images/add_Img_profile.png";
      this.nom = this.vendeur.nom ;
      this.prenom = this.vendeur.prenom ;
      this.tele = this.vendeur.tele ;
      this.vendeur.annonce.forEach(element => {
        this.liste_offre.push(new annonce(
          element.id,
          element.Titre,
          '',
          element.images,
          element.Prix,
          element.NombrePiece,
          element.NombreParking
          ,element.Surface,element.NombreSB,element.Ville,element.Quartier,'','','',''));
        });
      }
    });

  }

fileProgress(fileInput: any) {
  this.fileData = <File>fileInput.target.files[0];
  this.preview();
}
 
preview() {
  var imageUpload = (<HTMLInputElement>document.getElementById('images')).files[0] ;
        if(imageUpload != null){
          this.form.append('image', imageUpload , imageUpload.name );
          document.getElementById('eng').removeAttribute("disabled");
  }
  // Show preview 
  var mimeType = this.fileData.type;
  if (mimeType.match(/image\/*/) == null) {
    return;
  }

  var reader = new FileReader();      
  reader.readAsDataURL(this.fileData); 
  reader.onload = (_event) => { 
    this.previewUrl = reader.result; 
    this.previewUrl ;
  }
}

  checkUpdate(val , here){
    switch (here) {
      case 'nom':
        if (val == this.nom) {
          this.form.delete('nom');
          document.getElementById('eng').setAttribute("disabled","true");
        } else {
          this.form.append('nom',val);
          document.getElementById('eng').removeAttribute("disabled");
        }
        break;
      case 'prenom':
        if (val == this.prenom) {
          this.form.delete('nom');
          document.getElementById('eng').setAttribute("disabled","true");
        } else {
          this.form.append('prenom',val);
          document.getElementById('eng').removeAttribute("disabled");
        }
      break;
      case 'tele':
        if (val == this.tele) {
          this.form.delete('tele');
          document.getElementById('eng').setAttribute("disabled","true");
        } else {
          this.form.append('tele',val);
          document.getElementById('eng').removeAttribute("disabled");
        }
      break;
      
      default:
        break;
    }
  }

  ngOnInit(): void {
    this.form = new FormData();
  }

  OnclickEng(){
    this.form.append('id',this.vendeur.idVendeur.toString());
    this.client.UpdateUserProfile(this.form);
  }

}
