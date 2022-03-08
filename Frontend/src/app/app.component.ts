import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from './products/pages/login/login.component';
import { RegisterComponent } from './products/pages/register/register.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'honduzon';

  constructor(private modalService: NgbModal){}

  openRegister(){
    const modRef = this.modalService.open(RegisterComponent, { centered: true });
  }
  
  openLogin(){
    const modRef = this.modalService.open(LoginComponent, { centered: true });
  }

}
