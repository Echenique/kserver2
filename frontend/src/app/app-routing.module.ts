import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { MainComponent } from './Components/main/main.component';
import { LoginGuard } from './Components/login/login.guard';
import { HotelComponent } from './Components/hotel/hotel.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: 'hoteis',
        component: HotelComponent
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }