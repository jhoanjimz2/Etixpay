import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/marketplace/reponseProducts.model';
import { CategoriesMarkeplace } from 'src/app/models/marketplace/responseCategories.model';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { ColorPickerComponent } from '../color-picker/color-picker.component';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss'],
})
export class MarketplaceComponent {

  @Output() actualizarInformation: EventEmitter<any> = new EventEmitter();
  @Input() categories: CategoriesMarkeplace[];
  @Input() products: Product[];
  @Input() editar: boolean = false;
  @Input() uuid: string = "";
  chip: string = '';
  search: string = '';

  constructor(
    private router: Router,
    private popoverController: PopoverController
  ) {}


  selectCategoria(tipo) {
    if (tipo == '') this.chip = '';
    else if (this.chip == tipo) this.chip = '';
    else if (this.chip != tipo) this.chip = tipo;
  }
  showDetail(id: number) {
    if (this.editar) return this.colorPicker();
    this.router.navigate(["pages/marketplace/item-detail", id]);
  }

  async colorPicker() {
    const popover = await this.popoverController.create({
      component: ColorPickerComponent,
      cssClass: 'popover-horario',
      componentProps: { uuid: this.uuid },
      backdropDismiss: true
    });
    await popover.present();
    let data = await popover.onDidDismiss();
    if (data) if (data.data) this.actualizarInformation.emit();
  }

}
