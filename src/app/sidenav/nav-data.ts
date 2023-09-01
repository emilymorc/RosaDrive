import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
  {
    routeLink: 's',
    icon: 'fal fa-home',
    label: 'Inicio'
  },
  {
    routeLink: 'product',
    icon: 'fa solid fa-user',
    label: 'Usuarios',
    items: [
      {
        routeLink: 'create',
        label: 'Crear',
      },
      {
        routeLink: 'product/level1.2',
        label: 'Modificar',
      },
      {
        routeLink: 'product/level1.2',
        label: 'Ver',
      }
    ]
  },
  {
    routeLink: 'statistics',
    icon: 'fa solid fa-car',
    label: 'Automotores',
    items: [
      {
        routeLink: 'product/level1.1',
        label: 'Crear',
      },
      {
        routeLink: 'product/level1.2',
        label: 'Modificar',
      },
      {
        routeLink: 'product/level1.2',
        label: 'Ver',
      }
    ]
  },
  {
    routeLink: 'coupens',
    icon: 'fal fa-scroll',
    label: 'Reportes',
  },
  {
    routeLink: 'login',
    icon: 'fa solid fa-address-book',
    label: 'Agendar'
  }
];
