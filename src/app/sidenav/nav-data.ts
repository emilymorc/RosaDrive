import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
  {
    routeLink: 'landing',
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
        routeLink: 'view-users',
        label: 'Ver',
      }
    ]
  },
  {
    routeLink: 'statistics',
    icon: 'fa solid fa-car',
    label: ' Historial Automotores',
    items: [
      {
        routeLink: 'history',
        label: 'Crear',
      },
      {
        routeLink: 'viewStories',
        label: 'Ver',
      }
    ]
  },
  {
    routeLink: 'statistics',
    icon: 'fas fa-receipt',
    label: 'Ordenes de Servicio',
    items: [
      {
        routeLink: 'createOrder',
        label: 'Crear',
      },
      {
        routeLink: 'viewOrder',
        label: 'Ver',
      }
    ]
  },
  {
    routeLink: 'coupens',
    icon: 'fal fa-scroll',
    label: 'Reportes',
    items: [
      {
        routeLink: 'coupens',
        label: 'Ordenes Mecanicos',
        items: [ {
          routeLink: 'reportTecYear',
          label: 'Reporte Anual',
        },

          {
            routeLink: 'reportOrderByTec',
            label: 'Reporte Mensual',
          }]
      },
      {routeLink: 'coupens',
        label: 'Reportes de citas',
        items: [ {
          routeLink: 'reportAppoitmentYear',
          label: 'Reporte Anual',
        },

          {
            routeLink: 'reportMonthAppoitment',
            label: 'Reporte Mensual',
          }]
      },
      {routeLink: 'coupens',
        label: 'Reportes de Ingresos',
        items: [ {
          routeLink: 'reportIcomeByYear',
          label: 'Reporte Anual',
        },
          {
            routeLink: 'reportIcomeByMonth',
            label: 'Reporte Mensual',
          }
          ]
      },
      {routeLink: 'reportHistory',
        label: 'Reportes de historiales',
      },
    ]
  },
  {
    routeLink: 'login',
    icon: 'fa solid fa-address-book',
    label: 'Citas',
    items: [
      {
        routeLink: 'createAppoitment',
        label: 'Crear',
      },
      {
        routeLink: 'viewApoimentComponent',
        label: 'Ver',
      }
    ]
  },
  {
    routeLink: 'logout',
    icon: 'fa solid fa-arrow-right',
    label: 'Cerrar Sesión'
  }
];
