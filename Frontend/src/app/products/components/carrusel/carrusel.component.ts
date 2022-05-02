import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ResponseLoggedUser } from '../../interfaces/logged-user.interface';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css'],
})
export class CarruselComponent implements OnInit, OnChanges {
  
  @Input() token: string = '';
  @Input() loggedUserInfo: ResponseLoggedUser | undefined;

  newLoggedInfo: ResponseLoggedUser | undefined;
  newToken: string = '';

  imgs: number[] = [1, 2, 3, 4, 5, 6];

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.newToken = this.token;
    this.newLoggedInfo = this.loggedUserInfo
  }

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: [
      '<i class="fa fa-caret-left"></i>',
      '<i class="fa fa-caret-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };
}
