import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarouselConfig, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { switchMap, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { SocketService } from '../../services/socket.service';
import { ProductDetail } from '../../interfaces/product-detail.interface';
import { ResponseLoggedUser } from '../../interfaces/logged-user.interface';
import { ListaDeseosUsuario, wishResponse } from '../../interfaces/wish-list.interface';

interface Valoracion{
  VALORACION_USUARIO: number
}

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.css'],
})
export class ProductDetailsPageComponent implements OnInit {
  imagenes: any[] = [
    { img: '../assets/12.webp' },
    { img: '../assets/1_2.jpg' },
  ];

  public backendHost    : string = 'http://localhost:8888';
  public idParam!       : any;
  public productDetail! : ProductDetail;
  public loggedUser?    : any;
  public createdChat    : any;
  public currentRate    : number = 5; 
  public idProduct!     : number; 
  public idCurrentUser? : number; 
  public valoracion     : number | undefined; 
  public isRated        : boolean = false; 
  public selectedHeart  : boolean = false; 
  public wishListArray  : any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private _config: NgbCarouselConfig,
    private ratingConfig: NgbRatingConfig,
    private cookieService: CookieService,
    private router: Router,
    private socket : SocketService
    ) {
    _config.pauseOnHover = true;
    _config.showNavigationIndicators = true;
    _config.animation = true;
    ratingConfig.max = 5;
  }

  ngOnInit(): void {

    this.getLoggedUser();

    this.extractProductInfo();

  }

  getLoggedUser(){
    this.httpClient.get<ResponseLoggedUser>(`${this.backendHost}/login/getloggeduser`,{
      headers:new HttpHeaders({
        authorization: 'Bearer '+ this.cookieService.get('ACCESS_TOKEN') || ''
      })
    }).pipe(
      tap(res => this.loggedUser = res.loggedUser),
      switchMap( res => this.httpClient.get<ListaDeseosUsuario>(`${this.backendHost}/wishlist/getListaDeseoUsuario/${res.loggedUser.idUsuario}`) )
    ).subscribe( res => {
      this.wishListArray = res.resultado;
      
      let arrayProductNames: string[] = [];
      this.wishListArray.forEach((element: wishResponse) => {
        arrayProductNames.push(element.NOMBRE_PRODUCTO);
      });
      console.log(arrayProductNames);
      if(arrayProductNames.includes(this.productDetail.NOMBRE_PRODUCTO)){
        this.selectedHeart = true;
      }
    });
  }

  async extractProductInfo(){

    this.activatedRoute.params.subscribe( res =>{
      this.idParam = res;
    });

    console.log(this.idParam['id_product'])

    this.httpClient.get<ProductDetail>(`${this.backendHost}/productos/obtenerdetalleproducto/${this.idParam['id_product']}`)
        .pipe(
          tap( res => {
            this.productDetail = res;
          }),
          switchMap( (res) =>  
            this.httpClient.get<Valoracion[]>(`${this.backendHost}/valoraciones/valoracion/${res.ID_USUARIO}`)
          )
        )
        .subscribe( res => this.valoracion = res[0].VALORACION_USUARIO);

  }

  wishList(){
    
    this.selectedHeart = !this.selectedHeart;

    this.activatedRoute.params.subscribe( res => {
      this.idProduct = res['id_product'];
    });

    if(this.selectedHeart === true){
      let wishJson = {
        ID_PRODUCTO: this.idProduct,
        CURRENT_USER: this.loggedUser.idUsuario
      }
      this.httpClient.post(`${this.backendHost}/wishlist/guardarArticulo`, wishJson).subscribe( console.log );
    }else{
      this.httpClient.delete(`${this.backendHost}/wishlist/borrarProductoListaDeseo/ID_PRODUCTO=${this.idProduct}&CURRENT_USER=${this.loggedUser.idUsuario}`).subscribe( console.log );
    }
  }

  goToChat(idCurrentUser: number, idUsuario2: number){
    this.socket.io.emit('new_connection');
    let chatInfo = {
      currentUser: idCurrentUser,
      idUsuario2: idUsuario2
    };

    this.httpClient.post(`${this.backendHost}/chat/newchat`, chatInfo).subscribe(res=>{

      this.createdChat = res;

      if(this.createdChat === true){

        this.router.navigate([`/chat/user/${idCurrentUser}`], {
          queryParams: {with: idUsuario2}
        });
      }

    });

  }

  rated(idRatedUser: number, idCurrentUser: number){
    
    let rateJson= {
      ID_USUARIO: idRatedUser, 
      VALORACION: this.currentRate,
      ID_USUARIO_VALORA: this.loggedUser.idUsuario,
    }
    this.httpClient.post(`${this.backendHost}/valoraciones/insertarvaloracion`, rateJson).subscribe( console.log );
    
    this.httpClient.get<Valoracion[]>(`${this.backendHost}/valoraciones/valoracion/${idRatedUser}`)
      .subscribe( res => {
        this.valoracion = res[0].VALORACION_USUARIO
      });

    this.isRated = true;
    
  }
}
