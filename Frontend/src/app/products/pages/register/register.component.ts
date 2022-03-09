import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public deptos: string[] = [
    'Atlántida', 'Choluteca', 'Colón', 'Comayagua', 'Copán', 'Cortés', 'El Paraíso', 
    'Francisco Morazán', 'Gracias a Dios', 'Intibucá', 'Islas de la Bahía', 'La Paz', 'Lempira',
    'Ocotepeque', 'Olancho', 'Santa Bárbara', 'Valle', 'Yoro'
  ];

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal) {}

  openLogin(): void{
    // this.activeModal.close();
    this.modalService.dismissAll();
    this.modalService.open(LoginComponent, {centered: true});
  }
  
  registerForm = new FormGroup({
    formName: new FormControl('', Validators.required),
    formLastName: new FormControl('', Validators.required),
    formEmail: new FormControl('', [Validators.required, Validators.email]),
    formPhone: new FormControl('', Validators.required),
    formCity: new FormControl('', Validators.required),
    formDirection: new FormControl('', Validators.required),
    formPassword: new FormControl('', Validators.required),
  });
  

  
  Register(){
    console.log(this.registerForm);
    console.log(this.registerForm.valid);
  }
  
}
