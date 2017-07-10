import { Component } from '@angular/core';
import { MenubarModule, MenuItem } from 'primeng/primeng';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  items: MenuItem[];
  provider;

  constructor() {
    this.items = [
      {
          label: 'Retos',
          icon: 'fa-list',
          routerLink: ['challange']
      },
      {
          label: 'Partidas',
          icon: 'fa-dashboard',
          routerLink: ['game']
      },
    ];
  }

}
