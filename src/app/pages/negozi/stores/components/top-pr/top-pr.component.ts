import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

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
    private router: Router
  ) { }

  
  irNegoziPage(uuid) {
    this.router.navigate(["/pages/negozi/store-page/"+ uuid]);
  }
  siguiente() {
    this.next.emit();
  }

}
