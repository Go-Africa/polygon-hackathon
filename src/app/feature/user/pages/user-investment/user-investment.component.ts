import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { UserService } from '../../service/user.service';
import { Taux } from 'src/app/shared/tools/models/taux';
import { Title } from '@angular/platform-browser';
import { ShareService } from 'src/app/shared/services/share.service';
import { UserStorageService } from 'src/app/shared/services/user-storage.service';
import { AuthService } from 'src/app/auth/service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-investment',
  templateUrl: './user-investment.component.html',
  styleUrls: ['./user-investment.component.css']
})
export class UserInvestmentComponent implements OnInit {
  @ViewChild(DatatableComponent) table: any;
  invests!: Array<any>;
  default!: Array<any>;
  loading = false;
  investsTabs = true;
  user: any;
  usage = false;
  edit: boolean = false;

  constructor(private route: ActivatedRoute, public userService: UserService, private authService: AuthService, private toast: ToastrService, private uStore: UserStorageService, private modal: NgbModal, private scrool: ScrollToService, private title: Title, public shared: ShareService) {
    title.setTitle('Go Africa | My Account | My investments');
  }

  ngOnInit(): void {
    let data = this.route.snapshot.queryParams.show;

    if(data && (data==='all')) {
      this.change();
    }
    this.uStore.getUser().subscribe(data => {
      this.user = data;
      this.initData(data.id);
    }, (error: HttpErrorResponse) => {
      if(!error.ok) {
        const u: any = localStorage.getItem('currentUser');
        this.user = JSON.parse(u);
      }
      if (error.status == 0) {
        this.toast.warning("Conexion problem, Refresh this page!","Warning");
      }
      this.invests = [];
    });
    this.scrool.scrollTo({
      target: '#home',
      duration: 10
    });
  }

  initData(id: number): void {
    this.loading = false;

    this.userService.getUserInvestments(id)
    .subscribe((data: any) => {

      this.invests = data.reverse();
      this.default = data;
      this.loading = true;
      this.usage = true;
    });
  }

  change(): void {
    if(this.investsTabs === false){
      this.investsTabs = true;
      this.title.setTitle('Go Africa | My Account | My investments');
    }else{
      this.investsTabs = false;
    }
  }

  shown(value: any): void{
  }
  color(value: any): string{
    switch (value.toLowerCase()) {
      case 'approuvé' :
        return 'bg-primary';
      case 'terminée' :
        return 'bg-primary';
      case 'refusé' :
        return 'bg-danger';
      default:
        return 'bg-warning';
    }
  }
}
