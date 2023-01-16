import { Component, Input } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-object-proyect',
  templateUrl: './object-proyect.component.html',
  styleUrls: ['./object-proyect.component.scss'],
})
export class ObjectProyectComponent {
  
  @Input() proyecto;
  @Input() home = true;

  constructor(
    private action_sheet_controller: ActionSheetController,
    private translate_service: TranslateService,
    private router: Router
  ) { }

  comprar_ticket_proyecto(proyecto) {
    this.router.navigate(['/pages/invest/buy-invest'], { queryParams: { order: JSON.stringify(proyecto) } });
  }
  simular_compra_ticket_proyecto(proyecto) {
    this.router.navigate(['/pages/invest/simulacion'], { queryParams: { order: JSON.stringify(proyecto) } });
  }
  
  async descargar_documentos() {
    let actionSheet = await this.action_sheet_controller.create({
      cssClass: 'action_sheet_documentos',
      mode: 'ios',
      buttons: this.crear_botones(this.proyecto.documentos)
    });
    await actionSheet.present();
  }
  crear_botones(documentos) {
    let  cancelar, nohay;
    this.translate_service.get('NODOCUMENTATION').subscribe(data => nohay = data);
    this.translate_service.get('CANCELAR4').subscribe(data => cancelar = data);
    let buttons = [];
    if (documentos.length) {
      documentos.forEach(documento => {
        let url = documento.documentoURL;
        let button =  {
          text: documento.documentoTITULO,
          cssClass: 'boton_selector',
          icon: 'document',
          handler: () => {  window.open(url);  }
        };
         buttons.push(button);
      });
    }
    if (!documentos.length) {
      let button =  {
        text: nohay,
        cssClass: 'boton_selector',
        handler: () => {}
      };
       buttons.push(button);
    }
    let button = { text: cancelar, cssClass: 'boton_cancel_action_sheet', role: 'cancel' };
    buttons.push(button);
    return buttons;
  }
}
