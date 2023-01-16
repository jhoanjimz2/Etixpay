import { Component } from '@angular/core';
import { NegoziService } from '../../../../services/negozi.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-welcome-news-shops',
  templateUrl: './welcome-news-shops.component.html',
  styleUrls: ['./welcome-news-shops.component.scss'],
})
export class WelcomeNewsShopsComponent {

  shops: any = [];
  controlPaginas: number = 1;
  ultimaPagina: number = 0;

  constructor(
    private negoziService: NegoziService,
    private router: Router,
    private navCtrl: NavController
  ) {
    this.welcomeNewsShops();
  }
  welcomeNewsShops() {
    this.negoziService.welcomeNewsShops().subscribe((data : any) => {
      this.shops = data.data.data;
    })
  }
  
  irNegoziPage(uuid) {
    this.navCtrl.navigateBack("/pages/negozi/store-page/"+ uuid);
    this.router.navigate(["/pages/negozi/store-page/"+ uuid]);
  }

}
