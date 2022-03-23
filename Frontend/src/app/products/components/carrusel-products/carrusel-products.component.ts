import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carrusel-products',
  templateUrl: './carrusel-products.component.html',
  styleUrls: ['./carrusel-products.component.css'],
})
export class CarruselProductsComponent implements OnInit {
  imagenes: any[] = [
    { img: '../assets/xboxController.webp' },
    { img: '../assets/xboxController.webp' },
  ];

  constructor(private _config: NgbCarouselConfig) {
    _config.pauseOnHover = true;
    _config.showNavigationIndicators = true;
    _config.animation = true;
  }

  ngOnInit(): void {}
}
