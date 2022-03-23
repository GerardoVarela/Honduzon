import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {



  constructor() {}

  set activeEmail(email: string){
    this.activeEmail = email;
  }

  get activeEmail(){
    return this.activeEmail;
  }

}
