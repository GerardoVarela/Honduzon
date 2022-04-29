import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-details-page',
  templateUrl: './user-details-page.component.html',
  styleUrls: ['./user-details-page.component.css'],
})
export class UserDetailsPageComponent implements OnInit {
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  openLG(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  openSM(content: any) {
    this.modalService.open(content, { size: 'sm' });
  }
}
