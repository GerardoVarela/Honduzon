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
  public idParam: any;
  public idCurrentUser: any;
  public allUserChats: any;
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
  }

  enviarMensaje() {
    
    // let usuario2;
    // if(this.idParam['id_user'] == 1002){
    //   usuario2 = 1003;
    // }else{
    //   usuario2 = 1002;
    // }

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
        // element.scrollTop = Math.ceil(element.scrollHeight - element.clientHeight);
        element.scrollTop = element.scrollHeight;
        // element.scrollTop = 500;
        // element.scrollTo(0, element.scrollHeight);
      }
    }

    this.nuevoMensaje = '';
  }

  selectChat(idChat: number, idNewUser: number){
    this.chatSelected = idChat;
  }

}
