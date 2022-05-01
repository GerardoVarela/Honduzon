import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styles: []
})
export class LandingPageComponent implements OnInit {

  token: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  receiveToken(token: string){
    this.token= token;
  }
}
