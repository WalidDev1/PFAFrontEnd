import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { environment } from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { Marker, Popup } from 'mapbox-gl';
import { mapS } from '../service/map.service';
import { Quartier } from '../model/quartier.model';
import { annonce } from '../model/annonce.model';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(private maps: mapS) {

  }

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 33.993;
  lng = -6.799;
  markerM = new mapboxgl.Marker({
    draggable: true
  }).setLngLat([-6.799, 33.993]);
  Mycheck = "../../assets/images/My_check_n.png";



  Check() {
    if (this.Mycheck == "../../assets/images/My_check_n.png") {
      this.Mycheck = "../../assets/images/My_check_C.png";
    } else {
      this.Mycheck = "../../assets/images/My_check_n.png";
    }
  }
  appareils: annonce[] = [];



  ngOnInit() {
    
    Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set(environment.mapbox.accessToken);

    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 10,
      center: [this.lng, this.lat]
    });

    this.maps.getListeOffreCords().subscribe((value: annonce[]) => {
      console.log('load');
      this.appareils = [];
      if (value != null) {
        console.log(value);
        value.forEach(element => {
          this.appareils.push(element);
        });
        for (const iterator of this.appareils) {
          var el = document.createElement('div');
          el.className = '';
          el.style.fontFamily = "Arial Rounded MT Bold";
          el.innerText = iterator.Prix + " DH";
          el.style.textAlign = 'center';
          el.style.fontSize = '80%';
          el.style.backgroundSize = '100%';
          el.style.color = '#19B074';
          el.style.paddingTop = '10px';
          el.style.backgroundSize = 'contain';
          el.style.backgroundRepeat = 'no-repeat';
          el.style.width = '90px';
          el.style.height = '50px';
          el.style.backgroundImage =
            'url(../../assets/images/pop_Mark_Map.png)';
          el.addEventListener('click', function () {
            console.log('yes');

          });
          var count = 0 ;
          var textH = '';
          var marker = new Marker(el).setLngLat([iterator.Quartier.long,
          iterator.Quartier.lat])
            .setPopup(new Popup({ offset: 25 }) // add popups
              .setHTML(
                '<style>  .item img {' +
                ' width: 100%;height: auto }' +
                '.btnp{margin-top: 20px;border:none; margin-left: 25%;width: 50%;height: 40px;background-color: #D1F1E6;border-radius: 20px;font-size: 130%;box-shadow:0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;text-align: center;color: #19B074;}' +
                '.btnp:hover{color:#19B074;}' +
                '.btnp:focus{color:white;background-color: #19B074;}' +
                '.carousel {position: relative;width: 100%;height: 100%;}' +
                '.carousel-inner{border-radius: 20px !important;}' +
                'ol.carousel-indicators {position: absolute;height:20px; bottom: 0;margin: 0;left: 40%;right: 50%;width: 20%; }'
                + 'ol.carousel-indicators li,ol.carousel-indicators li.active { float: left;width: 33%;height: 10px;margin: 0;border-radius: 0;border: 0;background: transparent;}'
                + 'ol.carousel-indicators li{background-image: url(\'../../assets/images/Carousel.png\');background-repeat: no-repeat;background-size: 50%;background-position: center; }'
                + 'ol.carousel-indicators li.active {background-Image :url(\'../../assets/images/Carousel_act.png\');background-size : contain;background-Repeat: no-repeat;}</style>'
                + '<h3>' + '</h3><p style="font-family: \'Arial Rounded MT Bold\';font-size:20px">' +
                iterator.getCat() + '</p><div class="Contenair" style="font-family: \'Arial Rounded MT Bold";\'> ' +
                
                '<img src="http://localhost:3000'+iterator.images[0]+'" class="d-block w-100" alt="...">' +
                '</div>' +
                
                '</div>' +
                '<a class="btnp" href="http://localhost:4200/detailO/'+iterator.id+'">Consulter</a>' +
                '</div>'
              ))
            .addTo(this.map);
        }
      }
    });



    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: false
        },
        trackUserLocation: false
      }), 'top-left');

    this.maps.getlat().subscribe((value) => {
      this.lat = value;
    });

    this.maps.getlng().subscribe((value) => {
      this.lng = value;
      console.log(this.lat, this.lng);
      this.map.flyTo({
        center: [
          this.lat,
          this.lng
        ],
        essential: true // this animation is considered essential with respect to prefers-reduced-motion
      });

      requestAnimationFrame(() => {
        this.markerM.setLngLat([
          this.lat,
          this.lng
        ]);
      });
    });

    this.maps.isAddOffre.subscribe((value) => {
      console.log(value);
      var isCheked = false;
      if (value) {
        this.markerM.addTo(this.map);
        this.markerM.on('dragend', () => { this.maps.setCordM(this.markerM.getLngLat()['lat'], this.markerM.getLngLat()['lng']); });
      } else if (isCheked && value == false) {
        this.markerM.remove();
      } else {
        isCheked = true;
      }
    });
  }


}
