import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';
import { ProductsModule } from './products/products.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    ProductsModule,
    // NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
