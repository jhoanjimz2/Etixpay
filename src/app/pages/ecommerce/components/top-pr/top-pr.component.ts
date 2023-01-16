import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-top-pr',
  templateUrl: './top-pr.component.html',
  styleUrls: ['./top-pr.component.scss'],
})
export class TopPrComponent {
  
  @Input()topPr: any = [];
  @Input()cargarTops;
  @Input()paginaActualT: number = 0;
  @Input()paginasTotalesT: number = 0;
  @Output() next: EventEmitter<any> = new EventEmitter();

  constructor(
  ) { }

  
  irSitioWeb(sitioWeb) {
    window.open(sitioWeb);
  }
  siguiente() {
    this.next.emit();
  }


}
