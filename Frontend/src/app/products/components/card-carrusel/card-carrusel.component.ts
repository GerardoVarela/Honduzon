import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-carrusel',
  templateUrl: './card-carrusel.component.html',
  styleUrls: ['./card-carrusel.component.css']
})
export class CardCarruselComponent implements OnInit {

  @Input() img!: number;


  category: any[] = [
    {
      title: 'Video Juegos',
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
  
  constructor(private router: Router) { }
  
  ngOnInit(): void {
  }

  search(idCategory: number){
    // CAMBIAR PETICIÓN
    // this.httpClient.post(`${this.backendHost}/search`, idCategory).subscribe(res=>{});
    this.router.navigateByUrl('/product');
  }

}
