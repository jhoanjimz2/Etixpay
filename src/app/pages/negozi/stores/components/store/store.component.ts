import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent {
  @Input() store: any = [];

  constructor(
    private router: Router
  ) { }

  irStorePage() {
    this.router.navigate(["/pages/negozi/store-page/"+ this.store.uuid]);
  }

}
