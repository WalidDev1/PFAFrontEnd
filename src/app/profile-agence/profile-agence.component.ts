import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-profile-agence',
  templateUrl: './profile-agence.component.html',
  styleUrls: ['./profile-agence.component.scss']
})
export class ProfileAgenceComponent implements OnInit {
  liste_offre = [
    {
      title: 'Appart neuf ',
      prix: '120 000 000',
      surface : ' 13 000',
      adresse : "machi sokek",
      nbPiece : "4",
      nbToilette : "2",
      image:"../../assets/images/logo_black.png"
    },
    {
      title: 'Villa chique',
      prix: '15 000 000 000',
      surface : ' 53 000',
      adresse : "Californie 12 avenue zrirek",
      nbPiece : "10",
      nbToilette : "4",
      image:"../../assets/images/img2.jpg"
    },
    {
      title: 'Appart neuf ',
      prix: '120 000 000',
      surface : ' 13 000',
      adresse : "machi sokek",
      nbPiece : "4",
      nbToilette : "2",
      image:"../../assets/images/img3.jpg"
    },
    {
      title: 'Appart neuf ',
      prix: '120 000 000',
      surface : ' 13 000',
      adresse : "machi sokek",
      nbPiece : "4",
      nbToilette : "2",
      image:"../../assets/images/img1.jpg"
    },
    {
      title: 'Appart neuf ',
      prix: '120 000 000',
      surface : ' 13 000',
      adresse : "machi sokek",
      nbPiece : "4",
      nbToilette : "2",
      image:"../../assets/images/awsome_deco.jpg"
    },
    {
      title: 'Appart neuf ',
      prix: '120 000 000',
      surface : ' 13 000',
      adresse : "machi sokek",
      nbPiece : "4",
      nbToilette : "2",
      image:"../../assets/images/img2.jpg"
    },
    {
      title: 'Appart neuf ',
      prix: '120 000 000',
      surface : ' 13 000',
      adresse : "machi sokek",
      nbPiece : "4",
      nbToilette : "2",
      image:"../../assets/images/img2.jpg"
    },
    {
      title: 'Appart neuf ',
      prix: '120 000 000',
      surface : ' 13 000',
      adresse : "machi sokek",
      nbPiece : "4",
      nbToilette : "2",
      image:"../../assets/images/img3.jpg"
    },
    {
      title: 'Appart neuf ',
      prix: '120 000 000',
      surface : ' 13 000',
      adresse : "machi sokek",
      nbPiece : "4",
      nbToilette : "2",
      image:"../../assets/images/img2.jpg"
    },
    {
      title: 'Appart neuf ',
      prix: '120 000 000',
      surface : ' 13 000',
      adresse : "machi sokek",
      nbPiece : "4",
      nbToilette : "2",
      image:"../../assets/images/img1.jpg"
    },
    {
      title: 'Appart neuf ',
      prix: '120 000 000',
      surface : ' 13 000',
      adresse : "machi sokek",
      nbPiece : "4",
      nbToilette : "2",
      image:"../../assets/images/awsome_deco.jpg"
    }
  ];
  
  labels = [ "2015", "2016", "2017", "2018", "2019", "2020"];
 series = ['Series A', 'Series B'];
  data = [
    [65, 59, 80, 81, 56, 55, 40]
  ];
chart = [];
 datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
  options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        },
        {
          id: 'y-axis-2',
          type: 'linear',
          display: true,
          position: 'right'
        }
      ]
    }
  };

        

      
  constructor() {
    
   }

  ngOnInit(): void {
    Chart.defaults.global.legend.labels.usePointStyle = true;
    var canvas = <HTMLCanvasElement> document.getElementById("canvas1");
    var ctx = canvas.getContext("2d");
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: this.labels,
          datasets: [{
              label: 'Moyenne des prix de votre agence',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor :'transparent' ,
              pointBackgroundColor:'#19B074',
              borderColor : '#19B074',
              pointStyle:'line',
              borderWidth: 2
          },{
            label: 'Moyenne des prix de la zone',
              data: [1, 9, 30, 50, 20, 30],
              backgroundColor :'transparent' ,
              pointBackgroundColor:'#FFD541',
              borderColor : '#FFD541',
              pointStyle:'line',
              borderWidth: 2
          }]
      },
      options: {
        legend: {
          display: true,
          labels: {
              fontColor: '#333'
          }
      },
          tooltips: {
            mode: 'index'
        }
      }
  });

  var canvas2 = <HTMLCanvasElement> document.getElementById("canvas2");
  var ctx2 = canvas2.getContext("2d");
  var myChart2 = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: this.labels,
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor :'transparent' ,
            borderColor : '#19B074',
            borderWidth: 2
        }]
    },
    options: {
        
        tooltips: {
          mode: 'index'
      }
    }
});
    }

    flip(val){
      var canvas2 = <HTMLCanvasElement> document.getElementById("element");
      var canvas = <HTMLCanvasElement> document.getElementById("element2");
      var card = <HTMLCanvasElement> document.getElementById("card");
      if (val){
        canvas2.style.transform = 'rotateY(360deg)';
        canvas.style.transform = 'rotateY(180deg)';
        card.style.zIndex = '-1';
      }else{
        canvas2.style.transform = 'rotateY(0deg)';
        canvas.style.transform = 'rotateY(360deg)';
        card.style.zIndex = '10';
      }
      
    }

   
}
