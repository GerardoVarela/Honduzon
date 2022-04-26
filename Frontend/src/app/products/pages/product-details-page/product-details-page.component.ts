import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarouselConfig, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { lastValueFrom } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { SocketService } from '../../services/socket.service';
import { ProductDetail } from '../../interfaces/product-detail.interface';

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
  public productDetail! : any;
  public loggedUser?    : any;
  public createdChat    : any;
  public currentRate    : number = 5; 
  public valoracion     : number | undefined; 
  public isRated   : boolean = false; 

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

    this.extractProductInfo();
    this.getLoggedUser();
  }

  async extractProductInfo(){

    let id = this.activatedRoute.params.pipe(take(1));

    this.idParam = await lastValueFrom(id);

    console.log(this.idParam['id_product'])

    this.httpClient.get<ProductDetail>(`${this.backendHost}/productos/obtenerdetalleproducto/${this.idParam['id_product']}`)
        .pipe(
          tap( res => this.productDetail = res),
          switchMap( ({ID_USUARIO}) => this.httpClient.get<Valoracion[]>(`${this.backendHost}/valoraciones/valoracion/${ID_USUARIO}`) )
        )
        .subscribe( res => this.valoracion = res[0].VALORACION_USUARIO);

  }

  async getLoggedUser(){
    let resp = this.httpClient.get(`${this.backendHost}/login/getloggeduser`,{
      headers:new HttpHeaders({
        authorization: 'Bearer '+ this.cookieService.get('ACCESS_TOKEN') || ''
      })
    }).pipe(take(1));

    this.loggedUser = await lastValueFrom(resp);
    console.log('aqui')
    console.log(this.loggedUser)
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
      ID_USUARIO_VALORA: idCurrentUser,
    }
    this.httpClient.post(`${this.backendHost}/valoraciones/insertarvaloracion`, rateJson).subscribe( console.log );
    
    this.httpClient.get<Valoracion[]>(`${this.backendHost}/valoraciones/valoracion/${idRatedUser}`)
      .subscribe( res => this.valoracion = res[0].VALORACION_USUARIO);

    this.isRated = true;
    
  }
}
