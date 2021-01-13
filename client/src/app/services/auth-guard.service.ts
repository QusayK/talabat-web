import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanActivate,
         ActivatedRouteSnapshot,
         RouterStateSnapshot,
         UrlTree,
         Router
} from '@angular/router';

import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private token: TokenStorageService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot):
  boolean |
  UrlTree |
  Promise<boolean | UrlTree> |
  Observable<boolean | UrlTree> {

  return this.token.getToken() ? true : this.router.createUrlTree(['/auth']);
  }
}
