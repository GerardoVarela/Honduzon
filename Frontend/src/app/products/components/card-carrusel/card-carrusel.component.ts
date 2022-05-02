import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LoggedUser, ResponseLoggedUser } from '../../interfaces/logged-user.interface';

@Component({
  selector: 'app-card-carrusel',
  templateUrl: './card-carrusel.component.html',
  styleUrls: ['./card-carrusel.component.css']
})
export class CardCarruselComponent implements OnInit, OnChanges {

  @Input() img!: number;
  @Input() token!: string;
  @Input() loggedInfo!: ResponseLoggedUser | undefined;

  public idCurrentUser?: number;
  public backendHost: string = 'http://localhost:8888';
  public selectedSub: boolean = false;
  public alreadySubscribed: boolean = false;

  category: any[] = [
    {
      title: 'Videojuegos',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum enim possimus dolorum non, modi sunt ips.',
      numItems: 80
    },
    {
      title: 'Ropa',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum enim possimus dolorum non, modi sunt ips.',
      numItems: 400
    },
    {
      title: 'Tecnología',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum enim possimus dolorum non, modi sunt ips.',
      numItems: 100
    },
    {
      title: 'Muebles',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum enim possimus dolorum non, modi sunt ips.',
      numItems: 230
    },
    {
      title: 'Gimnasio',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum enim possimus dolorum non, modi sunt ips.',
      numItems: 75
    },
    {
      title: 'Juguetes',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum enim possimus dolorum non, modi sunt ips.',
      numItems: 115
    },
  ];
  
  constructor(private router: Router, private cookieService: CookieService, private httpClient: HttpClient) { 
  }

  ngOnChanges(changes: SimpleChanges): void {
    
    this.alreadySubscribed = this.loggedInfo?.categoriasSuscritas?.includes(this.img) || false;
    if(this.alreadySubscribed === true){
      this.selectedSub = true;
    }

    if(this.token === 'nada'){
      this.selectedSub = false;
    }
  }
  
  ngOnInit(): void {
    
  }


  search(idCategory: number){
    // CAMBIAR PETICIÓN
    // this.httpClient.post(`${this.backendHost}/search`, idCategory).subscribe(res=>{});
    this.router.navigate(['/product'], {
      queryParams: {category: idCategory}
    });
  }

  subscribe(){
    this.selectedSub = !this.selectedSub;

    let idCat = this.img;
    

    if(this.selectedSub === false){
      this.alreadySubscribed = false;

      this.httpClient.delete(`${this.backendHost}/categorias/borrarSuscripcion/ID_CurrentUser=${this.loggedInfo?.loggedUser.idUsuario}&ID_Categoria=${idCat}`).subscribe( console.log );
    }else{
      let subInfo = {
        ID_CurrentUser: this.loggedInfo?.loggedUser.idUsuario,
        ID_Categoria: idCat
      }

      this.alreadySubscribed = true;
      this.httpClient.post(`${this.backendHost}/categorias/suscribir`, subInfo).subscribe( console.log );
    }


    
  }

  async getLoggedUser(){
    let resp = this.httpClient.get<ResponseLoggedUser>(`${this.backendHost}/login/getloggeduser`,{
      headers:new HttpHeaders({
        authorization: 'Bearer '+ this.cookieService.get('ACCESS_TOKEN') || ''
      })
    }).subscribe( res => {
      this.idCurrentUser = res.loggedUser.idUsuario;
    });

    
  }

}
