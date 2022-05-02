import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-products',
  templateUrl: './card-products.component.html',
  styleUrls: ['./card-products.component.css']
})
export class CardProductsComponent implements OnInit {

  @Input() item!:any;

  private backendHost: string = 'http://localhost:8888';
  public selectedHeart: boolean = false;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  wishList(idProduct: number){
    console.log(idProduct);
    this.selectedHeart = !this.selectedHeart;

    // /updateEstadoListaDeseo
  }

}
