import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UploadFileService } from 'src/app/shared/services/upload-file.service';
import { Title } from '@angular/platform-browser';
import { ProjectService } from 'src/app/shared/services/project.service';
import { Project } from '../../models/project';
import { UserService } from '../../../service/user.service';
import { Categorie } from 'src/app/shared/tools/models/categorie';
import { WebService } from 'src/app/feature/web/service/web.service';
import { ToastrService } from 'ngx-toastr';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserStorageService } from 'src/app/shared/services/user-storage.service';

@Component({
  selector: 'app-form-project',
  templateUrl: './form-project.component.html',
  styleUrls: ['./form-project.component.css'],
})
export class FormProjectComponent implements OnInit {

  @Output() valueChange = new EventEmitter();


  projectForm!: FormGroup;
  project = new Project();
  categories!: Categorie[];

  sent = false;
  load = false;
  progress = 0;


  imageUrl = '/assets/images/upload-img.svg';
  fileToUpload: any;
  selectedFile!: File;

  user: any;



  constructor(private fb: FormBuilder, private fileService: UploadFileService, private toast: ToastrService,
    private projectService: UserService, private scroll: ScrollToService, private title: Title,
    private webService: WebService, private router: Router, public modal: NgbModal, private uStore: UserStorageService,) {
    title.setTitle('Go Africa | Soumettez votre projet');
    this.scrollToTop();
  }

  ngOnInit(): void {
    this.uStore.getUser().subscribe((data) => {
      this.user = data;
    })
    this.initForm();
    this.onGetCategories();
  }

  scrollToTop(): void {
    this.scroll.scrollTo({
      target: '#home',
      duration: 10
    });
  }

  onGetCategories(): void {
    this.webService.getCategories().subscribe((data: any) => {
      this.categories = data;
    }, err => { })
  }

  initForm(): void {
    this.projectForm = this.fb.group(
      {
        title: [this.project.title, Validators.compose([Validators.required, Validators.minLength(5)])],
        category: [this.project.category, [Validators.required]],
        descText: [this.project.descText, Validators.compose([Validators.required, Validators.minLength(10)])],
        descriptionVideo: [this.project.descriptionVideo],
        montantDemander: [this.project.montantDemander, [Validators.required]],
        montantMinimum: [this.project.montantMinimum],
        image: ['']
      })
  }

  /* Fonction permettant de réinitialiser le formulaire après l'avoir soumis
 il réinitialise les champs du formulaire mais ne fait pas apparaître les validators
 messages*/
  resetForm(form: FormGroup) {

    form.reset();

    Object.keys(form.controls).forEach(key => {
      form.get(key)?.setErrors(null);
    });
  }

  /* Fonction retournant vrai si tous les champs sont nuls et faux si au moins un champ n'est pas nul*/
  onVerifyProjectFormIsNull(): boolean {
    return this.projectForm.get('title')?.value === null && this.projectForm.get('category')?.value === null
      && this.projectForm.get('descText')?.value === null && this.projectForm.get('descriptionVideo')?.value === null
      && this.projectForm.get('montantDemander')?.value === null && this.projectForm.get('montantMinimum')?.value === null;
  }

  onSelectFile(event: any): void {
    this.selectedFile = event?.target.files[0];
  }

  handleFileInput(event: any): void {

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.fileToUpload = event.target.files[0];

      // Show image preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(this.fileToUpload);

      this.projectForm.get('image')?.updateValueAndValidity()
    }
  }

  resetFile(): void {
    this.imageUrl = '/assets/images/upload-img.svg';
  }

  onUploadFile(file: any) {
    this.fileService.addFile(file).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total! * 100);
          console.log(`Uploaded! ${this.progress}%`);
          break;
        case HttpEventType.Response:
          console.log('File successfully uploaded!', event.body);
          setTimeout(() => {
            this.progress = 0;
          }, 1500);
      }
    });
  }

  createProject(project: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.projectService.submitProject(project).subscribe((data: any) => {
        this.load = false;
        resolve(data);
      },
        (error) => {
          reject(error);
          this.load = false;
          this.toast.error("An error has occured", "Failed");
        })
    })
  }

  async onSubmitProject() {
    // const isAllNull: boolean = this.onVerifyProjectFormIsNull();
    this.load = true;
    this.sent = true;

    if (this.fileToUpload && this.projectForm.valid) {
      try {
        this.toast.info("We are uploading your project image", "Info");
        const url = await this.fileService.addFile(this.fileToUpload).toPromise();

        const project = {
          category: {
            id: +this.projectForm.get('category')?.value
          },
          descText: this.projectForm.get('descText')?.value,
          descriptionVideo: this.projectForm.get('descriptionVideo')?.value,
          title: this.projectForm.get('title')?.value,
          montantMinimum: this.projectForm.get('montantMinimum')?.value,
          montantDemander: this.projectForm.get('montantDemander')?.value,
          appUser: {
            id: +this.user.id
          },
          image: url.response
        };

        try {
          const sendData = await this.createProject(project);
          this.toast.success("Your project is now created...", "Success");
          console.log("user id:", this.user.id);
          this.valueChange.emit(this.user.id); // Update parent components
          this.modal.dismissAll();
        } catch (e) {
          this.toast.error("An error has occured; unable to create the project", "Error");
          this.load = false;
          this.modal.dismissAll();
        }
      } catch (e) {
        console.log("Error",e);
        this.load = false;
        this.toast.error("Unable to upload project file", "Choose another and try again");
      }

      this.scrollToTop();
    }
  }
}
