import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './pages/login/login.component';
import { ModalComponent } from './components/modal/modal.component';


@NgModule({
  declarations: [
    LoginComponent,
    ModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoginComponent,
    ModalComponent
  ]
})
export class ProductsModule { }
