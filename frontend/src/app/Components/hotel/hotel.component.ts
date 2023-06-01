import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent {
  filter: any = '';
  hoteis:any = [];
  
  constructor(
    private httpService:HttpService,
    private toastr: ToastrService
  ) { }
    
  ngOnInit(): void {
    
  }
}
