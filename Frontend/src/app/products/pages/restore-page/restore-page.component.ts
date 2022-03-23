import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'app-restore-page',
  templateUrl: './restore-page.component.html',
  styleUrls: ['./restore-page.component.css']
})
export class RestorePageComponent implements OnInit {
  
  private backendHost: string = 'http://localhost:8888';
  private emailParam!: string;
  constructor(private modalService: NgbModal, private httpClient: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.emailParam = params['email'];
    });
  }

  newPasswordForm = new FormGroup({
    password: new FormControl('', Validators.required),
    vPassword: new FormControl('', Validators.required)
  }, this.passwordMatch()); 

  get password(){ return this.newPasswordForm.get('password')}
  get vPassword(){ return this.newPasswordForm.get('vPassword')}

  passwordMatch():ValidatorFn {
    return (formGroup: AbstractControl):{ [key: string]: any } | null => {
      const passwordControl = formGroup.get('password');
      const confirmPasswordControl = formGroup.get('vPassword');
      
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
    };
  }

  public getConfirmPasswordError(): number {
    const control = this.newPasswordForm.get('vPassword');
    return control!.hasError('required')
      ? 1
      : control!.hasError('passwordMismatch')
      ? 2
      : 3;
  }

  setNewPassword(content: any){
    
    let user = {
      email: this.emailParam,
      password: this.password
    }
    this.httpClient.put(`${this.backendHost}/usuarios/recovery/`, user).subscribe(res=>{})
    this.modalService.open(content, { size: 'sm' });
    this.router.navigateByUrl('/');
  }

}
