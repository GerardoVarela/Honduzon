import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-details-page',
  templateUrl: './user-details-page.component.html',
  styleUrls: ['./user-details-page.component.css'],
})
export class UserDetailsPageComponent implements OnInit {

  public idUser!: number;
  public loggedUser: any;
  public backendHost: string = 'http://localhost:8888';

  constructor(private modalService: NgbModal, private activatedRoute: ActivatedRoute, private httpClient: HttpClient, private cookieService: CookieService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id_user}) => this.idUser = id_user);

    this.httpClient.get(`${this.backendHost}/login/getloggeduser`,{
      headers:new HttpHeaders({
        authorization: 'Bearer '+ this.cookieService.get('ACCESS_TOKEN') || ''
      })
    }).subscribe( res => {
      this.loggedUser = res;
    });
  }

  openLG(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  openSM(content: any) {
    this.modalService.open(content, { size: 'sm' });
  }

}
