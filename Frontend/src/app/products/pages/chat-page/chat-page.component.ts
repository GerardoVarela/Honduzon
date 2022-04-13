import { Component, Inject, OnInit, Output } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

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

  constructor(public chatService: ChatService, private activatedRoute: ActivatedRoute, @Inject(DOCUMENT) private document: Document) {}

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
      currentUser: 1,
      idUsuario2: 2,
    };

    if(this.nuevoMensaje !== ''){
      this.chatService.sendMessage(messageInfo);
      // window.scrollTo(0,document.getElementById("scrollChat")!.scrollHeight);
      const element = document.getElementById('scrollChat');
      if(element != null){
        // element.scrollTo(0, element.scrollHeight);
        console.log(element.scrollHeight);
        console.log(element.clientHeight);
        console.log(element.scrollHeight - element.clientHeight);
        // element.scrollTop = Math.ceil(element.scrollHeight - element.clientHeight);
        element.scrollTop = element.scrollHeight;
        // element.scrollTop = 500;
        // element.scrollTo(0, element.scrollHeight);
        console.log(element.scrollTop);
      }
    }

    this.nuevoMensaje = '';
  }

  scrollToBottom(): void {
    (function smoothscroll(): void {
        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - (currentScroll / 8));
        }
    })();
}
}
