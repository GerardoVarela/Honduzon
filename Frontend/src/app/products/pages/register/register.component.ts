import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [` 
    h2{
    color: #47525E;
    }

    .modal-header{
    border-bottom: 0px;
    }

    .modal-body{
    padding-top: 0px;
    }

    .form-floating{
    margin: 0% 15%;
    }

    .border-bottom-custom{
      border-right-width: 0px;
      border-left-width: 0px;
      border-top-width: 0px;
      border-bottom-width: 1px;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      border-bottom-style: solid;
      border-bottom-color: #ced4da;
    }

    .form-control:focus{
    border-bottom-color: #8190A5!important;
    outline: none;
    box-shadow: 0 0 0 0px; 
    }

    .btn-primary{ 
    background-color: #00BCE4;
    color: white;
    border: none;
    border-radius: 20px;
    }

    .btn{
    margin-top: 5%;
    margin-bottom: 10px;
    margin-left: 10%;
    margin-right: 10%;
    width: 325px;
    }

    .btn:focus{
    box-shadow: 0 0 0 0px;
    background-color: #00D0FF;
    }

    .btn:hover{
    background-color: #00D0FF;
    }

    .btn-close:focus{
    box-shadow: 0 0 0 0px;
    }

    #texto{
    font-size: 16px;
    color: #8190A5;
    text-decoration: none;
    padding-left: 10px;
    padding-right: 10px;
    }

    #formSelect{
      margin: 2% 15%;
      margin-bottom: 0%!important;
      width: 326px;
      max-height: 100px;
      padding: 10px;
    }
    
    select:focus-visible{
      outline: none;
    }
  `]
})
export class RegisterComponent {

  public deptos: string[] = [
    'Atlántida', 'Choluteca', 'Colón', 'Comayagua', 'Copán', 'Cortés', 'El Paraíso', 
    'Francisco Morazán', 'Gracias a Dios', 'Intibucá', 'Islas de la Bahía', 'La Paz', 'Lempira',
    'Ocotepeque', 'Olancho', 'Santa Bárbara', 'Valle', 'Yoro'
  ];
  // public deptos: string[] = [
  //   'Atlántida', 'Choluteca', 'Colón', 'Comayagua', 'Copán', 'Cortés'
  // ];

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal) {}

  openLogin(){
    this.activeModal.close();
    this.modalService.open(LoginComponent, {centered: true});
  }

}
