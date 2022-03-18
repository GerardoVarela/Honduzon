import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { CarruselComponent } from './components/carrusel/carrusel.component';
import { CardCarruselComponent } from './components/card-carrusel/card-carrusel.component';
<<<<<<< HEAD
import { CardProductsComponent } from './components/card-products/card-products.component';
=======
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { RestorePageComponent } from './pages/restore-page/restore-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
>>>>>>> e21aeb302a9b155c974646b909dffcc793b3e103

@NgModule({
  declarations: [
    CarruselComponent,
    CardCarruselComponent,
<<<<<<< HEAD
    CardProductsComponent,
=======
    LandingPageComponent,
    RestorePageComponent,
  ],
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    RouterModule, 
    CarouselModule,
    NgbModule,
    HttpClientModule,
    SharedModule
>>>>>>> e21aeb302a9b155c974646b909dffcc793b3e103
  ],
  exports: [
<<<<<<< HEAD
    // LoginComponent,
    // RegisterComponent,
    CarruselComponent,
    CardProductsComponent,
=======
    LandingPageComponent,
    RestorePageComponent,
>>>>>>> e21aeb302a9b155c974646b909dffcc793b3e103
  ],
  providers: [],
})
export class ProductsModule {}
