import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-card-authorization',
  templateUrl: './card-authorization.component.html',
  styleUrls: ['./card-authorization.component.scss'],
})
export class CardAuthorizationComponent implements OnInit {

  constructor(
    private popoverController: PopoverController
  ) { }

  ngOnInit() {}

  authorize(res: boolean) {
    this.popoverController.dismiss({data: res});
  }


}
