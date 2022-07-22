import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Like } from 'src/app/auth/tools/model/like';
import { UserService } from 'src/app/feature/user/service/user.service';
import { Project } from 'src/app/feature/user/tools/models/project';

@Component({
  selector: 'app-project-likes',
  templateUrl: './project-likes.component.html',
  styleUrls: ['./project-likes.component.css']
})
export class ProjectLikesComponent implements OnInit {
  //for like
  @Input() project !: Project;
  @Input() userId!: number
  isLiked: boolean = false;
  likes = new Like();
  allLikes: any;
  likeDataHasLoaded: boolean = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
    this.onGetLike(this.project.projId, this.userId);
  }


  onGetLike(projId: number, userId: number) {
    this.userService.getLike(projId, userId).subscribe((data) => {
      this.likes = data;
      this.likeDataHasLoaded = true
      this.isLiked = data?.liked
    }, error => {
      this.likeDataHasLoaded = false // so impossible to know whether the current user has liked
    });
  }

  onReact(likeId) {
    if (this.isLiked || likeId) {
      this.onDislikeProject(likeId);
    } else {
      this.onLikeProject()
    }
  }

  onLikeProject() {
    this.likeDataHasLoaded = false;
    this.isLiked = true;
    this.likes = {
      appuser: {
        id: this.userId
      },
      id: undefined,
      liked: this.isLiked,
      project: {
        projId: this.project.projId
      }
    }
    this.userService.likeProject(this.likes).subscribe((data) => {
      this.likes = data;
      this.isLiked = true
      this.onGetLike(this.project.projId, this.userId);
      this.onGetTotalLikes(this.project.projId);
      this.likeDataHasLoaded = false;
    },
      (error) => {
        this.toast.error('Une erreur vient de se produire, veuillez réessayer ultérieurement')
        this.isLiked = false;
        this.likeDataHasLoaded = false;
      })
  }

  onDislikeProject(likeId) {
    this.likeDataHasLoaded = false;
    const likes = {
      appuser: {
        id: this.userId
      },
      id: likeId,
      liked: !this.isLiked,
      project: {
        projId: this.project.projId
      }
    }
    this.userService.dislikeProject(likes.id, likes).subscribe((data) => {
      this.onGetLike(this.project.projId, this.userId);
      this.onGetTotalLikes(this.project.projId);
      this.likeDataHasLoaded = true;
    },
      (error) => {
        this.toast.error('Une erreur vient de se produire, veuillez réessayer ultérieurement')
        this.likeDataHasLoaded = true;
      })
  }

  onGetTotalLikes(projId: number) {
    this.userService.getCountLikes(projId).subscribe((data) => {
      this.allLikes = data[0]?.totalLikes;
    },
      (error) => {
        this.toast.warning("Une erreur est survenue, veuillez vérifier votre connexion internet", "Error");
      })
  }


}
