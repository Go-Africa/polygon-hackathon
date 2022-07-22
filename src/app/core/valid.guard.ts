import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidGuard implements CanActivate {
  constructor(private authService: AuthService, public router: Router, private toast: ToastrService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isAdmin()) {
      this.toast.warning("Non authorisé", "Warning");
      return this.router.navigate(['/me']);
    }
    return true;
  }
}
