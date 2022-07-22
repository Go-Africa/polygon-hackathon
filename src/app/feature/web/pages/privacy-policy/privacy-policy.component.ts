import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

@Component({
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {

  constructor(private title: Title, private scroll: ScrollToService) {
    title.setTitle('Go Africa | Privacy Policy');
    scroll.scrollTo({
      target: '#home',
      duration: 20
    });
  }
  
  ngOnInit(): void {
  }

}
