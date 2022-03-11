import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  // public deptos: string[] = ['Francisco', 'Cortes'];
  public deptos: any = [];
  // public preguntas: string[] = ['hola', 'adios'];
  public preguntas:any  = {};
  public hayError!: boolean;
  // public ciudades : string[] = ['tegus', 'sps'];
  public ciudades : any = [];
  private backendHost: string = 'http://localhost:8888';
  public successMsg!: string;
  public respLogin!: any;
  private exists: boolean = false;

  registerForm = new FormGroup({
    formName: new FormControl('', Validators.required),
    formLastName: new FormControl('', Validators.required),
    formEmail: new FormControl('', [Validators.required, Validators.email]),
    formPhone: new FormControl('', Validators.required),
    formDept: new FormControl('', Validators.required),
    formPreg: new FormControl('', Validators.required),
    formResp: new FormControl('', Validators.required),
    formCity: new FormControl('', Validators.required),
    formDirection: new FormControl(''),
    formPassword: new FormControl('', Validators.required),
    formTerms: new FormControl(false, Validators.requiredTrue),
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

  register(content: any){
    this.registerForm.value.formCity=1
    console.log(this.registerForm.value.formCity=1);
      this.httpClient.post(`${this.backendHost}/usuarios/guardar`, this.registerForm.value).subscribe(res=>{
        console.log(res)
    });
    this.successMsg = 'Registrado';
    this.modalService.dismissAll();
    this.modalService.open(content, { size: 'sm' });
  }

  

  login(content: any){
    this.httpClient.post(`${this.backendHost}/login`, this.loginForm.value).subscribe(res=>{
    
      if(res == true){
        this.hayError = false;
        this.successMsg = 'Sesión Iniciada';
        this.modalService.dismissAll();
        this.modalService.open(content, { size: 'sm' });
      }else{
        this.hayError = true;
      }
    });

    // if(this.exists){
    //   this.successMsg = 'Sesión Iniciada';
    //   this.modalService.dismissAll();
    //   this.modalService.open(content, { size: 'sm' });
    // }
    
  }

  get formName() { return this.registerForm.get('formName'); }
  get formLastName() { return this.registerForm.get('formLastName'); }
  get formEmail() { return this.registerForm.get('formEmail'); }
  get formPhone() { return this.registerForm.get('formPhone'); }
  get formDept() { return this.registerForm.get('formDept'); }
  get formCity() { return this.registerForm.get('formCity'); }
  get formPreg() { return this.registerForm.get('formPreg'); }
  get formResp() { return this.registerForm.get('formResp'); }
  get formPassword() { return this.registerForm.get('formPassword'); }
  get formTerms() { return this.registerForm.get('formTerms'); }

}
