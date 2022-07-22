import { WebService } from './service/web.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DefaultCurrencyComponent } from './tools/components/web/default-currency/default-currency.component';
import { UserStorageService } from 'src/app/shared/services/user-storage.service';

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.css']
})
export class WebComponent implements OnInit, AfterViewInit {
  wait = false;
  constructor(private webService: WebService, public modal: NgbModal, private uStore: UserStorageService) { }
  ngAfterViewInit(): void {
    // this.modal.open(DefaultCurrencyComponent, { centered: true, backdrop: true });
  }

  ngOnInit(): void {
  }

  

}
