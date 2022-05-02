import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { lastValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';

interface chartResponseInfo{
  ID_CATEGORIA: number;
  NOMBRE_CATEGORIA: string;
  categoriaSuscrita: number;
}

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
  public idReportSelected?: number;
  public categorysNameSelected: string = '';
  public addNewCategoryName: string = '';
  public addNewCategoryDescription: string = '';
  public detalleDenunciaSeleccionada: any;
  public newCategoryName: string = '';
  public newCategoryDescription: string = '';

  
  view: [number, number] = [700, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  colorScheme = {
    domain: ['#143F6B', '#F55353', '#FEB139', '#F6F54D'],
  };

  single: object[] = [];

  constructor(private modalService: NgbModal, private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient.get<chartResponseInfo[]>(`${this.backendHost}/metricas/categoriasMasSuscritas`).subscribe(res=>{
      console.log(res);
      res.forEach(element => {
        let json = {
          name: element.NOMBRE_CATEGORIA,
          value: element.categoriaSuscrita,
        };
        this.single.push(json);
      });
    })
  }

  openLG(
    content: any,
    nameCategory?: string,
    idCategory?: number,
    idReport?: number
  ) {
    this.httpClient
      .get(`${this.backendHost}/denuncias/getdenuncias`)
      .subscribe((res) => {
        this.denuncias = res;
      });

    if (idReport !== undefined) {
      this.idReportSelected = idReport;
      this.httpClient
        .get(`${this.backendHost}/denuncias/getdenuncia/${idReport}`)
        .subscribe((res) => {
          this.detalleDenunciaSeleccionada = res;
          console.log(res);
        });
    }

    console.log('denuncias');
    console.log(this.denuncias);

    this.httpClient.get(`${this.backendHost}/categorias`).subscribe((res) => {
      this.categories = res;
    });

    if (nameCategory) {
      this.categorysNameSelected = nameCategory;
      this.idCategorySelected = idCategory;
    }

    this.modalService.open(content, { size: 'lg' });
  }

  openSM(content: any) {
    this.modalService.open(content, { size: 'sm' });
  }

  openXL(content: any) {
    this.modalService.open(content, { size: 'xl' });
  }

  eliminarCategoria() {
    this.httpClient
      .delete(
        `${this.backendHost}/categorias/borrarCategoria/${this.idCategorySelected}`
      )
      .subscribe(console.log);

    this.modalService.dismissAll();
  }

  actualizarCategoria() {
    let contenido = {
      formCategoryName: this.newCategoryName,
      formCategoryDescription: this.newCategoryDescription,
      formImageInput: null,
    };

    this.httpClient
      .put(
        `${this.backendHost}/categorias/editarCategoria/${this.idCategorySelected}`,
        contenido
      )
      .subscribe(console.log);

    this.modalService.dismissAll();
  }

  addNewCategory() {
    let contenido = {
      formCategoryName: this.addNewCategoryName,
      formCategoryDescription: this.addNewCategoryDescription,
      formImageInput: null,
      currentAdmin: 1,
    };

    this.httpClient
      .post(`${this.backendHost}/categorias/guardar`, contenido)
      .subscribe(console.log);

    this.modalService.dismissAll();
  }

  ignoreReport() {
    this.httpClient
      .delete(
        `${this.backendHost}/denuncias/borrarDenuncia/${this.idReportSelected}`
      )
      .subscribe(console.log);

    this.modalService.dismissAll();
  }

  putUserDown(idDenunciado: number) {
    this.httpClient
      .delete(`${this.backendHost}/denuncias/darBajaUsuario/${idDenunciado}`)
      .subscribe(console.log);

    this.httpClient
      .delete(
        `${this.backendHost}/denuncias/borrarDenuncia/${this.idReportSelected}`
      )
      .subscribe(console.log);

    this.modalService.dismissAll();
  }


  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
