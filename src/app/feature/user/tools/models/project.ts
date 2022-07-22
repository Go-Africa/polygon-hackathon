import { User } from "src/app/auth/tools/model/user";
import { Categorie } from "src/app/shared/tools/models/categorie";
import { Cycle } from "src/app/shared/tools/models/reporting/cycle";

export class Project {
  appUser: User;
  category: Categorie;
  date: string;
  debutProjet: string;
  descText: string;
  descriptionVideo: string;
  document: Document[];
  dureeCycle: string;
  etat: Etat;
  finProjet: string;
  image: string;
  title: string;
  lastInvestment: boolean;
  montantDemander: number;
  montantMinimum: number;
  montant_deman: number;
  pays: string;
  projId: number;
  projectImages: ProejectImage[]
  projectPdf: string;
  start: boolean;
  top3: boolean;
  currentBalance: number
  projectAddress: string
}

export class Etat {
  id:	number
  nomEtat: string
}

export class ProejectImage {
  description:	string
  id:	number
  image:	string
}

export class Document{
  documentId:	number
  documentName:	string
  type:	Type
  url:	string
}

export class Type{
  typeId:	number
  typeName:	string
}