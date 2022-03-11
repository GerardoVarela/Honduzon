import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';
import { ProductsModule } from './products/products.module';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    ProductsModule,
    CarouselModule,
    // NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
