import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-module-page',
  templateUrl: './admin-module-page.component.html',
  styleUrls: ['./admin-module-page.component.css'],
})
export class AdminModulePageComponent implements OnInit {
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  openLG(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  openSM(content: any) {
    this.modalService.open(content, { size: 'sm' });
  }
}
