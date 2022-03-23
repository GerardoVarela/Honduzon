import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';

import { CarruselComponent } from './components/carrusel/carrusel.component';
import { CardCarruselComponent } from './components/card-carrusel/card-carrusel.component';
<<<<<<< HEAD
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { RestorePageComponent } from './pages/restore-page/restore-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { CarruselProductsComponent } from './components/carrusel-products/carrusel-products.component';
=======
import { CardProductsComponent } from './components/card-products/card-products.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { RestorePageComponent } from './pages/restore-page/restore-page.component';
import { ProductsListPageComponent } from './pages/products-list-page/products-list-page.component';
import { CardSalesPersonComponent } from './components/card-sales-person/card-sales-person.component';
>>>>>>> 323e4fc41e370b3390badbe8a9adbdd402bdad8c

@NgModule({
  declarations: [
    CarruselComponent,
    CardCarruselComponent,
<<<<<<< HEAD
    LandingPageComponent,
    RestorePageComponent,
    CarruselProductsComponent,
=======
    CardProductsComponent,
    CardSalesPersonComponent,
    LandingPageComponent,
    RestorePageComponent,
    ProductsListPageComponent,
>>>>>>> 323e4fc41e370b3390badbe8a9adbdd402bdad8c
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    CarouselModule,
    NgbModule,
    HttpClientModule,
<<<<<<< HEAD
    SharedModule,
  ],
  exports: [
    LandingPageComponent,
    RestorePageComponent,
    CarruselProductsComponent,
=======
    SharedModule
  ],
  exports: [
    CarruselComponent,
    CardProductsComponent,
    CardSalesPersonComponent,
    LandingPageComponent,
    RestorePageComponent,
    ProductsListPageComponent
>>>>>>> 323e4fc41e370b3390badbe8a9adbdd402bdad8c
  ],
  providers: [],
})
export class ProductsModule {}
