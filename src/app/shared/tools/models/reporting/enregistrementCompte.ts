import { User } from "src/app/auth/tools/model/user";
import { CategorieEnregistrement } from "./categorieEnregistrement";
import { Cycle } from "./cycle";

export interface EnregistrementCompte {
    id: number;
    categorie: any;
    cycle: any;
    dateEnregistrement: string;
    libelle: string;
    montant: number;
    user: any;
}