import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private scroll: ScrollToService, private title: Title) { 
    title.setTitle('Go Africa | Page d\'accueil'); 
    scroll.scrollTo({
      target: '#home',
      duration: 10
    });
  }

  ngOnInit(): void {
  }

}
