import { Component, Inject, OnInit, Output } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css'],
})
export class ChatPageComponent implements OnInit {
  
  public backendHost: string = 'http://localhost:8888';
  public nuevoMensaje: string = '';
  public nameToShow: string = '';
  public role: string = '';
  public idParam: any;
  public idCurrentUser: any;
  public allUserChats: any;
  public chatMsgs: any;
  public chatSelected: number | undefined; 

  constructor(
    public chatService: ChatService, 
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient, 
    @Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {

    this.getIdCurrentUser();

  }

  async getIdCurrentUser(){
    let idUser= this.activatedRoute.params.pipe(take(1));

    this.idParam = await lastValueFrom(idUser);
    this.idCurrentUser = this.idParam['id_user'];
    
    let msgs = this.httpClient.get(`${this.backendHost}/chat/${this.idCurrentUser}`).pipe(take(1));
    
    this.allUserChats = await lastValueFrom(msgs);
    console.log(this.allUserChats);

    // this.activatedRoute.queryParams.subscribe(params => {
    //   this.idCategoryParam = params['with'];
    // });
    
    // if(){}

  }

  enviarMensaje() {

    let messageInfo = {
      message: this.nuevoMensaje,
      messageType: 1,
      currentUser: 1,
      idUsuario2: 4,
    };

    if(this.nuevoMensaje !== ''){
      this.chatService.sendMessage(messageInfo);
      // window.scrollTo(0,document.getElementById("scrollChat")!.scrollHeight);
      const element = document.getElementById('scrollChat');
      if(element != null){
        // element.scrollTo(0, element.scrollHeight);
        // element.scrollTop = Math.ceil(element.scrollHeight - element.clientHeight);
        element.scrollTop = element.scrollHeight;
        // element.scrollTop = 500;
        // element.scrollTo(0, element.scrollHeight);
      }
    }

    this.nuevoMensaje = '';
  }

  async selectChat(idChat: number, idUser2: number, nameUser1: string, nameUser2: string){
        
    this.chatSelected = idChat;

    let historial = this.httpClient.get(`${this.backendHost}/chat/mensajesPorChat/CurrentUser=${this.idCurrentUser}&idChat=${idChat}`).pipe(take(1));
    
    this.chatMsgs = await lastValueFrom(historial);
    console.log(this.chatMsgs);

    
    if(this.idCurrentUser == idUser2){
      this.nameToShow = nameUser1; // Por la forma en que guardamos la información en una sala de chat
      this.role = '(comprador)';     // Usuario 1 siempre es el comprador, mientras que el usuario 2 vendedor
    }else{
      this.nameToShow = nameUser2;
      this.role = '(vendedor)';
    }

  }

}
