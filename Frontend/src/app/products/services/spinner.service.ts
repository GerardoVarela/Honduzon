import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService{

  constructor(private spinnerService: NgxSpinnerService) { }

  public mostrarSpinner(){
    this.spinnerService.show();
  }
  
  public esconderSpinner(){
    this.spinnerService.hide();
  }
}
