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

  public deptos: any = [
  ];

  public preguntas:any  = {};

  public hayError!: boolean ;
  
  
  public ciudades : any =[]
  private backendHost:string = 'http://localhost:8888';
  
  registerForm = new FormGroup({
    formName: new FormControl('', Validators.required),
    formLastName: new FormControl('', Validators.required),
    formEmail: new FormControl('', [Validators.required, Validators.email]),
    formPhone: new FormControl('', Validators.required),
    formDept: new FormControl('', Validators.required),
    formPreg: new FormControl('', Validators.required),
    formResp: new FormControl('', Validators.required),
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
    this.preguntas = this.httpClient.get(`${this.backendHost}/preguntas/`).subscribe(res=>{
      this.preguntas = res;
      // console.log(this.preguntas);
    });
    this.deptos = this.httpClient.get(`${this.backendHost}/departamentos/`).subscribe(res=>{
      this.deptos = res;
      // console.log(this.deptos);
    });
    console.log(this.registerForm.value.formCity);
    this.httpClient.get(`${this.backendHost}/ciudades/`).subscribe(res=>{
      this.ciudades = res;
    });
  }

  open(content: any, eraseMod?: boolean){
    if(eraseMod){
      this.modalService.dismissAll();
    }
    this.modalService.open(content, {centered: true});
  }

  Register(){
    this.registerForm.value.formCity=1
    // console.log(this.registerForm.value.formCity=1);
      this.httpClient.post(`${this.backendHost}/usuarios/guardar`, this.registerForm.value).subscribe(res=>{
        console.log(res)
    });
  }

  Login(){
    this.httpClient.post(`${this.backendHost}/usuarios`, this.loginForm.value).subscribe(res=>{});
    this.hayError = false;
    this.hayError = true;
  }

}
