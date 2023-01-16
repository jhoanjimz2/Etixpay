
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ModalController, NavController, PopoverController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor(
    private router: Router,
    private modalController: ModalController,
    private nav: NavController
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    const token: string = localStorage.getItem('token');

    let request = req;

    if (token) request = req.clone({setHeaders: {authorization: `Bearer ${ token }`}});

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status === 401) this.remueveTodo();

        return throwError( err );

      })
    );
  }
  remueveTodo() {
    this.modalController.dismiss();
    this.router.navigate(["auth/login"]);
    this.nav.navigateBack("auth/login");
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
