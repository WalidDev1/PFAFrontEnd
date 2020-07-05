import { annonce } from './annonce.model';

export class Vendeur {
    public id: number;
    public idVendeur : number ;
    public imagesP: string ;
    public nom : number ;
    public prenom : number ;
    public annonce : [annonce] ;
    public tele : number ;
    public mail : string ;
    public rank : number ;
    public like : number ;
   constructor(idVendeur?,imagesP?,nom?,prenom?,annonce?,tele?,mail?,rank?,like?){
        this.idVendeur = idVendeur;
        this.imagesP = imagesP;
        this.nom = nom;
        this.prenom = prenom;
        this.annonce = annonce;
        this.tele = tele;
        this.mail = mail;
        this.rank = rank;
        this.like = like;
   }
}