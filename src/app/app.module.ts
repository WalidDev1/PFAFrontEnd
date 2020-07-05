import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { MapComponent } from './map/map.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConnectionComponent } from './connection/connection.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { Routes, RouterModule } from '@angular/router';
import {MatRadioModule} from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PropoacComponent } from './propoac/propoac.component';
import { MatSliderModule } from '@angular/material/slider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardOffreComponent } from './card-offre/card-offre.component';
import { AjouterOffreComponent } from './ajouter-offre/ajouter-offre.component';
import { client } from './service/client.service';
import { ClickOutsideModule } from 'ng-click-outside';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { mapS } from './service/map.service';
import { DetailOffreComponent } from './detail-offre/detail-offre.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ProfileAgenceComponent } from './profile-agence/profile-agence.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PromoVentesComponent } from './promo-ventes/promo-ventes.component';
import { Chart } from 'chart.js';
import { ProfileVendeurComponent } from './profile-vendeur/profile-vendeur.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { annonces } from './service/annonces.service';
const appRoutes: Routes = [
  { path: 'connection', component: ConnectionComponent },
  { path: 'Ajout', component: AjouterOffreComponent },
  { path: 'Ajout/:id', component: AjouterOffreComponent },
  { path: 'insciption', component: InscriptionComponent },
  { path: 'propoAc', component: PropoacComponent },
  { path: 'detailO/:id', component: DetailOffreComponent },
  { path: 'OffrePromo', component: PromoVentesComponent },
  { path: 'Agence/:id', component: ProfileAgenceComponent },
  { path: 'Vendeur/:id/:P', component: ProfileVendeurComponent },
  { path: '', component: PropoacComponent },
  { path: 'notFound', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'notFound' }
];

@NgModule({
  declarations: [
    AppComponent,
    AcceuilComponent,
    MapComponent,
    ConnectionComponent,
    InscriptionComponent,
    PropoacComponent,
    CardOffreComponent,
    AjouterOffreComponent,
    DetailOffreComponent,
    ProfileAgenceComponent,
    PageNotFoundComponent,
    PromoVentesComponent,
    ProfileVendeurComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
    MatRadioModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatGridListModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ClickOutsideModule,
    NgCircleProgressModule.forRoot({
    // set defaults here
    "radius": 60,
    "space": -10,
    "outerStrokeGradient": true,
    "outerStrokeWidth": 10,
    "outerStrokeColor": "#4882c2",
    "outerStrokeGradientStopColor": "#53a9ff",
    "innerStrokeColor": "#e7e8ea",
    "innerStrokeWidth": 10,
    "title": "UI",
    "animateTitle": false,
    "animationDuration": 1000,
    "showUnits": false,
    "showBackground": false,
    "clockwise": false,
    "startFromZero": false
    }),
    NgHttpLoaderModule.forRoot(),
  ],
  providers: [client,mapS,annonces],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
