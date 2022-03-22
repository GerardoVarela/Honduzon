import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

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
  public filterOptions: any = {};
  public idCategoryParam?: number;
  public idLocationParam?: number;
  public btnCategory: string = 'Categoría';
  public btnLocation: string = 'Ubicación';

  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute, private router: Router) { }
  
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
    });
    
    this.productos = this.httpClient.get(`${this.backendHost}/productos/getprodcat/${this.idCategoryParam}`).subscribe(res=>{
      this.productos = res;
      console.log(this.productos);
      // this.deptos = res;
    });

  }
  
  updateCategory(idCategory: number){
    if(idCategory != -1){
      this.btnCategory = this.categorias[idCategory-1].NOMBRE_CATEGORIA;

      this.router.navigate(['/product'], {
        queryParams: {category: idCategory},
        queryParamsHandling: 'merge'
      });

      this.productos = this.httpClient.get(`${this.backendHost}/productos/getprodcat/${idCategory}`).subscribe(res=>{
        this.productos = res;
        console.log(this.productos);
        // this.deptos = res;
      });
    }else{
      this.btnCategory = 'Categoría';
      this.router.navigate(['/product'], {
        queryParams: {category: undefined},
        queryParamsHandling: 'merge'
      });
    }
  }

  updateLocation(idLocation: number){

    if(idLocation != -1){
      this.btnLocation = this.deptos[idLocation-1].NOMBRE_DEPARTAMENTO;
  
      this.router.navigate(['/product'], {
        queryParams: {location: idLocation},
        queryParamsHandling: 'merge'
      });
    }else{
      this.btnLocation = 'Ubicación';
      this.router.navigate(['/product'], {
        queryParams: {location: undefined},
        queryParamsHandling: 'merge'
      });
    }

  }

  obtenerProductos(){
    if(this.idCategoryParam && !this.idLocationParam){
      this.filterOptions = {
        categoria: this.idCategoryParam,
        contador: 1,
        bandera: 'categoria',
    
      };
<<<<<<< HEAD
    
      this.httpClient.post(`${this.backendHost}/productos/filtrado/`, this.filterOptions).subscribe(res=>{
        console.log(res);
        // this.deptos = res;
      });
      this.filterOptions.contador=0
=======
      // this.httpClient.get(`${this.backendHost}/productos/getprodcat/${this.idCategoryParam}`).subscribe(res=>{
      //   console.log(res);
      //   // this.deptos = res;
      // });
>>>>>>> 5bed0ffe618d786bc00a486b80c7cc71188eb489
    }
    
    return [1,2,3,4];
    
  }
}
