import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    public loginService: HttpService,
    private router: Router
  ) { }

  async ngOnInit() {
    try{
      await this.loginService.getUser();
    }catch(err){
      localStorage.removeItem('Auth-token');
      
      this.router.navigate(['/login']);
    }
  }

  logout(){
    this.loginService.logout()
    .then(() => {
      this.router.navigate(['/login'])
    })
  }
}
