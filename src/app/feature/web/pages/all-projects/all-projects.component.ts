import { ShareService } from './../../../../shared/services/share.service';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/feature/user/tools/models/project';
import { Categorie } from 'src/app/shared/tools/models/categorie';
import { WebService } from '../../service/web.service';
import { Title } from '@angular/platform-browser';
import { Taux } from 'src/app/shared/tools/models/taux';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
})
export class AllProjectsComponent implements OnInit {

  categories!: Categorie[];
  projects: Project[]= [] ;
  //project = new Project();
  default: Project[]= [] ;
  founded: boolean = false
  p: number = 1;
  totalRecords!: number;
  search: any;
  loadprojs = false;
  id!: number;

  spin!: boolean;
  allTaux: Array<Taux> = [];
  constructor(public webSer: WebService, private activatedRoute: ActivatedRoute, private scrool: ScrollToService, public shared: ShareService, private title: Title) {
    title.setTitle('Go Africa | Tous les projets');
    scrool.scrollTo({
      target: '#home',
      duration: 10
    });
  }


  ngOnInit(): void {
    this.onGetCategories();

    this.id = +this.activatedRoute.snapshot.queryParams.catId;
    if(this.id){

      this.webSer.getProjects().subscribe( (data: any) => {
        this.loadprojs = true;
        this.default = data;
        for (const proj of data) {
          let cat = proj.category.id
          if(cat === this.id){
           this.projects.push(proj);
          }
        }
        this.totalRecords = this.projects.length;
      });
    }
    else{
      this.onGetAllAcceptedProjects().then((p: any)=>{
        this.projects = p;
        // console.log(this.projects);
        this.default = p;
        this.totalRecords = this.projects.length;

      });
    }

   // console.log(this.activatedRoute.snapshot.queryParams.catId);
  }

  onChangeCategorie(name: any){
    // console.log("nom de la catégorie: "+name);

    this.onGetAllAcceptedProjects().then((p: any)=>{
      this.default = p;
      this.projects = p;
      let info = [];
      if (name) {
        for (const proj of this.projects) {
          if(proj.category.nomCategorie === name ){
           info.push(proj);
          }
        }
      }else {
        info = this.projects
      }
      this.projects = info;
      this.totalRecords = this.projects.length;
      // console.table("Pojects: "  +this.projects+ "Nombre: "+this.totalRecords);
    });
  }

  onCatchCategorieId(id: any){
    // console.log("id de la catégorie: "+id);

    let info = [];
   for (const proj of this.projects) {
     if(proj.category.id === id){
      info.push(proj);
     }
   }
   this.projects = info;
  }

  onGetCategories(){
    this.webSer.getCategories().subscribe( (data: any ) => {
      this.categories = data;
    //  console.log("Categories :" +this.categories);
    },err => {
      // console.log("error: ", err)
    })
  }

  onGetAllAcceptedProjects() {
    return new Promise((resolve, reject)=>{
      this.loadprojs = false;
      this.webSer.getProjects().subscribe( (data: any) => {
        this.loadprojs = true;
       // this.projects = data;
        resolve(data);
      },
      (error)=> {
        reject(error);
        this.loadprojs =true;
      })
    })


  }

  getTaux(proj: Project): string {
    const rate = (proj.currentBalance / proj.montantDemander)*100;
    return rate >= 100 ? '100' : rate.toPrecision(2);
  }

  firstCountry(pays: string = '') {
    let data = pays.split(";");
    if (data.length > 0) {
      return data[0];
    }

    return "Cameroon";
  }
}


