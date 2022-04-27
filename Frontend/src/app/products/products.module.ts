import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { CookieService } from 'ngx-cookie-service';
import { MatTabsModule } from '@angular/material/tabs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';

import { AdminModulePageComponent } from './pages/admin-module-page/admin-module-page.component';
import { CardCarruselComponent } from './components/card-carrusel/card-carrusel.component';
import { CardProductsComponent } from './components/card-products/card-products.component';
import { CardSalesPersonComponent } from './components/card-sales-person/card-sales-person.component';
import { CarruselComponent } from './components/carrusel/carrusel.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ProductDetailsPageComponent } from './pages/product-details-page/product-details-page.component';
import { ProductsListPageComponent } from './pages/products-list-page/products-list-page.component';
import { RestorePageComponent } from './pages/restore-page/restore-page.component';
// import { UserDetailsPageComponent } from './pages/user-details-page/user-details-page.component';

@NgModule({
  declarations: [
    AdminModulePageComponent,
    CardCarruselComponent,
    CardProductsComponent,
    CardSalesPersonComponent,
    CarruselComponent,
    ChatPageComponent,
    LandingPageComponent,
    ProductDetailsPageComponent,
    ProductsListPageComponent,
    RestorePageComponent,
    // UserDetailsPageComponent,
  ],
  imports: [
    CarouselModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatTabsModule,
    NgbModule,
    NgxSliderModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    SharedModule,
  ],
  exports: [
    AdminModulePageComponent,
    CardProductsComponent,
    CardSalesPersonComponent,
    CarruselComponent,
    ChatPageComponent,
    LandingPageComponent,
    NgxSliderModule,
    ProductDetailsPageComponent,
    ProductsListPageComponent,
    RestorePageComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    CookieService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductsModule {}
