import { annonce } from './annonce.model';

export class User {
    public id: number;
    public urlProfile : string ;
    public nom: string;
    public prenom: string;
    public email: string;
    public tele: string;
    public offre:[annonce];
}