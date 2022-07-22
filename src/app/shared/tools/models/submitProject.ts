import { User } from "src/app/auth/tools/model/user";
import { Etat, Project } from "src/app/feature/user/tools/models/project";

export class SubmitProject {
  descText!: string;
  descVid!: string;
  title!: string;
  montantContri!: number;
  montantDeman!: number;
}

export class ProjectContributions {
  investments: Array<any>;
  currentBalance: any;
  goalAmount: any
}

export interface Investment {
  investDate: string
  userId: number
  email: string
  investorAddress: string;
  amount: number;
}

export class Invest {
  appuser: User
  date: string
  etat: Etat
  investId: number
  montant: number
  opHash: string
  project: Project
} 
