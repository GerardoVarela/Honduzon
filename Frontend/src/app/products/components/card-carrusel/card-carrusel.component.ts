import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';
import { LoggedUser } from '../../interfaces/logged-user.interface';

@Component({
  selector: 'app-card-carrusel',
  templateUrl: './card-carrusel.component.html',
  styleUrls: ['./card-carrusel.component.css']
})
export class CardCarruselComponent implements OnInit {

  @Input() img!: number;
  @Input() token!: string;

  public idCurrentUser?: number;
  public backendHost: string = 'http://localhost:8888';
  public selectedSub: boolean = false;

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
  
  ngOnInit(): void {
    
  }

  // ngAfterViewInit(){
  //   console.log('ye')
  // }

  // ngDoCheck(): void {
    
  //   if(this.cookieService.get('ACCESS_TOKEN')){
  //     this.token = this.cookieService.get('ACCESS_TOKEN');
      
  //     this.getLoggedUser();
  //   }else{
  //     this.token = '';
  //   }

  // }

  search(idCategory: number){
    // CAMBIAR PETICIÓN
    // this.httpClient.post(`${this.backendHost}/search`, idCategory).subscribe(res=>{});
    this.router.navigate(['/product'], {
      queryParams: {category: idCategory}
    });
  }

  subscribe(){
    this.selectedSub = !this.selectedSub;

    let idCat = this.img - 1;
    
    let subInfo = {
      ID_CurrentUser: this.idCurrentUser,
      ID_Categoria: idCat,
    }

    this.httpClient.post(`${this.backendHost}/categorias/suscribir`, subInfo).subscribe( console.log );
    
  }

  async getLoggedUser(){
    let resp = this.httpClient.get<LoggedUser>(`${this.backendHost}/login/getloggeduser`,{
      headers:new HttpHeaders({
        authorization: 'Bearer '+ this.cookieService.get('ACCESS_TOKEN') || ''
      })
    }).subscribe( res => {
      this.idCurrentUser = res.idUsuario;
    });

    
  }

}
