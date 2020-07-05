import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { client } from '../service/client.service';
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {
  [x: string]: any;
  radiomm = "../../assets/images/radio_click_mm.png";
  radiome = "../../assets/images/radio_me_not_click.png";
  Mycheck = "../../assets/images/My_check_n.png";
  forSee = "hidden";
  nom : string ;
  sexe : string = "H";
  mail : string ;
  prenom : string ;
  typeP : string = "1" ;
  passe2 : string ;
  passe1 : string ;
  tele : string ;
  fileData: File = null;
  previewUrl:any = "../../assets/images/add_Img_profile.png";
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  DescriptionCondition  ;
  messageErreur = "champ obligatoir";
  //constructor(private http: HttpClient) { }
  constructor(private router: Router,private client: client ) { 
   // chargement des condition d'utilisation depuis le base de donnees
   this.client.GetCondition().subscribe((value) => {
     this.DescriptionCondition = value;
  });

  this.client.getMessage().subscribe((value) => {
    if(value == 'isok' && this.typeP == "2"){
     this.router.navigate(['OffrePromo']);
    }
    
 });
  }
  fileProgress(fileInput: any) {
      this.fileData = <File>fileInput.target.files[0];
      this.preview();
  }
   
  preview() {
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
   

  ngOnInit(): void {
  }

  onclickRadio(){
    if(this.radiomm == "../../assets/images/radio_not_click.png"){
      this.radiomm = "../../assets/images/radio_click_mm.png";
      this.radiome = "../../assets/images/radio_me_not_click.png";
      this.ValueSexe = "M";
    }else{
      this.radiomm = "../../assets/images/radio_not_click.png";
      this.radiome = "../../assets/images/radio_click_me.png";
      this.ValueSexe = "F";
    }  
  }

  Check(){
    (this.Mycheck == "../../assets/images/My_check_n.png") ? this.Mycheck =  "../../assets/images/My_check_C.png": this.Mycheck = "../../assets/images/My_check_n.png";
  }

  setvalid(val:string ):boolean{
    var count = 0 ;
    var element = <HTMLInputElement>document.getElementById(val);
    if(element.value != ""){
      element.classList.remove("is-invalid");
      element.classList.add("is-valid");
      return true ;
    }else{
      element.classList.remove("is-valid");
      element.classList.add("is-invalid");
      return false ;
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(re.test(email));
    return re.test(email);
  }

  
  inscri(){
  var element = <HTMLInputElement>document.getElementById('mail');
  if(this.setvalid('nom') &&
    this.setvalid('prenom') &&
    this.setvalid('tele') &&
    this.setvalid('mail') &&
    this.setvalid('pass1') &&
    this.setvalid('pass2') ){
    if(!this.validateEmail(this.mail)){
      this.messageErreur = "Format invalide";
      element.classList.remove("is-valid");
      element.classList.add("is-invalid");
    }else if(this.validateEmail(this.mail)){
      element.classList.remove("is-valid");
      element.classList.add("is-valid");
      this.messageErreur = "champ obligatoir";
      if (this.checkCondition == "../../assets/images/My_check_n.png") {
        this.forSee = "visible";
      }else{
        this.forSee = "hidden";
        const form = new FormData;
        var imageUpload = (<HTMLInputElement>document.getElementById('images')).files[0] ;
        if(imageUpload != null){
          form.append('image', imageUpload , imageUpload.name );
        }
        form.append('banne', '0');
        form.append('typeP', this.typeP);  
        form.append('email', this.mail);  
        form.append('adresse', 'ici');   
        form.append('telephone', this.tele);  
        form.append('sexe', this.sexe);
        form.append('prenom', this.prenom);
        form.append('nom', this.nom);
        form.append('pasword', this.passe1);
       
        this.client.AddUser(form);
      }
    }
  }
}

}
