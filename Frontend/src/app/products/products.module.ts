import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { CarruselComponent } from './components/carrusel/carrusel.component';
import { CardCarruselComponent } from './components/card-carrusel/card-carrusel.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { RestorePageComponent } from './pages/restore-page/restore-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { CarruselProductsComponent } from './components/carrusel-products/carrusel-products.component';

@NgModule({
  declarations: [
    CarruselComponent,
    CardCarruselComponent,
    LandingPageComponent,
    RestorePageComponent,
    CarruselProductsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    CarouselModule,
    NgbModule,
    HttpClientModule,
    SharedModule,
  ],
  exports: [
    LandingPageComponent,
    RestorePageComponent,
    CarruselProductsComponent,
  ],
  providers: [],
})
export class ProductsModule {}
