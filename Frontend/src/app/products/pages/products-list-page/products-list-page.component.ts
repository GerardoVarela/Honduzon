import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Options, LabelType } from "@angular-slider/ngx-slider";
import { Location } from '@angular/common';
import { take } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-products-list-page',
  templateUrl: './products-list-page.component.html',
  styleUrls: ['./products-list-page.component.css']
})
export class ProductsListPageComponent implements OnInit {

  private backendHost: string = 'http://localhost:8888';
  public deptos: any = [];
  public categorias: any = [];
  public productos: any = [];
  public searchedProducts: any = [];
  public filterOptions: any = {};
  public times: number = 0;
  public noFilterParams?: boolean;
  public searchParam?: string;
  public nextParam?: number;
  public idCategoryParam?: number;
  public idLocationParam?: number;
  public idMinPriceParam?: number;
  public idMaxPriceParam?: number;
  public petitionMade: boolean = false;

  public options: Options = {
    floor: 0,
    ceil: 12000,
    animate: false,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "<b>Min price:</b> Lps. " + value + ".00";
        case LabelType.High:
          return "<b>Max price:</b> Lps. " + value + ".00";
        default:
          return "Lps. " + value + ".00";
      }
    }
  };
  sliderForm: FormGroup = new FormGroup({
    sliderControl: new FormControl([4000, 8000])
  });

  get minimum() { return this.sliderForm.value.sliderControl[0]; }
  get maximum() { return this.sliderForm.value.sliderControl[1]; }


  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute, private router: Router, public location: Location) { }
  
  ngOnInit(): void {
    this.categorias = this.httpClient.get(`${this.backendHost}/categorias/`).subscribe(res=>{
      this.categorias = res;
    });
    this.deptos = this.httpClient.get(`${this.backendHost}/departamentos/`).subscribe(res=>{
      this.deptos = res;
    });
    
    this.activatedRoute.queryParams.subscribe(params => {
      this.idCategoryParam = params['category'];
      this.idLocationParam = params['location'];
      this.idMinPriceParam = params['price_min'];
      this.idMaxPriceParam = params['price_max'];
      this.searchParam     = params['search'];
      this.nextParam       = params['next'];
    });

    this.getProductos();
  }
  
  async updateCategory(idCategory: number){
    if(idCategory != -1){
      await this.router.navigate(['/product'], {
        queryParams: {category: idCategory},
        queryParamsHandling: 'merge'
      });

      this.getProductos();
      
    }else{
      await this.router.navigate(['/product'], {
        queryParams: {category: undefined},
        queryParamsHandling: 'merge'
      });

      this.getProductos();
    }
  }

  async updatePrice(setPrice: number){
    if(setPrice != -1){
      await this.router.navigate(['/product'], {
        queryParams: {price_min: this.minimum, price_max: this.maximum},
        queryParamsHandling: 'merge'
      });

      this.getProductos();
      
    }else{
      await this.router.navigate(['/product'], {
        queryParams: {price_min: undefined, price_max: undefined},
        queryParamsHandling: 'merge'
      });

      this.getProductos();
    }
  }

  async updateLocation(idLocation: number){

    if(idLocation != -1){
      await this.router.navigate(['/product'], {
        queryParams: {location: idLocation},
        queryParamsHandling: 'merge'
      });

      this.getProductos();

    }else{
      await this.router.navigate(['/product'], {
        queryParams: {location: undefined},
        queryParamsHandling: 'merge'
      });
      
      this.getProductos();
    }

  }


  async getProductos(searchValue?: string){
    // 4 PARÁMETROS. El parametro search se evalúa al final de estos if anidados
    if(this.idCategoryParam && this.idLocationParam && this.idMinPriceParam && this.idMaxPriceParam){
      let parametros: string = 
        `contador=3&categoryID=${this.idCategoryParam}&departamentoID=${this.idLocationParam}&precioMenor=${this.idMinPriceParam}&precioMayor=${this.idMaxPriceParam}`;
      let resp = this.httpClient
        .get(`${this.backendHost}/productos/filtrado/${parametros}`)
        .pipe(take(1));
      this.productos = await lastValueFrom(resp);
    }
    // 3 PARÁMETROS
    // Todos menos max price
    else if(this.idCategoryParam && this.idLocationParam && this.idMinPriceParam && !this.idMaxPriceParam){
      let parametros: string = 
        `contador=3&categoryID=${this.idCategoryParam}&departamentoID=${this.idLocationParam}&precioMenor=${this.idMinPriceParam}&precioMayor=${this.options.ceil}`;
      let resp = this.httpClient
        .get(`${this.backendHost}/productos/filtrado/${parametros}`)
        .pipe(take(1));
      this.productos = await lastValueFrom(resp);
    }
    // Todos menos min price
    else if(this.idCategoryParam && this.idLocationParam && !this.idMinPriceParam && this.idMaxPriceParam){
      let parametros: string = 
        `contador=3&categoryID=${this.idCategoryParam}&departamentoID=${this.idLocationParam}&precioMenor=${this.options.floor}&precioMayor=${this.idMaxPriceParam}`;
      let resp = this.httpClient
        .get(`${this.backendHost}/productos/filtrado/${parametros}`)
        .pipe(take(1));
      this.productos = await lastValueFrom(resp);
    }
    // Todos menos location
    else if(this.idCategoryParam && !this.idLocationParam && this.idMinPriceParam && this.idMaxPriceParam){
      let parametros: string = 
        `contador=2&categoryID=${this.idCategoryParam}&precioMenor=${this.idMinPriceParam}&precioMayor=${this.idMaxPriceParam}`;
      let resp = this.httpClient
        .get(`${this.backendHost}/productos/filtrado/${parametros}`)
        .pipe(take(1));
      this.productos = await lastValueFrom(resp);
    }
    // Todos menos category
    else if(!this.idCategoryParam && this.idLocationParam && this.idMinPriceParam && this.idMaxPriceParam){
      let parametros: string = 
        `contador=2&departamentoID=${this.idLocationParam}&precioMenor=${this.idMinPriceParam}&precioMayor=${this.idMaxPriceParam}`;
      let resp = this.httpClient
        .get(`${this.backendHost}/productos/filtrado/${parametros}`)
        .pipe(take(1));
      this.productos = await lastValueFrom(resp);
    }
    // 2 PARÁMETROS
    // Solo Category y Location
    else if(this.idCategoryParam && this.idLocationParam && !this.idMinPriceParam && !this.idMaxPriceParam){
      let parametros: string = 
        `contador=2&categoryID=${this.idCategoryParam}&departamentoID=${this.idLocationParam}`;
      let resp = this.httpClient
        .get(`${this.backendHost}/productos/filtrado/${parametros}`)
        .pipe(take(1));
      this.productos = await lastValueFrom(resp);
    }
    // Solo Category y Min Price
    else if(this.idCategoryParam && !this.idLocationParam && this.idMinPriceParam && !this.idMaxPriceParam){
      let parametros: string = 
        `contador=2&categoryID=${this.idCategoryParam}&precioMenor=${this.idMinPriceParam}&precioMayor=${this.options.ceil}`;
      let resp = this.httpClient
        .get(`${this.backendHost}/productos/filtrado/${parametros}`)
        .pipe(take(1));
      this.productos = await lastValueFrom(resp);
    }
    // Solo Category y Max Price
    else if(this.idCategoryParam && !this.idLocationParam && !this.idMinPriceParam && this.idMaxPriceParam){
      let parametros: string = 
        `contador=2&categoryID=${this.idCategoryParam}&precioMenor=${this.options.floor}&precioMayor=${this.idMaxPriceParam}`;
      let resp = this.httpClient
        .get(`${this.backendHost}/productos/filtrado/${parametros}`)
        .pipe(take(1));
      this.productos = await lastValueFrom(resp);
    }
    // Solo Location y Min Price
    else if(!this.idCategoryParam && this.idLocationParam && this.idMinPriceParam && !this.idMaxPriceParam){
      let parametros: string = 
        `contador=2&departamentoID=${this.idLocationParam}&precioMenor=${this.idMinPriceParam}&precioMayor=${this.options.ceil}`;
      let resp = this.httpClient
        .get(`${this.backendHost}/productos/filtrado/${parametros}`)
        .pipe(take(1));
      this.productos = await lastValueFrom(resp);
    }
    // Solo Location y Max Price
    else if(!this.idCategoryParam && this.idLocationParam && !this.idMinPriceParam && this.idMaxPriceParam){
      let parametros: string = 
        `contador=2&departamentoID=${this.idLocationParam}&precioMenor=${this.options.floor}&precioMayor=${this.idMaxPriceParam}`;
      let resp = this.httpClient
        .get(`${this.backendHost}/productos/filtrado/${parametros}`)
        .pipe(take(1));
      this.productos = await lastValueFrom(resp);
    }
    // Solo Max Price y Min Price
    else if(!this.idCategoryParam && !this.idLocationParam && this.idMinPriceParam && this.idMaxPriceParam){
      let parametros: string = 
        `contador=1&precioMenor=${this.idMinPriceParam}&precioMayor=${this.idMaxPriceParam}`;
      let resp = this.httpClient
        .get(`${this.backendHost}/productos/filtrado/${parametros}`)
        .pipe(take(1));
      this.productos = await lastValueFrom(resp);
    }
    // 1 PARÁMETRO
    // Solo Category
    else if(this.idCategoryParam && !this.idLocationParam && !this.idMinPriceParam && !this.idMaxPriceParam){
      let resp = this.httpClient
        .get(`${this.backendHost}/productos/filtrado/bandera=categoria&contador=1&categoryID=${this.idCategoryParam}`)
        .pipe(take(1));
      this.productos = await lastValueFrom(resp);
      // this.httpClient.get(`${this.backendHost}/productos/filtrado/bandera=categoria&contador=1&categoryID=${this.idCategoryParam}`).subscribe(res=>{
      //   this.productos = res;
      // });
    }
    // Solo Location
    else if(!this.idCategoryParam && this.idLocationParam && !this.idMinPriceParam && !this.idMaxPriceParam){
      let resp = this.httpClient
        .get(`${this.backendHost}/productos/filtrado/bandera=departamento&contador=1&departamentoID=${this.idLocationParam}`)
        .pipe(take(1));
      this.productos = await lastValueFrom(resp);
    }
    // Solo Min Price
    else if(!this.idCategoryParam && !this.idLocationParam && this.idMinPriceParam && !this.idMaxPriceParam){
      let resp = this.httpClient
        .get(`${this.backendHost}/productos/filtrado/bandera=precio&contador=1&precioMenor=${this.idMinPriceParam}&precioMayor=${this.options.ceil}`)
        .pipe(take(1));
      this.productos = await lastValueFrom(resp);
    }
    // Solo Max Price
    else if(!this.idCategoryParam && !this.idLocationParam && !this.idMinPriceParam && this.idMaxPriceParam){
      let resp = this.httpClient
        .get(`${this.backendHost}/productos/filtrado/bandera=precio&contador=1&precioMenor=${this.options.floor}&precioMayor=${this.idMaxPriceParam}`)
        .pipe(take(1));
      this.productos = await lastValueFrom(resp);
      // this.httpClient.get(`${this.backendHost}/productos/filtrado/bandera=precio&contador=1&precioMenor=${this.options.floor}&precioMayor=${this.idMaxPriceParam}`).subscribe(res=>{
      //   this.productos = res;
      // });
    }
    // 0 PARÁMETROS
    else{
      this.noFilterParams = true;
    }


    if(searchValue){
      let resp = this.httpClient.get(`${this.backendHost}/productos/search/${searchValue}`).pipe(take(1));
      
      if(this.idCategoryParam || this.idLocationParam || this.idMinPriceParam || this.idMaxPriceParam){
        this.searchedProducts = await lastValueFrom(resp);
        let mergedProducts: object[] = [];

        for(let i=0; i<this.searchedProducts.length; i++){
          for(let j=0; j<this.productos.length; j++){
            if(this.searchedProducts[i]['ID_PRODUCTO'] === this.productos[j]['ID_PRODUCTO']){
              mergedProducts.push(this.searchedProducts[i]);
            }
          }
        }
        this.productos = mergedProducts;
      }else{
        this.productos = await lastValueFrom(resp);
      }

    }else if(this.searchParam){
      let resp = this.httpClient.get(`${this.backendHost}/productos/search/${this.searchParam}`).pipe(take(1));
      
      if(this.idCategoryParam || this.idLocationParam || this.idMinPriceParam || this.idMaxPriceParam){
        this.searchedProducts = await lastValueFrom(resp);
        console.log('searched');
        console.log(this.searchedProducts);
        let mergedProducts: object[] = [];
        for(let i=0; i<this.searchedProducts.length; i++){
          for(let j=0; j<this.productos.length; j++){
            if(this.searchedProducts[i]['ID_PRODUCTO'] === this.productos[j]['ID_PRODUCTO']){
              mergedProducts.push(this.searchedProducts[i]);
            }
          }
        }
        this.productos = mergedProducts;
      }else{
        this.productos = await lastValueFrom(resp);
      }
    }

    this.petitionMade = true;
  }

}
