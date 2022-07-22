import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/feature/user/tools/models/project';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Taux } from 'src/app/shared/tools/models/taux';
import { Title } from '@angular/platform-browser';
import { UserStorageService } from 'src/app/shared/services/user-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/auth/service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-projects',
  templateUrl: './user-projects.component.html',
  styleUrls: ['./user-projects.component.css']
})

export class UserProjectsComponent implements OnInit, AfterViewInit {
  projectsTabs = true;
  myProjects!: Array<Project>;
  loading = false;
  allTaux: Array<Taux> = [];
  imageUrl = '/assets/images/upload-img.svg';
  @ViewChild('content') myModal!: ElementRef;
  user: any;
  constructor(public modal: NgbModal, private uStore: UserStorageService, private toast: ToastrService, public userService: UserService, private scroll: ScrollToService, private activeRoute: ActivatedRoute, private title: Title, private authService: AuthService) {
    title.setTitle('Go Africa | My Account | Mes projets');
    // this.user  = UserStorageService.user;
  }

  ngOnInit(): void {
    let data = this.activeRoute.snapshot.queryParams.show;

    if (data && (data === 'all')) {
      this.change();
    }
    this.uStore.getUser().subscribe(data => {
      this.user = data;
      this.getMyProjects(data.id);
    }, (error: HttpErrorResponse) => {
      if (!error.ok) {
        const u: any = localStorage.getItem('currentUser');
        this.user = JSON.parse(u);
      }
      if (error.status == 0) {
        this.toast.warning("Conexion problem, Refresh this page!", "Warning");
      }
      this.myProjects = [];
    });
  }

  ngAfterViewInit(): void {
    if (this.activeRoute.snapshot.queryParams.invest) {
      this.addProject(this.myModal)
    }
  }
  getMyProjects(id: number) {
    this.loading = false;
    this.userService.getUserProjects(id)
      .subscribe((data: any) => {
        this.myProjects = data;

        this.loading = true;
      });
  }

  addProject(content: any): void {
    this.modal.open(content, {
      centered: true,
      size: 'xl',
      scrollable: true,
    });
  }

  change(): void {
    if (this.projectsTabs === false) {
      this.projectsTabs = true;
      this.title.setTitle('Go Africa | My Account | Mes projets');
    } else {
      this.projectsTabs = false;
    }
  }

  getTaux(proj: Project): string {
    const rate = (proj.currentBalance / proj.montantDemander)*100;
    return rate >= 100 ? '100' : rate.toPrecision(2);
  }
}
