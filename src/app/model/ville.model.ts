export class ville {
        public id: number;
        public nom: string;
        public long: number;
        public lat: number;
      constructor(nom? , long? , lat?){
        this.nom = nom ;
        this.lat = lat ;
        this.long = long ;
      }
}