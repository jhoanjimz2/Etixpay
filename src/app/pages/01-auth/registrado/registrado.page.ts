import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registrado',
  templateUrl: './registrado.page.html',
  styleUrls: ['./registrado.page.scss'],
})
export class RegistradoPage implements OnInit {

  constructor(
    private router: Router,
    private nav: NavController
  ) { }

  ngOnInit() {
  }
  go_email() {
    this.router.navigate(["/auth/login"]);
    this.nav.navigateBack("/auth/login");
    window.location.href="https://gmail.com";
  }

}
