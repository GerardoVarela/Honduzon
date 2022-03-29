import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.css'],
})
export class ProductDetailsPageComponent implements OnInit {
  imagenes: any[] = [
    { img: '../assets/12.webp' },
    { img: '../assets/1_2.jpg' },
  ];

  constructor(private _config: NgbCarouselConfig) {
    _config.pauseOnHover = true;
    _config.showNavigationIndicators = true;
    _config.animation = true;
  }

  ngOnInit(): void {}
}
