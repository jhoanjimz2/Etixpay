import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  search: string = '';

  constructor(
    private router: Router
  ) { }
  marcketplace() {
    this.router.navigate(["/tabs/marketplace/store/"+this.search]);
    this.search = '';
  }

}
