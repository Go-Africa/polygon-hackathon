import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ShareService } from 'src/app/shared/services/share.service';

@Component({
  selector: 'app-skeleton-loading-data',
  templateUrl: './skeleton-loading-data.component.html',
  styleUrls: ['./skeleton-loading-data.component.css']
})
export class SkeletonLoadingDataComponent implements OnInit {
  @Input() dataType!: string;

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
        items: 3
      }
    },
    nav: false
  };
  constructor(public shared: ShareService) { }

  ngOnInit(): void {
  }

}
