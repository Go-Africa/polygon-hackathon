import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/feature/user/service/user.service';
import { Comment } from 'src/app/auth/tools/model/comment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Project } from 'src/app/feature/user/tools/models/project';

@Component({
  selector: 'app-project-comments',
  templateUrl: './project-comments.component.html',
  styleUrls: ['./project-comments.component.css']
})
export class ProjectCommentsComponent implements OnInit {
  comments !: Comment[];
  commentForm: FormGroup;
  sent = false;
  load = false;
  loadComments = true;
  @Input() project !: Project;
  @Input() userId!: number

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      comment: ['', Validators.required]
    });

    this.getComments(this.project.projId)
  }

  /* Fonction retournant vrai si tous les champs sont nuls et faux si au moins un champ n'est pas nul*/
  onVerifyContactFormIsNull(): boolean {
    return this.commentForm.get('comment')?.value === null;
  }

  onSendComment() {
    const isAllNull: boolean = this.onVerifyContactFormIsNull();
    this.sent = true;
    this.load = true;
    if (this.commentForm.valid && !isAllNull) {
      const comment = {
        appuser: {
          id: this.userId
        },
        comments: this.commentForm.get('comment').value,
        project: {
          projId: this.project.projId
        },
        date: Date.now()
      }
      this.userService.sendComment(comment).subscribe((data) => {
        this.load = false;
        this.toast.success('Vous avez ajouté un nouveau commentaire', 'Success');
        // console.log("le commentaire: ", comment.comments);
        this.getComments(this.project?.projId);
      },
        (error) => {
          this.toast.error("Une erreur vient de se produire, réessayez ultérieurement", "Echec");
          this.load = false;
        })
      /** Réinitialisation du formulaire après envoi*/
      this.resetForm(this.commentForm);
    } else {
      this.toast.error("Vous n'avez écrit aucun commentaire", "Echec");
      this.load = false;/* Condition nécessaire pour l'affichage des validators messages, elle est complémentaire à la fonction
      resetForm() qui initialisait le formulaire mais ne laissait pas apparaître les validators messages*/
      if (isAllNull) {
        this.commentForm.reset()
      }
    }
  }

  getComments(id: number) {
    this.loadComments = true;
    this.userService.getAllCommentsByProject(id).subscribe((data: any) => {
      this.comments = data;
      this.loadComments = false;
    })
  }

  onDeleteComment(id: number) {
    this.userService.deleteOneComment(id).subscribe((data) => {
      this.toast.warning('Commentaire supprimé');
      this.getComments(this.project?.projId);
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
}
