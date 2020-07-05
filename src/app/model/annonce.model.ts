import { ville } from './ville.model';

export class annonce {
    public id : number ;
    public Titre : string;
    public Description : string ;
    public images : [string] ;
    public Prix : number ;
    public NombrePiece : number ;
    public NombreParking : number ;
    public Surface : number;
    public NombreSB : number ;
    public DatePublic : Date;
    public DateConst : Date;
    public Verdure : number ;
    public TypeImmo : number;
    public Ville : ville ;
    public Quartier : ville;
    constructor(id?,Titre?,Description?,images?,Prix?,NombrePiece?,NombreParking?,Surface?,NombreSB?,Ville?,Quartier?,DatePublic?,DateConst?,Verdure?,TypeImmo?){
        this.id = id;
        this.Titre = Titre;
        this.Description = Description;
        this.images = images ;
        this.Prix = Prix ;
        this.NombrePiece = NombrePiece ;
        this.NombreParking = NombreParking ;
        this.Surface = Surface ;
        this.NombreSB = NombreSB ;
        this.Ville = Ville ;
        this.Quartier = Quartier ;
        this.DatePublic = DatePublic ;
        this.DateConst = DateConst ;
        this.Verdure = Verdure ;
        this.TypeImmo = TypeImmo;
    }

    getCat(val = this.TypeImmo) {
        switch (val) {
          case 1:
            return "Villa";
            break;
          case 2:
            return "Villa commercial";
            break;
          case 3:
            return "Maison";
            break;
          case 4:
            return "Appartement";
            break;
          case 5:
            return "terrain";
            break;
          case 6:
            return "chalet";
            break;
          case 7:
            return "Garage";
            break;
          case 8:
            return "Hangare";
            break;
          case 9:
            return "Château";  
            break;
          default:
            return "";  
            break;
        }
      }
}