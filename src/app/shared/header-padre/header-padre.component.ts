import { Component, Input } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-header-padre',
  templateUrl: './header-padre.component.html',
  styleUrls: ['./header-padre.component.scss'],
})
export class HeaderPadreComponent {
  @Input() tabs: boolean = false;
  @Input() page: boolean = false;
  @Input() color: string = '#01abe1';
  constructor (
    private settingsService: SettingsService
  ) {
  }
  ngOnChanges() {
    this.settingsService.aplicarTema(this.color);
  }
}
