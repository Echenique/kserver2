import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_URL } from './provider';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  user: any;
  _authToken:any = undefined;

  constructor(private http: HttpClient) { }

  login(credentials:any) {
    return new Promise<void>((resolve, reject) => {
      this.http.post(`${SERVER_URL}/services/user/sigin`, credentials)
      .subscribe((resp) => {
        let user:any = resp
        this.user = user;
        this._authToken = user.token;
        localStorage.setItem('Auth-token', this._authToken);
        
        console.log('Login on: ', this.user.email);
        resolve();
      }, err => {
        reject(err)
      })
    });
  }
  
  logout(): Promise<void> {
    return new Promise(resolve => {
      localStorage.removeItem('Auth-token');
      //wsck.emit('logout', {token: this._authToken});
      resolve();
    })
  }
  
  isLoggedIn(): boolean {
    console.log(`has token: ${!!localStorage.getItem('Auth-token')}`);
    return !!localStorage.getItem('Auth-token');
  }
  
  getUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      if(!this.user){
        resolve( this.http.get(`${SERVER_URL}/services/user/check-auth`))
      }else{
        resolve(this.user);
      }
    })
  }

  async checkRoles(type: string){
    if(!this.user){
      await this.getUser();
    }
    return this.user.roles && (this.user.roles.indexOf(type) > -1)
  }
}

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let tk = localStorage.getItem('Auth-token') as string;
    if(tk){
      let headers = new HttpHeaders().set('Auth-token', tk);
      const clonedRequest = req.clone({ headers });
      return next.handle(clonedRequest);
    }
    return next.handle(req);
  }
}