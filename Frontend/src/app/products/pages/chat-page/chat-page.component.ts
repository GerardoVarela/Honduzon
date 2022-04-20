import { Component, Inject, OnInit, Output } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  public msgPlaceholder: string = 'Seleccione un chat para comenzar a chatear...';
  public idParam: any;
  public withQParam: any;
  public idCurrentUser!: number;
  public idUserToSend!: number;
  public allUserChats: any;
  public chatMsgs: any;
  public chatSelected: number | undefined; 

  constructor(
    public chatService: ChatService, 
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient, 
    private modalService: NgbModal,
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

  }

  enviarMensaje() {

    if(this.chatSelected !== undefined){
      let messageInfo = {
        message: this.nuevoMensaje,
        chatId: this.chatSelected,
        messageType: 1,
        currentUser: this.idCurrentUser,
        idUsuario2: this.idUserToSend,
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
    }

    this.nuevoMensaje = '';

  }

  async selectChat(idChat: number, idUser1: number, idUser2: number, nameUser1: string, nameUser2: string){
        
    this.chatSelected = idChat;
    this.msgPlaceholder = 'Escribe un mensaje...'

    let historial = this.httpClient.get(`${this.backendHost}/chat/mensajesPorChat/CurrentUser=${this.idCurrentUser}&idChat=${idChat}`).pipe(take(1));
    
    this.chatMsgs = await lastValueFrom(historial);
    console.log(this.chatMsgs);

    if(this.idCurrentUser == idUser2){
      this.idUserToSend = idUser1;
      
      this.nameToShow = nameUser1; // Por la forma en que guardamos la información en una sala de chat
      this.role = '(comprador)';   // Usuario 1 siempre es el comprador, mientras que el usuario 2 vendedor
    }else{
      this.idUserToSend = idUser2;

      this.nameToShow = nameUser2;
      this.role = '(vendedor)';
    }

  }

  report(content: any, idUser: number){

    this.modalService.open(content, {centered: true});
  }

}
