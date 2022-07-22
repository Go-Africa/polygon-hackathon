import { ShareService } from './../../../../../../shared/services/share.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Project } from './../../../../../user/tools/models/project';
import { WebService } from './../../../../service/web.service';
import { Taux } from 'src/app/shared/tools/models/taux';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invest-opportunities',
  templateUrl: './invest-opportunities.component.html',
  styleUrls: ['./invest-opportunities.component.css']
})
export class InvestOpportunitiesComponent implements OnInit {
  tops: Array<Project> = [];
  loading = false;
  allTaux: Array<Taux> = [];
  constructor(private webService: WebService, public shared: ShareService) { }

  ngOnInit(): void {
    this.webService.getTopProjects()
      .subscribe(data => {
        this.tops = data;
        this.loading = true;
      },
        (error: HttpErrorResponse) => {
          console.log('Here the error:', error);
        });
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
