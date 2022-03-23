import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { CarruselComponent } from './components/carrusel/carrusel.component';
import { CardCarruselComponent } from './components/card-carrusel/card-carrusel.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { RestorePageComponent } from './pages/restore-page/restore-page.component';
import { CarruselProductsComponent } from './components/carrusel-products/carrusel-products.component';
import { CardProductsComponent } from './components/card-products/card-products.component';
import { ProductsListPageComponent } from './pages/products-list-page/products-list-page.component';
import { CardSalesPersonComponent } from './components/card-sales-person/card-sales-person.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CarruselComponent,
    CardCarruselComponent,
    CardProductsComponent,
    CardSalesPersonComponent,
    LandingPageComponent,
    RestorePageComponent,
    ProductsListPageComponent,
    CarruselProductsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    CarouselModule,
    NgbModule,
    HttpClientModule,
    SharedModule
  ],
  exports: [
    CarruselComponent,
    CardProductsComponent,
    CardSalesPersonComponent,
    LandingPageComponent,
    RestorePageComponent,
    ProductsListPageComponent,
    CarruselProductsComponent
  ],
  providers: [],
})
export class ProductsModule {}
