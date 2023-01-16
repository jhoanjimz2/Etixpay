import { Component } from '@angular/core';
import { FormBuilder, FormControl } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-security',
  templateUrl: './security.page.html',
  styleUrls: ['./security.page.scss'],
})
export class SecurityPage {
  formulario = this.formBuilder.group({
    toggle: new FormControl('', [
    ])
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
    ) { 
    let toggle = false;
    if (localStorage.getItem('recuerdame')) toggle = true;
    this.formulario.controls['toggle'].setValue(toggle);
  }
  togle(evento) {
    if (evento) {
      this.recuerdame();
    } else {
      this.olvidame();
    }
  }
  recuerdame() {
    let rec = { 'email': JSON.parse(localStorage.getItem('user')).username };
    localStorage.setItem('recuerdame', JSON.stringify(rec));
  }
  olvidame() {
    localStorage.removeItem('recuerdame');
  }
  changePassword() {
    this.router.navigate(['/pages/ajustes/change-password']);
  }

}
