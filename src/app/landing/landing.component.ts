import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  services: any[] = [
    {
      title: 'Latoneria',
      description: 'El proceso consiste en restaurar las piezas del vehículo que han sido golpeadas.\n' +
        'Para esto es importante implementar mecanismos para corregir las ondulaciones presentes\n' +
        'en una lamina o chapa y hacer que estas tomen la forma original del fabricante.'
    },
    {
      title: 'Pintura',
      description: 'El proceso consiste en restaurar las piezas del vehículo que han sido golpeadas.\n' +
        'Para esto es importante implementar mecanismos para corregir las ondulaciones presentes\n' +
        'en una lamina o chapa y hacer que estas tomen la forma original del fabricante'
    },
    {
      title: 'Mecanica',
      description: 'El proceso consiste en restaurar las piezas del vehículo que han sido golpeadas.\n' +
        'Para esto es importante implementar mecanismos para corregir las ondulaciones presentes\n' +
        'en una lamina o chapa y hacer que estas tomen la forma original del fabricante'
    }
  ];
}
