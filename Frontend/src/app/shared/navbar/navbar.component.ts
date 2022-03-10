import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

// import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public deptos: string[] = [
    'Atlántida', 'Choluteca', 'Colón', 'Comayagua', 'Copán', 'Cortés', 'El Paraíso', 
    'Francisco Morazán', 'Gracias a Dios', 'Intibucá', 'Islas de la Bahía', 'La Paz', 'Lempira',
    'Ocotepeque', 'Olancho', 'Santa Bárbara', 'Valle', 'Yoro'
  ];

  public preguntas = {};

  public hayError!: boolean;

  private backendHost:string = 'http://localhost:8888';

  registerForm = new FormGroup({
    formName: new FormControl('', Validators.required),
    formLastName: new FormControl('', Validators.required),
    formEmail: new FormControl('', [Validators.required, Validators.email]),
    formPhone: new FormControl('', Validators.required),
    formDept: new FormControl('', Validators.required),
    formCity: new FormControl('', Validators.required),
    formDirection: new FormControl('', Validators.required),
    formPassword: new FormControl('', Validators.required),
    formTerms: new FormControl('', Validators.required),
  });
  
  loginForm = new FormGroup({
    formEmailLogin: new FormControl('', [Validators.required, Validators.email]),
    formPasswordLogin: new FormControl('', Validators.required),
  });

  constructor(private modalService: NgbModal, private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.preguntas = this.httpClient.get(`${this.backendHost}/usuarios`).subscribe(res=>{});
  }

  open(content: any, eraseMod?: boolean){
    if(eraseMod){
      this.modalService.dismissAll();
    }
    this.modalService.open(content, {centered: true});
  }

  Register(){
    this.httpClient.post(`${this.backendHost}/usuarios`, this.registerForm.value)
      .subscribe(res=>{
        console.log(res)
      });
  }

  Login(){
    this.httpClient.post(`${this.backendHost}/usuarios`, this.loginForm.value).subscribe(res=>{});
  }

}
