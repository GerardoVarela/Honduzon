import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:['./login.component.css']
})
export class LoginComponent {

  constructor(public activeModalLogin: NgbActiveModal, private modalService: NgbModal) { }

  openRegister(){
    this.modalService.dismissAll();
    this.modalService.open(RegisterComponent, {centered: true});
  }

}
