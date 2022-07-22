import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import {ImageProject} from '../../../../../../shared/tools/models/image-project';

@Component({
  selector: 'app-project-image-gallery',
  templateUrl: './project-image-gallery.component.html',
  styleUrls: ['./project-image-gallery.component.css']
})
export class ProjectImageGalleryComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];
  @Input() default: string;
  @Input() images: ImageProject[];

  constructor() { }

  ngOnInit() {
    this.galleryOptions = [
      {
        width: '100%',
        height: '500px',
        thumbnailsColumns: 4,
        arrowPrevIcon: 'fa fa-chevron-left',
        arrowNextIcon: 'fa fa-chevron-right',
        imageAnimation: NgxGalleryAnimation.Rotate,
        imageAutoPlay: true,
        imageAutoPlayInterval: 5000,
        imageAutoPlayPauseOnHover: true
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    if (this.images.length > 0){
      for (const image of this.images) {
        this.galleryImages.push({
          small: image.image,
          medium: image.image,
          big: image.image
        });
      }
    }else{
      this.galleryImages.push({
        small: this.default,
        medium: this.default,
        big: this.default
      })
    }


    // this.galleryImages = [
    //   {
    //     small: 'https://preview.ibb.co/jrsA6R/img12.jpg',
    //     medium: 'https://preview.ibb.co/jrsA6R/img12.jpg',
    //     big: 'https://preview.ibb.co/jrsA6R/img12.jpg'
    //   },
    //   {
    //     small: 'https://preview.ibb.co/kPE1D6/clouds.jpg',
    //     medium: 'https://preview.ibb.co/kPE1D6/clouds.jpg',
    //     big: 'https://preview.ibb.co/kPE1D6/clouds.jpg'
    //   },
    //   {
    //     small: 'https://preview.ibb.co/mwsA6R/img7.jpg',
    //     medium: 'https://preview.ibb.co/mwsA6R/img7.jpg',
    //     big: 'https://preview.ibb.co/mwsA6R/img7.jpg'
    //   }, {
    //     small: 'https://preview.ibb.co/kZGsLm/img8.jpg',
    //     medium: 'https://preview.ibb.co/kZGsLm/img8.jpg',
    //     big: 'https://preview.ibb.co/kZGsLm/img8.jpg'
    //   },
    // ];
  }
}
