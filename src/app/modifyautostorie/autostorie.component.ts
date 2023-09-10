import { Component } from '@angular/core';

@Component({
  selector: 'app-autostorie',
  templateUrl: './autostorie.component.html',
  styleUrls: ['./autostorie.component.css']
})
export class ModifyautostorieComponent {

  optionsBodyTipe = ['Automóvil', 'Campero', 'Camión', 'Volqueta', 'Bus', 'Microbús', 'Motocicleta', 'Tractocamión', 'Motocarro', 'Cuatrimoto', 'Remolque', 'Semirremolque', 'Vehículo especial', 'Chasis con cabina', 'Camión grúa', 'Ambulancia', 'Carro de bomberos', 'Cabezote', 'Furgoneta', 'Camión cisterna', 'Camión plataforma', 'Camión recolector', 'Vehículo de carga ligera', 'Vehículo eléctrico', 'Camión tanque', 'Camión blindado', 'Remolque de carga', 'Autobús de turismo', 'Autobús escolar', 'Camión de volteo', 'Motocicleta eléctrica', 'Triciclo motorizado', 'Bicicleta motorizada', 'Vehículo de ferrocarril', 'Tractor agrícola', 'Maquinaria de construcción', 'Camión frigorífico', 'Camión de reparto', 'Camión de carga peligrosa', 'Camión de basura', 'Camión de mudanza', 'Remolque de alimentos', 'Camión de bomberos aéreo', 'Vehículo de rescate', 'Caravana', 'Camión de pasajeros', 'Remolque de carga pesada', 'Vehículo todoterreno', 'Camión de reparto de gas', 'Remolque de ganado'];
  transitAgency = ['Particular', 'Público', 'Oficial', 'Diplomático', 'Militar', 'Policía', 'Educación', 'Salud', 'Seguridad', 'Transporte escolar', 'Bomberos', 'Taxi', 'Transporte de carga', 'Transporte mixto', 'Transporte turístico', 'Otro'];
  vehicleState = ['En circulación', 'Fuera de circulación', 'Siniestrado', 'Chatarra', 'Robado o desaparecido', 'En proceso de importación o nacionalización'];
  transitAgency1 = ['Ministerio de Transporte', 'Dirección General de Tránsito y Transporte Terrestre (DIGETT)', 'Secretarías de Tránsito y Transporte', 'Policía de Tránsito', 'Superintendencia de Transporte', 'Autoridades de Transporte Público', 'Instituto Nacional de Vías (INVIAS)', 'Agencias de Control de Tráfico', 'Entidades de Control Ambiental']
  combustible = ['Gasolina', 'Diésel', 'Gas Natural Vehicular (GNV)', 'Gas Licuado de Petróleo (GLP)', 'Eléctrico', 'Híbrido', 'Etanol', 'Hidrógeno'];
}
