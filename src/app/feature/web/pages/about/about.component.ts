import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { PlyrComponent } from 'ngx-plyr';
import { AuthService } from 'src/app/auth/service/auth.service';
import { UserStorageService } from 'src/app/shared/services/user-storage.service';
import { WebService } from '../../service/web.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false,
  };
  @ViewChild(PlyrComponent)
  plyr: PlyrComponent;

  // or get it from plyrInit event
  player: Plyr;

  videoSources: Plyr.Source[] = [
    // {
    //   src: './assets/video/GoAfrica.mp4',
    //   provider: 'html5',
    // },
    {
      src: 'xZcAmMJM75A',
      provider: 'youtube',
    },
  ];

  auth = false;
  hasInit(event) {
    console.log("player", event);
    // this.player = event;
    // if (this.project.descriptionVideo) {
    //   this.videoSources[0].src = this.project.descriptionVideo;
    // } else {
    //   this.videoSources[0].src = "xHR_bCioa7s"
    // }
  }
  played(event: Plyr.PlyrEvent) {
    console.log('played', event);
  }
  user: any;
  constructor(private modalService: NgbModal, private scroll: ScrollToService, private title: Title, private webService: WebService, private uStore: UserStorageService, private authService: AuthService) {
    title.setTitle('Go Africa | A propos de nous');
    scroll.scrollTo({
      target: '#home',
      duration: 10
    });
  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.auth = true;
      this.uStore.getUser().subscribe(
        data => {
          this.user = data;
        }
      )
    }
    // this.user = this.webService.getUser();
  }

  /**
    * Open modal for show the video
    * @param content content of modal
    */
  openWindowCustomClass(content: any) {
    this.modalService.open(content, { windowClass: 'dark-modal', size: 'lg', centered: true });
  }


}
