import { Cycle } from './../../../../shared/tools/models/reporting/cycle';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from "@angular/forms";
import { DomSanitizer, Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd, Event } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/service/auth.service';
import { User, Wallet } from 'src/app/auth/tools/model/user';
import { UserService } from 'src/app/feature/user/service/user.service';
import { Project } from 'src/app/feature/user/tools/models/project';
import { ShareService } from 'src/app/shared/services/share.service';
import { UserStorageService } from 'src/app/shared/services/user-storage.service';
import { Taux } from 'src/app/shared/tools/models/taux';
import { WebService } from '../../service/web.service';

import { Like } from 'src/app/auth/tools/model/like';
import { PlyrComponent } from 'ngx-plyr';
import { ImageProject } from '../../../../shared/tools/models/image-project';
import { Invest, ProjectContributions } from 'src/app/shared/tools/models/submitProject';
import Web3 from 'web3';

// Provider for goerli 
export const PROVIDER = "https://eth-goerli.g.alchemy.com/v2/yLafHt5uip0F_4CLSvkI6grjY1VvLIDu";

@Component({
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})


export class ProjectDetailsComponent implements OnInit {
  /* investment options */
  // options: {
  //   feeLimit: 100000000,
  //   callValue: 0
  // };

  project !: Project;
  // cycles: Cycle[];
  cats !: Array<any>;
  projects !: Array<Project>;
  investors!: ProjectContributions;
  user = new User();
  totalToPay = 0;

  // Project contract variable
  projectContract: any

  loading = false;
  loadCats = false;

  send = false;
  investForm = new FormGroup({
    amount: new FormControl(1, [Validators.required, Validators.min(1)])
  });
  submitted = false;

  // Only for documents
  regCommerce: any;
  businessPlan: any;
  planLocalisation: any;

  @ViewChild(PlyrComponent)
  plyr: PlyrComponent;

  // or get it from plyrInit event
  player: Plyr;

  videoSources: Plyr.Source[] = [
    {
      src: 'xHR_bCioa7s',
      provider: 'youtube',
    },
  ];
  images: ImageProject[] = [];

  constructor(private webService: WebService, private router: Router, private scroll: ScrollToService,
    public modal: NgbModal, private toast: ToastrService, public shared: ShareService,
    public activeRoute: ActivatedRoute, private title: Title, private uStore: UserStorageService,
    private authService: AuthService, private userService: UserService, private sanitizer: DomSanitizer) {
    scroll.scrollTo({
      target: '#home',
      duration: 10
    });
  }

  played(event: Plyr.PlyrEvent) {
    console.log('played', event);
  }

  stop(): void {
    this.player.stop(); // or this.plyr.player.play()
  }
  ngOnInit(): void {
    this.initData();
  }

  hasInit(event) {
    console.log("player", event);
    this.player = event;
    if (this.project.descriptionVideo) {
      this.videoSources[0].src = this.project.descriptionVideo;
    } else {
      this.videoSources[0].src = "xHR_bCioa7s"
    }
  }

  videoURL(url) { }

  // Intialise the page
  async initData() {
    try {
      this.user = await this.uStore.getUser().toPromise();
      this.initAll(this.activeRoute.snapshot.params.id);
    } catch (error) {
      this.toast.warning("Connect to internet !");
    }
    // this.uStore.getUser().subscribe(data => {
    //   this.user = data;
    //   // Get all data now
    //   this.initAll(this.activeRoute.snapshot.params.id);
    // }, (error: HttpErrorResponse) => {
    //   if (!error.ok) {
    //     const u: any = localStorage.getItem('currentUser');
    //     this.user = JSON.parse(u)
    //     // this.initAll(this.activeRoute.snapshot.params.id);
    //   }
    // });
  }

  // For project's details
  async initAll(id: string) {
    this.loading = false;
    this.loadCats = false;

    try {
      this.project = await this.webService.getOneProject(parseInt(id, 10)).toPromise();

      if (this.project.etat?.nomEtat?.toLowerCase().startsWith("pen")) {
        this.toast.info("Your project is not approved yet !", "Be patient");
        this.router.navigate(["/me"]);
        return;
      }
      let resultInvest = await this.webService.getAllInvestmentForOneProject(this.project.projectAddress).toPromise();

      /* Set data */
      this.investors = resultInvest.data;
      this.images = this.project.projectImages;
      this.title.setTitle('Go Africa | Détails | ' + this.project.title);
      this.loading = true;

      /* Load categories */
      this.cats = await this.webService.getAllCategoriesProjectsNumber().toPromise();
      this.loadCats = true;
    } catch (error) {
      this.toast.error("Unable to retrieve project infos", "Retry");
    }
  }

  // init the project contract
  async initProjectContract() {

  }

  play(content: any): void {
    this.send = false;
    this.modal.open(content, {
      centered: true,
      size: 'lg'
    });
  }

  showInvestor(investor: any): void {
    this.modal.open(investor, {
      centered: true,
      scrollable: true
    });
  }

  showinProgressPay(content: any) {
    this.modal.open(content, { centered: true, backdrop: false });
  }

  getTaux(proj: Project): string {
    const resAmount = (parseInt(this.investors.currentBalance?.hex) / parseInt(this.investors.goalAmount?.hex));
    const rate = resAmount * 100;
    return rate >= 100 ? '100' : rate.toPrecision(2);
  }


