import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

// public productos: string[] = ['Francisco', 'Cortes'];
public productos: any = [];
  // public deptos: string[] = ['Francisco', 'Cortes'];
  public deptos: any = [];
  // public preguntas: string[] = ['hola', 'adios'];
  public preguntas:any  = {};
  public hayError!: boolean;
  public correoRegistrado!: boolean;
  public respuestaIncorrecta!: boolean;
  // public ciudades : string[] = ['tegus', 'sps'];
  public ciudades : any = [];
  private backendHost: string = 'http://localhost:8888';
  public successMsg!: string;
  public respLogin!: any;
  public confirmPasswordControl!: any;
  public usertemp : object ={
    email: "jvarelao@chominInc.com",
    password: 'chomin inc'
  };
  public recoveryQuestion : string ='';
  searchForm = new FormGroup({
    searchInput: new FormControl('')
  });

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
    formVPassword: new FormControl('', [Validators.required]),
    formTerms: new FormControl(false, Validators.requiredTrue)
  }, this.passwordMatch());

  loginForm = new FormGroup({
    formEmailLogin: new FormControl('', [Validators.required, Validators.email]),
    formPasswordLogin: new FormControl('', Validators.required),
  });
  
  recoverForm = new FormGroup({
    formEmailRecover: new FormControl('', [Validators.required, Validators.email]),
    formRadioBRecover: new FormControl('email'),
    formRespRecover: new FormControl(''),
  });

  constructor(private modalService: NgbModal, private httpClient: HttpClient, private router: Router, private service: SharedService) {}

  ngOnInit(): void {
    this.preguntas = this.httpClient.get(`${this.backendHost}/preguntas/`).subscribe(res=>{
      this.preguntas = res;
    });
    this.deptos = this.httpClient.get(`${this.backendHost}/departamentos/`).subscribe(res=>{
      this.deptos = res;
    });
    this.httpClient.get(`${this.backendHost}/ciudades/`).subscribe(res=>{
      this.ciudades = res;
    });
    
  }

  open(content: any, eraseMod?: boolean){
    this.clearInputs();
    if(eraseMod){
      this.modalService.dismissAll();
    }
    this.modalService.open(content, {centered: true});
  }
  
  register(content: any){
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
  }

  recoverByEmail(content: any){
    this.httpClient.get(`${this.backendHost}/usuarios/recuperacionemail/${this.recoverForm.value.formEmailRecover}`).subscribe(res=>{
      if(res == true){
        this.correoRegistrado = true;
        this.successMsg = 'Correo enviado';
        this.modalService.dismissAll();
        this.modalService.open(content, { size: 'sm' });
      }else{
        this.correoRegistrado = false;
      }
    });
  }
  
  recoverByAnswer(){  
    this.httpClient.get(`${this.backendHost}/usuarios/obtenerCorreo/${this.recoverForm.value.formEmailRecover}`).subscribe(res=>{
      if(res == true){
        this.correoRegistrado = true;
      }else{
        this.correoRegistrado = false;
      }
    });

    if(this.correoRegistrado){
      this.httpClient.post(`${this.backendHost}/usuarios/getrespuesta/`, this.recoverForm.value).subscribe(res=>{
        if(res == true){
          this.respuestaIncorrecta = false;
          this.modalService.dismissAll();
          // this.router.navigateByUrl('/restore');
          this.router.navigate(['/restore'], {queryParams: {email: this.formEmailRecover!.value}});
        }else{
          this.respuestaIncorrecta = true;
        }
      });
    }

  }
  

  showQuestion(){
    // console.log('pregunta')
    this.httpClient.get(`${this.backendHost}/preguntas/recuperacionquestion/${this.recoverForm.value.formEmailRecover}`).subscribe(res=>{
      // console.log(res);
      this.recoveryQuestion = res.toString();
    });
  }


  search(){
     this.httpClient.get(`${this.backendHost}/productos/search/${this.searchForm.value}` ).subscribe(res=>{
       this.productos=res;
     });
    this.router.navigateByUrl('/product');
  }

  // Getter Search
  get searchInput() { return this.searchForm.get('searchInput'); }

  // Getters Login Form
  get formEmailLogin() { return this.loginForm.get('formEmailLogin'); }
  get formPasswordLogin() { return this.loginForm.get('formPasswordLogin'); }


  // Getters Register Form
  get formName() { return this.registerForm.get('formName'); }
  get formLastName() { return this.registerForm.get('formLastName'); }
  get formEmail() { return this.registerForm.get('formEmail'); }
  get formPhone() { return this.registerForm.get('formPhone'); }
  get formDept() { return this.registerForm.get('formDept'); }
  get formCity() { return this.registerForm.get('formCity'); }
  get formPreg() { return this.registerForm.get('formPreg'); }
  get formResp() { return this.registerForm.get('formResp'); }
  get formPassword() { return this.registerForm.get('formPassword'); }
  get formVPassword() { return this.registerForm.get('formVPassword'); }
  get formTerms() { return this.registerForm.get('formTerms'); }
  
  // Getters Recover Form
  get formEmailRecover() { return this.recoverForm.get('formEmailRecover'); }
  get formRadioBRecover() { return this.recoverForm.get('formRadioBRecover'); }
  get formRespRecover() { return this.recoverForm.get('formRespRecover'); }
  

  passwordMatch():ValidatorFn {
    return (formGroup: AbstractControl):{ [key: string]: any } | null => {
      const passwordControl = formGroup.get('formPassword');
      const confirmPasswordControl = formGroup.get('formVPassword');
      
      if (passwordControl && confirmPasswordControl) {
        if (passwordControl!.value !== confirmPasswordControl!.value) {
          confirmPasswordControl!.setErrors({ passwordMismatch: true });
          return { passwordMismatch: true }
        } else {
          confirmPasswordControl!.setErrors(null);
          return null;
        }
      }else{
        return null;
      }

      // if (
      //   confirmPasswordControl.errors &&
      //   !confirmPasswordControl.errors['passwordMismatch']
      // ) {
      //   return null;
      // }

    };
  }

  public getConfirmPasswordError(): number {
    const control = this.registerForm.get('formVPassword');
    return control!.hasError('required')
      ? 1
      : control!.hasError('passwordMismatch')
      ? 2
      : 3;
  }

  clearInputs() { 
    // Login
    this.formEmailLogin!.reset();
    this.formPasswordLogin!.reset();

    // Register
    this.formName!.reset();
    this.formLastName!.reset();
    this.formEmail!.reset();
    this.formPhone!.reset();
    this.formDept!.reset();
    this.formCity!.reset();
    this.formPreg!.reset();
    this.formResp!.reset();
    this.formPassword!.reset();
    this.formVPassword!.reset();
    this.formTerms!.reset();
    
    // Recover
    this.formEmailRecover!.reset();
    this.formRespRecover!.reset();
  }
}
