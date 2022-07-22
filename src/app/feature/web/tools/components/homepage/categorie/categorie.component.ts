import { WebService } from './../../../../service/web.service';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ShareService } from 'src/app/shared/services/share.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
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
  categories!: any
  loading = false;

  constructor(private webService: WebService, public share: ShareService) { }

  ngOnInit(): void {
    this.loading = false;
    this.webService.getAllCategoriesProjectsNumber()
    .subscribe(data => {
      this.categories = data;

      this.loading = true;
    });
  }

}
