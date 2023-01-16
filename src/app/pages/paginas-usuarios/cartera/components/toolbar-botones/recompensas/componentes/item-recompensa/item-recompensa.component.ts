import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-recompensa',
  templateUrl: './item-recompensa.component.html',
  styleUrls: ['./item-recompensa.component.scss'],
})
export class ItemRecompensaComponent implements OnInit {
  @Input() item: any;

  constructor() { }

  ngOnInit() {
  }

}
