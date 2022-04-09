import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css'],
})
export class ChatPageComponent implements OnInit {
  nuevoMensaje: string = '';
  mensaje: any = [
    {
      emisor: 'id',
      texto: 'hola que tal',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  enviarMensaje() {
    console.log(this.nuevoMensaje);
    this.nuevoMensaje = '';
  }
}
