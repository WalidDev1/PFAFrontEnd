import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-card-offre',
  templateUrl: './card-offre.component.html',
  styleUrls: ['./card-offre.component.scss']
})
export class CardOffreComponent implements OnInit {
liked = false ;
@Input() title = "Magnifique appartement ki lwil wlh";
@Input() adresse = "machi sokek";
@Input() prix = '15 000 000 000' ;
@Input() nbPiece = "4";
@Input() nbToilette = "2";
@Input() surface = "1 500";
@Input() image = "../../assets/images/logo_black.png" 
@Input() idOffre = 0 ;
colorNoLike = "#FFFFFF";
colorLike = "#E60245";
  constructor() { }

  ngOnInit(): void {

  }

  onClickShow(){
    console.log('click offre ',this.idOffre);
  }

  likedPost(){
    (this.liked) ? this.liked=false:this.liked=true ;
  }
}
