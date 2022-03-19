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
  ];
  
  constructor(private router: Router) { }
  
  ngOnInit(): void {
  }

  search(){
    // this.httpClient.post(`${this.backendHost}/search`, this.searchForm.value).subscribe(res=>{});
    this.router.navigateByUrl('/product');
  }

}
