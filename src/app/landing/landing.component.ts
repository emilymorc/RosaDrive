import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  services: any[] = [
    {
      title: 'ISO 9001',
      description: 'Nuestros procesos son certificados.'
    },
    {
      title: 'Cabina de pintura',
      description: 'Aplicación y secado en condiciones optimas'
    },
    {
      title: 'Laboratorio propio',
      description: 'Mezcla computarizada de pinturas de la mejor calidad'
    },
    {
      title: 'Instalaciones',
      description: 'Mas de 10.000 M² distribuidos técnicamente'
    },
    {
      title: 'Factor Humano',
      description: 'Contamos con\n' +
        'técnicos en todas\n' +
        'nuestras áreas'
    },
    {
      title: 'Bancada estiraje',
      description: 'Alineación de\n' +
        'carrocería\n' +
        'certificada'
    },
    {
      title: 'Diagnostico',
      description: 'Equipos electrónicos\n' +
        'diagnostican con\n' +
        'precisión\n' +
        '\n '
    },
    {
      title: 'Soldadura de punto',
      description: 'Equipos garantizan\n' +
        'la originalidad\n' +
        'del vehículo'
    },
    {
      title: 'Calidad certificada',
      description: 'Todos los procesos\n' +
        'cumplen estándares\n' +
        'de calidad'
    }
  ];
}
