import { Component, Input } from '@angular/core';
import { NegoziService } from '../../../../../services/negozi.service';

@Component({
  selector: 'app-tix-euro-animal',
  templateUrl: './tix-euro-animal.component.html',
  styleUrls: ['./tix-euro-animal.component.scss'],
})
export class TixEuroAnimalComponent{
  @Input() informacionLocal: any = {};
  @Input() uuid: string = "";

  constructor(
    private negoziService: NegoziService
  ) { 
  }

  euro() {
    this.negoziService.cambiarEURO(this.uuid).subscribe((data: any) => {
    }, error => {})
  }
  tix() {
    this.negoziService.cambiarTIX(this.uuid).subscribe((data: any) => {
    }, error => {})
  }
  pets() {
    this.negoziService.cambiarANIMALS(this.uuid).subscribe((data: any) => {
    }, error => {})
  }

}
