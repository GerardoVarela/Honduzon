import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { lastValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-admin-module-page',
  templateUrl: './admin-module-page.component.html',
  styleUrls: ['./admin-module-page.component.css'],
})
export class AdminModulePageComponent implements OnInit {
  
  private backendHost: string = 'http://localhost:8888';
  public denuncias: any;
  public categories: any;
  public idCategorySelected?: number;
  public categorysNameSelected: string = '';
  public addNewCategoryName: string = '';
  public addNewCategoryDescription: string = '';
  public newCategoryName: string = '';
  public newCategoryDescription: string = '';

  constructor(private modalService: NgbModal, private httpClient: HttpClient) {}

  ngOnInit(): void {

  }

  openLG(content: any, nameCategory?: string, idCategory?: number) {
    
    this.httpClient.get(`${this.backendHost}/denuncias/getdenuncias`).subscribe(res=>{
      this.denuncias = res; 
      console.log(res); 
    });
    
    console.log('denuncias');
    console.log(this.denuncias);
    
    this.httpClient.get(`${this.backendHost}/categorias`).subscribe(res=>{
      this.categories = res;  
    });
    // let cats = this.httpClient.get(`${this.backendHost}/categorias`).pipe(take(1));

    // this.categories = lastValueFrom(cats);

    if(nameCategory){
      this.categorysNameSelected = nameCategory;
      this.idCategorySelected = idCategory;
    }

    this.modalService.open(content, { size: 'lg' });
  }

  openSM(content: any) {
    this.modalService.open(content, { size: 'sm' });
  }

  eliminarCategoria(){
    this.httpClient.delete(`${this.backendHost}/categorias/borrarCategoria/${this.idCategorySelected}`).subscribe(res=>{
    });
    
    this.modalService.dismissAll();
  }

  actualizarCategoria(){
    let contenido={
      formCategoryName: this.newCategoryName,
      formCategoryDescription: this.newCategoryDescription,
      formImageInput: null,
    };

    this.httpClient.put(`${this.backendHost}/categorias/editarCategoria/${this.idCategorySelected}`, contenido).subscribe(res=>{
    });
    
    this.modalService.dismissAll();
  }

  addNewCategory(){
    let contenido={
      formCategoryName: this.addNewCategoryName,
      formCategoryDescription: this.addNewCategoryDescription,
      formImageInput: null,
      currentAdmin: 1,
    };

    this.httpClient.post(`${this.backendHost}/categorias/guardar`, contenido).subscribe(res=>{
    });

    this.modalService.dismissAll();
  }
}
