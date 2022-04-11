import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { lastValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

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

  constructor(private activatedRoute: ActivatedRoute, private httpClient: HttpClient, private _config: NgbCarouselConfig, private cookieService: CookieService) {
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
  }
}