  chooseInvest(invest: any): void {
    this.modal.dismissAll();
    this.modal.open(invest, { centered: true });
  }

  // For stripe payment
  reloadData(): void {
    this.modal.dismissAll();
    this.initAll(this.activeRoute.snapshot.params.id);
  }

  documentInfo() {
    for (const doc of this.project.document) {
      switch (doc?.type?.typeId) {
        case 1:
          this.businessPlan = doc;
          break;
        case 2:
          this.regCommerce = doc;
          break;
        case 3:
          this.planLocalisation = doc;
          break;
        default:
          continue
      }
    }
  }

  investApproved(): boolean {
    console.log("Check for approbation", this.investors.investments);
    for (const invest of this.investors.investments) {
      if (this.convertNumber(invest[1]) == this.user.id) {
        return true;
      }
    }
    return false;
  }

  /* Invest modal */
  investNow(invest: any): void {
    if (window.ethereum) {
      this.modal.dismissAll();
      this.modal.open(invest, {
        centered: true,
        backdrop: false,
        backdropClass: 'bg-light'
      });
    } else {
      this.toast.info("Please connect to your wallet or download the tronlink wallet extension");
    }
  }

  async buyPart() {
    this.send = true;
    if (this.investForm.invalid) {
      this.toast.error("Fill all the fields !", "Error");
      this.send = false;
    } else {
      let amt = this.investForm.value.amount as number;
      let restPart = this.getPart();
      if (amt > restPart) {
        this.send = false;
        this.toast.warning("The rest of shares is just " + restPart + " in this project");
      } else if (amt <= 0) {
        this.send = false;
        this.toast.error('You must invest at least 1 share', 'Error');
      } else if ((amt % 2 !== 0) && (amt % 2 !== 1)) {
        this.toast.warning('Correct you info before sending', 'Warning');
        this.send = false;
      } else {

        /* Start investment */
        // if (this.investApproved()) {
        //   // addPart(uint256 amount, address oldAddress, bool changeAddress)
        //   try {
        //     let parameter = [
        //       {
        //         type: 'uint256',
        //         value: amt*this.project.montantMinimum*1e6,
        //       }
        //     ];
        //     // const txn = await window.tronWeb.transactionBuilder.triggerSmartContract(
        //       // window.tronWeb.address.toHex(this.project.projectAddress),
        //     //   "addPart(uint256)",
        //     //   {},
        //     //   parameter
        //     // );

        //     console.log("Transaction", txn);
        //     const signedtxn = await window.tronWeb.trx.sign(txn.transaction);
        //     const response = await window.tronWeb.trx.sendRawTransaction(signedtxn);

        //     if (response.result) {
        //       const invest = new Invest();
        //       invest.appuser = this.user;
        //       invest.date = new Date().toISOString();
        //       invest.montant = amt*this.project.montantMinimum;
        //       invest.opHash = txn.transaction.txID;
        //       invest.project = this.project;

        //       this.webService.investToAProject(invest)
        //       .subscribe(data => {
        //         this.toast.success('You are now a shareolder of this project', 'Congratulation');
        //         this.toast.info('You will receive a mail with your contract', 'Info');
        //         this.modal.dismissAll();
        //         location.reload();
        //       });
        //     }
        //   } catch (error) {
        //     this.toast.error(error, "An error occured");
        //     this.send = false;
        //   }
        // } else {
        //   try {
        //     let parameter = [
        //       {
        //         type: 'string',
        //         value: new Date().toISOString(),
        //       },
        //       {
        //         type: 'uint256',
        //         value: this.user.id,
        //       },
        //       {
        //         type: 'uint256',
        //         value: amt * this.project.montantMinimum * 1e6,
        //       },
        //       {
        //         type: 'string',
        //         value: this.user.email,
        //       }
        //     ];

        //     const txn = await window.tronWeb.transactionBuilder.triggerSmartContract(
        //       window.tronWeb.address.toHex(this.project.projectAddress),
        //       "invest(string,uint256,uint256,string)",
        //       {},
        //       parameter
        //     );

        //     console.log("Transaction", txn);
        //     const signedtxn = await window.tronWeb.trx.sign(txn.transaction);
        //     const response = await window.tronWeb.trx.sendRawTransaction(signedtxn);

        //     if (response.result) {
        //       const invest = new Invest();
        //       invest.appuser = this.user;
        //       invest.date = new Date().toISOString();
        //       invest.montant = amt * this.project.montantMinimum;
        //       invest.opHash = txn.transaction.txID;
        //       invest.project = this.project;

        //       this.webService.investToAProject(invest)
        //         .subscribe(data => {
        //           this.toast.success('You are now a shareolder of this project', 'Congratulation');
        //           this.toast.info('You will receive a mail with your contract', 'Info');
        //           this.modal.dismissAll();
        //           location.reload();
        //         });
        //     }
        //   } catch (error) {
        //     this.toast.error(error, "An error occured");
        //     this.send = false;
        //   }
        // }
      }

    }
  }

  /* get rest of shares */
  getPart() {
    const restAmount = (parseInt(this.investors.goalAmount?.hex) - parseInt(this.investors.currentBalance?.hex)) / 1e6;
    const goalAmount = parseInt(this.investors.goalAmount);

    return (restAmount / this.project.montantMinimum);
  }


  /* Convert BigNumber hex to number */
  convertNumber(nber) {
    return parseInt(nber?.hex);
  }
}
