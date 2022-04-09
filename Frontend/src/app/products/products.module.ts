import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatTabsModule } from '@angular/material/tabs';

import { SharedModule } from '../shared/shared.module';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';

import { CarruselComponent } from './components/carrusel/carrusel.component';
import { CardCarruselComponent } from './components/card-carrusel/card-carrusel.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { RestorePageComponent } from './pages/restore-page/restore-page.component';
import { CardProductsComponent } from './components/card-products/card-products.component';
import { ProductsListPageComponent } from './pages/products-list-page/products-list-page.component';
import { CardSalesPersonComponent } from './components/card-sales-person/card-sales-person.component';
import { ProductDetailsPageComponent } from './pages/product-details-page/product-details-page.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';

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
    ChatPageComponent,
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
    NgxSpinnerModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    CarruselComponent,
    CardProductsComponent,
    CardSalesPersonComponent,
    LandingPageComponent,
    RestorePageComponent,
    ProductsListPageComponent,
    ProductDetailsPageComponent,
    ChatPageComponent,
    NgxSliderModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true}
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductsModule {}
