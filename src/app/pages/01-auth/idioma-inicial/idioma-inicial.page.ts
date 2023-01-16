import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-idioma-inicial',
  templateUrl: './idioma-inicial.page.html',
  styleUrls: ['./idioma-inicial.page.scss'],
})
export class IdiomaInicialPage implements OnInit {

  constructor(
    private translate: TranslateService,
    private router: Router,
    private nav: NavController
    ) { }

  ngOnInit() {
  }
  selecionarIdioma(len) {
    localStorage.setItem('lenguaje', len.detail.value);
    this.translate.use(len.detail.value);
  }
  modalClose() {
    this.router.navigate(["auth/login"]);
  }

}
