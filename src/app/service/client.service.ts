
import {BehaviorSubject, Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../model/user.model';
import { Vendeur } from '../model/vendeur.model';
import { annonce } from '../model/annonce.model';
import { ville } from '../model/ville.model';
import { Quartier } from '../model/quartier.model';

@Injectable({
  providedIn: 'root'
})

export class client {
  res: any;
  private isAuth: BehaviorSubject<boolean>;
  private result: BehaviorSubject<string>;
  private resultLog: BehaviorSubject<string>;
  private user:BehaviorSubject<User>;
  private Vendeur:BehaviorSubject<Vendeur>;
  private reponse: BehaviorSubject<string>;
  private vc :BehaviorSubject<number>;
  private listeLike:BehaviorSubject<number[]>;
  constructor(private httpClient: HttpClient) {
    this.isAuth = new BehaviorSubject<boolean>(false);
    this.user = new BehaviorSubject<User>(null);
    this.resultLog = new BehaviorSubject<string>(null);
    this.Vendeur = new BehaviorSubject<Vendeur>(null);
    this.vc = new BehaviorSubject<number>(0);
    this.listeLike = new BehaviorSubject<number[]>(null);
  }

  getIsAuth(): Observable<boolean>{
    return this.isAuth.asObservable();
  }

  getLikes(): Observable<number[]>{
    return this.listeLike.asObservable();
  }

  headers= new HttpHeaders()
   .append('content-type', 'application/json')
   .append('Access-Control-Allow-Origin', 'http://localhost:3000')
   .append('Access-Control-Allow-Origin', '*');

   logIn(form:FormData){
    this.httpClient.post<string>('http://localhost:3000/api/checkUser', form).toPromise().then(data => {
      var Replikes = [];
      this.isAuth.next(true);
      localStorage.setItem('userConnect','true');
      var userRep= new User();
      var VendeurRep= new Vendeur();
      this.vc.next(data['Profile']);
      this.resultLog.next('isok');
      userRep.id=data['client'];
      userRep.nom = data['userInfo']['nom'];
      userRep.prenom = data['userInfo']['prenom'];
      VendeurRep.idVendeur = data['vendeur_id']['id'] ;
      
      data['like'].forEach(element => {
        Replikes.push(element['id_Offre']);
      });
      this.listeLike.next(Replikes);
      this.Vendeur.next(VendeurRep);
      console.log(data['vendeur_id']['id']);
      userRep.urlProfile = "http://localhost:3000"+data['userInfo']['image']['url'];
      this.user.next(userRep);
    }).catch((error) => {
      if(error['error']){
        this.resultLog.next(error['error']['message']);
      }else{
        console.log(error);
      }
       
  });
  }

  getUser(): Observable<User>{
    return this.user.asObservable();
  }

  getProfileVendeur(id,profile = 0 ):Observable<Vendeur>{
    this.Vendeur.next(null);
    this.result = new BehaviorSubject<string>("Erreur reseau");
    this.httpClient.get<string>('http://localhost:3000/api/Vendeur/'+id+'/'+profile).toPromise().then(data => {
    var annoces = [] ;
    data['Vendeur']['annonces'].forEach(element => {
      var images = [];
      if (element['images'][0] != null) {
        element['images'].forEach(elementImg => {
          images.push(elementImg);
      });
      }else{
        images.push("/img/logo_black.png"); 
      } 
      annoces.push(
        new annonce(element['id'],
        element['titre'],
        '',
        images,
        element['prix'],
        element['piece'],
        element['parking'],
        element['surface'],
        element['salleBain'],
        new ville(element['ville']['nom'],element['ville']['long'],element['ville']['lat']),
        new Quartier(element['quartier']['nom'],element['quartier']['long'],element['quartier']['lat']),'','','',''));
    });
    this.Vendeur.next(new Vendeur(data['Vendeur']['id_user'],data['Vendeur']['imageP'],data['Vendeur']['nom'],data['Vendeur']['prenom'],annoces,data['Vendeur']['tele'],'','',''));
    });
    return this.Vendeur.asObservable();
  }

  gteVendeur():Observable<Vendeur>{
    return this.Vendeur.asObservable();
  }

  getCompte():Observable<number>{
    return this.vc.asObservable();
  }

  AddUser(form:FormData){
    this.httpClient.post('http://localhost:3000/api/AddUser', form).toPromise().then(data => {
      localStorage.setItem('user',data['user']['id']);
      this.user.next(data['user']);
      if(data['vendeur'] != null) {
        var vendeur = new Vendeur();
        vendeur.idVendeur = data['vendeur']['id'];
        vendeur.id = data['user']['id'];
        this.Vendeur.next(vendeur);
      }
      
      this.resultLog.next('isok');
      this.isAuth.next(true);
    });
  }

  getMessage():Observable<string>{
    return  this.resultLog.asObservable();
  }

  GetCondition():Observable<string>{
    this.result = new BehaviorSubject<string>("Erreur reseau");
    this.httpClient.get<string>('http://localhost:3000/api/ConditionUse').toPromise().then(data => {
      this.result.next(data['Description']);
    });
    return  this.result.asObservable();
  }

  logout(){
    localStorage.setItem('userConnect','false');
    this.isAuth.next(false);
    this.user.next(null);
  }

  setPromo(form):Observable<string>{
    this.reponse = new BehaviorSubject<string>("null");
    this.httpClient.post('http://localhost:3000/api/SetProno', form).toPromise().then(data => {
      console.log(data);
      this.reponse.next(data['status']);
    }).catch((error) => {
      console.log(error);
    this.reponse.next(error['error']['message']);
    });
  return this.reponse.asObservable();
  }

  UpdateUserProfile(form:FormData){
    this.httpClient.post('http://localhost:3000/api/Update', form).toPromise().then(data => {
      console.log(data);
      this.reponse.next(data['status']);
    }).catch((error) => {
      console.log(error);
    this.reponse.next(error['error']['message']);
    });
  }

}