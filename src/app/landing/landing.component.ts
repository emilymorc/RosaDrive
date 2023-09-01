import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  services: any[] = [
    {
      title: 'Servicio 1',
      description: 'Descripción del servicio 1.'
    },
    {
      title: 'Servicio 2',
      description: 'Descripción del servicio 2.'
    },
    {
      title: 'Servicio 3',
      description: 'Descripción del servicio 3.'
    }
  ];
}
