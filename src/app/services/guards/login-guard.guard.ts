import { Injectable } from '@angular/core';
import { Router, CanLoad } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CuentaService } from 'src/app/services/cuenta.service';



@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanLoad {

  constructor(
    public router: Router,
    private nav: NavController,
    private cuenta_service: CuentaService,
    ) {
  }

  canLoad() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.token) {
      return true;
    } else {
      this.router.navigate(["auth/login"]);
      this.nav.navigateBack("auth/login");
      this.cleanStorage();
      this.cuenta_service.logout().subscribe( (logout: any) => {
        this.cleanStorage();
      } , error => {
        if (error.message) {
          if (error.error.message === 'Unauthenticated.') {
            this.cleanStorage();
          }
        }
      });
      return false;
    }
  }

  cleanStorage() {
    localStorage.removeItem('ciudades');
    localStorage.removeItem('paises');
    localStorage.removeItem('uuidMiEmpresa');
    localStorage.removeItem('user');
    localStorage.removeItem('codepromo');
    localStorage.removeItem('wallet');
    localStorage.removeItem('TIPOUSER');
    localStorage.removeItem('COLABORADOR');
  }
}
