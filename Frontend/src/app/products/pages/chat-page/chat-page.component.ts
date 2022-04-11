import { Component, OnInit, Output } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css'],
})
export class ChatPageComponent implements OnInit {
  public nuevoMensaje: string = '';
  public idParam: any;
  mensaje: any = [
    {
      emisor: 'id',
      texto: 'hola que tal',
    },
  ];

  constructor(public chatService: ChatService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {}

  async enviarMensaje() {
    let idUsuario = this.activatedRoute.params.pipe(take(1));

    this.idParam = await lastValueFrom(idUsuario);
    
    let usuario2;
    if(this.idParam['id_user'] == 1002){
      usuario2 = 1003;
    }else{
      usuario2 = 1002;
    }

    let messageInfo = {
      message: this.nuevoMensaje,
      messageType: 1,
      currentUser: this.idParam['id_user'],
      idUsuario2: usuario2,
    };

    this.chatService.sendMessage(messageInfo);

    this.nuevoMensaje = '';
  }
}
