import {BehaviorSubject, Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { annonce } from '../model/annonce.model';
import { ville } from '../model/ville.model';
import { Vendeur } from '../model/vendeur.model';
import { Quartier } from '../model/quartier.model';

@Injectable({
    providedIn: 'root'
  })
  
  export class annonces {
    private listeAnnonce : BehaviorSubject<annonce[]>;
    private listeAnnonceFiltre : BehaviorSubject<annonce[]>;
    private Annonce:BehaviorSubject<annonce>;
    private vendeur:BehaviorSubject<Vendeur>;
    constructor(private httpClient: HttpClient) {
        this.listeAnnonce = new BehaviorSubject<annonce[]>(null);
        this.listeAnnonceFiltre = new BehaviorSubject<annonce[]>(null);
        this.Annonce = new BehaviorSubject<annonce>(null);
        this.vendeur = new BehaviorSubject<Vendeur>(null);
    }
 
    getListeAnnonces(){
        this.httpClient.get('http://localhost:3000/api/ListeAnnonces').toPromise().then(data => {
        var RepAnnonce = new Array<annonce>();
        for(var val of data['Annonces']){
            RepAnnonce.push(
                new annonce(val['id'],
                val['titre'],
                val['description'],
                val['images'], 
                val['prix'], 
                val['piece'],
                val['parking'],
                val['surface'],
                val['salleBain'],
                new ville(val['ville']['nom'],val['ville']['long'],val['ville']['lat']),
                new ville(val['quartier']['nom'],val['quartier']['long'],val['quartier']['lat']),
                new Date(val['datePublication']['annee']+','+val['datePublication']['mois']+','+val['datePublication']['jour']),"","",val['typeImmo']
                ));
        }
        RepAnnonce.sort((a,b) => (a.Prix > b.Prix) ? 0 : ((b.Prix > a.Prix) ? -1 : 0));
        this.listeAnnonce.next(RepAnnonce);
        });
        return this.listeAnnonce.asObservable();
    }

    trier(val){
        var RepAnnonce = new Array<annonce>();
        RepAnnonce = this.listeAnnonce.value ;
        switch(val){
            case "Prix":
                RepAnnonce.sort((a,b) => (a.Prix > b.Prix) ? 0 : ((b.Prix > a.Prix) ? -1 : 0));
                break;
            case "Date de publication": 
                RepAnnonce.sort((a,b) => (a.DatePublic> b.DatePublic) ? -1 : ((b.DatePublic > a.DatePublic) ? 0 : 0));
                break;
            case "Tandance": 
            default:
                RepAnnonce.sort((a,b) => (a.Prix > b.Prix) ? -1 : ((b.Prix > a.Prix) ? 0 : 0));
        }
        this.listeAnnonce.next(RepAnnonce);
    }

    filtre(val){
        var RepAnnonce = new Array<annonce>();
        RepAnnonce = this.listeAnnonce.value ;
        var AnnonceFiltred = new Array<annonce>();
        switch(val){
            case "< 100 000":
                RepAnnonce.forEach(element => {
                    if (element.Prix <= 100000) {
                        AnnonceFiltred.push(element);
                    }
                });
                break;
            case "100 000 - 500 000": 
                RepAnnonce.forEach(element => {
                    if (element.Prix > 100000 && element.Prix < 500000) {
                        AnnonceFiltred.push(element);
                    }
                });
                break;
            case "500 000 - 1 000 000": 
                RepAnnonce.forEach(element => {
                    if (element.Prix > 500000 && element.Prix < 1000000) {
                        AnnonceFiltred.push(element);
                    }
                });
                break;    
            case "1 000 000 - 5 000 000": 
                RepAnnonce.forEach(element => {
                    if (element.Prix > 1000000 && element.Prix < 5000000) {
                        AnnonceFiltred.push(element);
                    }
                });
                break; 
            case "5 000 000 - 10 000 000": 
                RepAnnonce.forEach(element => {
                    if (element.Prix > 5000000 && element.Prix < 10000000) {
                        AnnonceFiltred.push(element);
                    }
                });
                break;
            case "> 10 000 000": 
                RepAnnonce.forEach(element => {
                    if (element.Prix > 10000000) {
                        AnnonceFiltred.push(element);
                    }
                });
                break;                
            default:
                AnnonceFiltred = this.listeAnnonce.value  ;
        }
        this.listeAnnonceFiltre.next(AnnonceFiltred);
        return this.listeAnnonceFiltre.asObservable();
    }

    filtrePiece(val){
        var RepAnnonce = new Array<annonce>();
        RepAnnonce = this.listeAnnonce.value ;
        var AnnonceFiltred = new Array<annonce>();
        switch(val){
            case "< 4":
                RepAnnonce.forEach(element => {
                    if (element.NombrePiece <= 4) {
                        AnnonceFiltred.push(element);
                    }
                });
                break;
            case "4 - 6": 
                RepAnnonce.forEach(element => {
                    if (element.NombrePiece > 4 && element.NombrePiece <= 6) {
                        AnnonceFiltred.push(element);
                    }
                });
                break;
            case "6 - 10": 
                RepAnnonce.forEach(element => {
                    if (element.NombrePiece > 6 && element.NombrePiece <= 10) {
                        AnnonceFiltred.push(element);
                    }
                });
                break;    
            case "10 >": 
                RepAnnonce.forEach(element => {
                    if (element.NombrePiece > 10) {
                        AnnonceFiltred.push(element);
                    }
                });
                break;              
            default:
                AnnonceFiltred = this.listeAnnonce.value ;
        }
        console.log(AnnonceFiltred);
        this.listeAnnonceFiltre.next(AnnonceFiltred);
        return this.listeAnnonceFiltre.asObservable();
    }

    filtreType(val){
        var RepAnnonce = new Array<annonce>();
        RepAnnonce = this.listeAnnonce.value ;
        var AnnonceFiltred = new Array<annonce>();
        switch(val){
            case "< 4":
                RepAnnonce.forEach(element => {
                    if (element.NombrePiece <= 4) {
                        AnnonceFiltred.push(element);
                    }
                });
                break;
            case "4 - 6": 
                RepAnnonce.forEach(element => {
                    if (element.NombrePiece > 4 && element.NombrePiece <= 6) {
                        AnnonceFiltred.push(element);
                    }
                });
                break;
            case "6 - 10": 
                RepAnnonce.forEach(element => {
                    if (element.NombrePiece > 6 && element.NombrePiece <= 10) {
                        AnnonceFiltred.push(element);
                    }
                });
                break;    
            case "10 >": 
                RepAnnonce.forEach(element => {
                    if (element.NombrePiece > 10) {
                        AnnonceFiltred.push(element);
                    }
                });
                break;              
            default:
                AnnonceFiltred = this.listeAnnonce.value ;
        }
        console.log(AnnonceFiltred);
        this.listeAnnonceFiltre.next(AnnonceFiltred);
        return this.listeAnnonceFiltre.asObservable();
    }

    Rechercher(val){
        var RepAnnonce = new Array<annonce>();
        RepAnnonce = this.listeAnnonce.value ;
        var AnnonceFiltred = new Array<annonce>();
            
            
                //AnnonceFiltred = this.listeAnnonce.value  ;
        
        this.listeAnnonceFiltre.next(AnnonceFiltred);
        return this.listeAnnonceFiltre.asObservable();
    }
    getVendeur():Observable<Vendeur>{
        return this.vendeur.asObservable();  
    }

   

    getAnnonces(id):Observable<annonce>{
        this.httpClient.get('http://localhost:3000/api/Offre/'+id).toPromise().then(data => {
            this.Annonce.next(new annonce(
                data['Vendeur']['id'],
                data['offre']['titre'],
                data['offre']['description'],
                data['offre']['images'],
                data['offre']['prix'],
                data['offre']['Piece'],
                data['offre']['Parking'],
                data['offre']['Surface'],
                data['offre']['Bain'],
                data['offre']['adresse']['ville']['nom'],
                data['offre']['adresse']['quartier']['nom'],
                data['offre']['DatePublic'],
                data['offre']['DateConst'],
                data['offre']['Verdure']));
            this.vendeur.next(new Vendeur(
                data['Vendeur']['id'],
                "http://localhost:3000"+data['Vendeur']['image'],
                data['Vendeur']['nom'],
                data['Vendeur']['prenom'],
                data['Vendeur']['annonces'],
                data['Vendeur']['telephone'],
                data['Vendeur']['mail'],
                data['Vendeur']['Rank'],
                data['Vendeur']['nombreLike']
                )
            );
        }).catch((error) => {
            console.log(error);   
        });
        return this.Annonce.asObservable();  
    }

    setAnnonce(form:FormData){
        this.httpClient.post('http://localhost:3000/api/Ajouter',form).toPromise().then(data => {
            console.log(data);
        }).catch((error) => {
            console.log(error);   
        });
        return this.listeAnnonce.asObservable();  
    }

    likeAnnonces(idUser , idAnnonce){
        var form = new FormData();
        form.append('id_offre',idAnnonce);
        form.append('id_client',idUser);
        this.httpClient.post('http://localhost:3000/api/like',form).toPromise().then(data => {
            console.log(data);
        }).catch((error) => {
            console.log(error);   
        });
        return this.listeAnnonce.asObservable();  
    }

    signalAnnonce(id){

    }
  }