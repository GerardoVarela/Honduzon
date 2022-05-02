import { Component, OnInit } from '@angular/core';
import { ResponseLoggedUser } from '../../interfaces/logged-user.interface';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styles: []
})
export class LandingPageComponent implements OnInit {

  token: string = '';
  loggedUserInfo: ResponseLoggedUser | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  receiveToken(token: string){
    this.token = token;
  }

  receiveLoggedEmitter(loggedUserInfo: ResponseLoggedUser | undefined){
    this.loggedUserInfo = loggedUserInfo;
  }
}
