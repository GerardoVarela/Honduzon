import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-products',
  templateUrl: './card-products.component.html',
  styleUrls: ['./card-products.component.css']
})
export class CardProductsComponent implements OnInit {

  @Input() item!:any;

  public selectedHeart: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  wishList(idProduct: number){
    console.log(idProduct);
    this.selectedHeart = !this.selectedHeart;
  }

}
