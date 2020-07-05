
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { pipe, Observable, BehaviorSubject } from 'rxjs';
import { Quartier } from '../model/quartier.model';
import { annonce } from '../model/annonce.model';

@Injectable()

export class mapS {
    res:Response;
    private lat: BehaviorSubject<number>; // de la ville
    private lng: BehaviorSubject<number>;// de la ville
    isAddOffre: BehaviorSubject<boolean>;
    private latM: BehaviorSubject<number>; // du marker
    private lngM: BehaviorSubject<number>;// du marker
    private listeOffreCords:BehaviorSubject<annonce[]>;
    constructor(private httpClient: HttpClient) {
        this.lat = new  BehaviorSubject<number>(-6.799);// de la ville
        this.lng = new  BehaviorSubject<number>(33.993);// de la ville
        this.latM = new  BehaviorSubject<number>(-6.799);
        this.lngM = new  BehaviorSubject<number>(33.993);
        this.isAddOffre = new  BehaviorSubject<boolean>(false);
        this.listeOffreCords= new BehaviorSubject<annonce[]>([]);
    }

    setListeOffreCords(val:annonce[]){
        this.listeOffreCords.next([]);
        this.listeOffreCords.next(val);
    }

    getListeOffreCords():Observable<annonce[]>{
        this.listeOffreCords.next([]);
        return this.listeOffreCords.asObservable();
    }

    getPositionMap(val){
        return new Promise<any>((resolve , reject)=>{
        this.httpClient.get<any>('https://api.mapbox.com/geocoding/v5/mapbox.places/'+val+'.json?access_token='+environment.mapbox.accessToken+'&cachebuster=1588349150768&autocomplete=true&country=ma&routing=true')
        .subscribe((res) => {
            this.res = res ;
            resolve(res);
            });
        });
    }

    setCord(latV , lngV){
        this.lat.next(latV);
        this.lng.next(lngV);
    }

    getlat(): Observable<number>{
        return this.lat.asObservable();
    }

    getlng(): Observable<number>{
        return this.lng.asObservable();
    }

    setCordM(latM , lngM){
        this.latM.next(latM);
        this.lngM.next(lngM);
    }

    getlatM(): Observable<number>{
        return this.latM.asObservable();
    }

    getlngM(): Observable<number>{
        return this.lngM.asObservable();
    }
}