import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {

  constructor(private modalService: NgbModal) { }

  openVerticallyCentered() {
    const modRef = this.modalService.open(ModalComponent, { centered: true });
  
    modRef.componentInstance.title = '¡Bienvenido!';
  }

}
