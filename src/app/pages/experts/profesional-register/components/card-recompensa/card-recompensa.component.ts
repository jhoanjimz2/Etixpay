import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-card-recompensa',
  templateUrl: './card-recompensa.component.html',
  styleUrls: ['./card-recompensa.component.scss'],
})
export class CardRecompensaComponent implements OnInit {

  constructor(
    private popoverController: PopoverController
  ) { }

  ngOnInit() {}

  authorize(res: boolean) {
    this.popoverController.dismiss({data: res});
  }

}
