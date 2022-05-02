import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoggedUser, ResponseLoggedUser } from '../../interfaces/logged-user.interface';

@Component({
  selector: 'app-card-products',
  templateUrl: './card-products.component.html',
  styleUrls: ['./card-products.component.css']
})
export class CardProductsComponent implements OnInit {

  @Input() item!:any;

  private backendHost: string = 'http://localhost:8888';
  public selectedHeart: boolean = false;
  public loggedUser?: any;

  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.getLoggedUser();
  }

  wishList(idProduct: number){
    
    this.selectedHeart = !this.selectedHeart;

    if(this.selectedHeart === true){
      let wishJson = {
        ID_PRODUCTO: idProduct,
        CURRENT_USER: this.loggedUser.idUsuario
      }
      this.httpClient.post(`${this.backendHost}/wishlist/guardarArticulo`, wishJson).subscribe( console.log );
    }else{
      this.httpClient.delete(`${this.backendHost}/wishlist/borrarProductoListaDeseo/ID_PRODUCTO=${idProduct}&CURRENT_USER=${this.loggedUser.idUsuario}`).subscribe( console.log );
    }
  }

  getLoggedUser(){
    this.httpClient.get<ResponseLoggedUser>(`${this.backendHost}/login/getloggeduser`,{
      headers:new HttpHeaders({
        authorization: 'Bearer '+ this.cookieService.get('ACCESS_TOKEN') || ''
      })
    }).subscribe( res => {
      this.loggedUser = res['loggedUser'];
    });

    // this.loggedUser = await lastValueFrom(resp);
  }
}
