import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

import { CarruselComponent } from './components/carrusel/carrusel.component';
import { CardCarruselComponent } from './components/card-carrusel/card-carrusel.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { RestorePageComponent } from './pages/restore-page/restore-page.component';
import { CardProductsComponent } from './components/card-products/card-products.component';
import { ProductsListPageComponent } from './pages/products-list-page/products-list-page.component';
import { CardSalesPersonComponent } from './components/card-sales-person/card-sales-person.component';
import { SharedModule } from '../shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { ProductDetailsPageComponent } from './pages/product-details-page/product-details-page.component';

@NgModule({
  declarations: [
    CarruselComponent,
    CardCarruselComponent,
    CardProductsComponent,
    CardSalesPersonComponent,
    LandingPageComponent,
    RestorePageComponent,
    ProductsListPageComponent,
    ProductDetailsPageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    CarouselModule,
    NgbModule,
    HttpClientModule,
    SharedModule,
    MatTabsModule,
    NgxSliderModule,
    SharedModule,
  ],
  exports: [
    CarruselComponent,
    CardProductsComponent,
    CardSalesPersonComponent,
    LandingPageComponent,
    RestorePageComponent,
    ProductsListPageComponent,
    ProductDetailsPageComponent,
    NgxSliderModule,
  ],
  providers: [],
})
export class ProductsModule {}
