import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from '../../http.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  
  constructor(
    private loginService: HttpService,
    private router: Router
  ){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(!this.loginService.isLoggedIn()){
        this.router.navigate(['/login'], { queryParams: { redirectUrl: state.url } });
        return false;
      } else if(state.url === '/') {
        this.router.navigate(['/hoteis'])
      }

      return true;
  }
  
}
