import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']

})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  isSubmitted = false;
  redirectUrl: any = '';
  error:any = '';

  constructor(
    private formBuilder:FormBuilder,
    private loginService:HttpService,
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.redirectUrl = this.activatedRoute.snapshot.queryParamMap.get('redirectUrl') || '/hoteis';
    console.log(this.redirectUrl)
  }

  async submit(){
    this.redirectUrl = this.activatedRoute.snapshot.queryParamMap.get('redirectUrl') || '/hoteis';
    // this.isSubmitted = true;
    if(this.loginForm.invalid) {
      this.error = 'Informe Usuário e Senha!';
      return
    };

    let credentials = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    }

    try{
      await this.loginService.login(credentials)
      this.router.navigateByUrl(this.redirectUrl);
    }catch(e:any){
      this.toastr.warning('Usuário ou senha invalida');
      //this.error = e;
    }
  }
}
