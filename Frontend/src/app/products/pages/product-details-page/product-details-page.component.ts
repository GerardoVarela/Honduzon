import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { lastValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { SocketService } from '../../services/socket.service';
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

  public backendHost: string = 'http://localhost:8888';
  public idParam!: any;
  public productDetail!: any;
  public loggedUser?: any;
  public createdChat : any;
  constructor(
    private activatedRoute: ActivatedRoute, 
    private httpClient: HttpClient, 
    private _config: NgbCarouselConfig, 
    private cookieService: CookieService,
    private router: Router,
    private socket : SocketService
    ) {
    _config.pauseOnHover = true;
    _config.showNavigationIndicators = true;
    _config.animation = true;
  }

  ngOnInit(): void {

    this.extractProductInfo();
    this.getLoggedUser();
  }

  async extractProductInfo(){
    
    let id = this.activatedRoute.params.pipe(take(1));

    this.idParam = await lastValueFrom(id);

    let resp = this.httpClient.get(`${this.backendHost}/productos/obtenerdetalleproducto/${this.idParam['id_product']}`).pipe(take(1))
    
    this.productDetail = await lastValueFrom(resp);
    console.log(this.productDetail);
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
    this.socket.io.emit('new_connection',idCurrentUser);
    let chatInfo = {
      currentUser: idCurrentUser,
      idUsuario2: idUsuario2
    };
    console.log(idCurrentUser);
    console.log(idUsuario2);
    console.log(chatInfo);
    this.httpClient.post(`${this.backendHost}/chat/newchat`, chatInfo).subscribe(res=>{
      
      this.createdChat = res;
      
      if(this.createdChat === true){
        
        this.router.navigate([`/chat/user/${idCurrentUser}`], {
          queryParams: {with: idUsuario2}
        });
      }
      
    });
  
  }
}