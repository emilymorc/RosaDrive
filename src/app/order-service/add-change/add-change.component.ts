import {Component, OnInit} from '@angular/core';
import {DetailsOrderComponent} from "../details-order/details-order.component";
import {OrderService} from "../../servicios/order.service";
import {HistoryService} from "../../servicios/history.service";
import {interval} from "rxjs";
import {ChangeService} from "../../servicios/change.service";
import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

interface Image {
  name: string;
  miniature: string;
  file: File;
}

@Component({
  selector: 'app-add-change',
  templateUrl: './add-change.component.html',
  styleUrls: ['./add-change.component.css']
})
export class AddChangeComponent implements OnInit {

  selectedOrder: any = {};
  historySelected: any = {};

  constructor(private orderService: OrderService, private historyService: HistoryService, private changeService: ChangeService, private toastr: ToastrService) {
  }

  listImages: Image[] = [];
  description: any;
  remplaced_parts: any;

  onFileSelected(event: Event) {
    const input = (event.target as HTMLInputElement);
    if (input?.files) {
      for (const file of Array.from(input.files)) {
        const reader = new FileReader();
        reader.onload = () => {
          const imagen: Image = {
            name: file.name,
            miniature: reader.result as string,
            file: file // Guardamos el archivo
          };
          this.listImages.push(imagen);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files) {
      for (const file of Array.from(files)) {
        const reader = new FileReader();
        reader.onload = () => {
          const imagen: Image = {
            name: file.name,
            miniature: reader.result as string,
            file: file

          };
          this.listImages.push(imagen);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  addChange(changeDataForm: NgForm) {
    if (changeDataForm.valid) {
      const description = changeDataForm.value.description;
      const responsible_technician = changeDataForm.value.remplaced_parts;

      this.changeService.addChange(this.selectedOrder.ID_ORDER, description, responsible_technician).subscribe(
        response => {
          console.log('Cambio agregado:', response);
          this.toastr.success("Cambio agregado con exito", "EXITOSO!");
        },
        error => {
          console.error('Error al agregar el cambio:', error);
          this.toastr.error("Ocurrio un error al crear el cambio , intente de nuevo", "ERROR!");
        }
      );
    }
    this.postImages();
  }

  getHistory() {
    this.historyService.getHistoryById(this.selectedOrder.ID_STORY).subscribe(
      response => {
        this.historySelected = response[0];
        //console.log(this.historySelected[0]);
      },
      error => {
        console.error('Error al obtener datos del Historial:', error);
      }
    );
  }

  async postImages() {
    for (const imagen of this.listImages) {
      const base64Image = await this.fileToBase64(imagen.file);
      console.log(base64Image);

     /*this.changeService.uploadImageOrder({
        idStory: this.historySelected.ID_STORY,
        idOrder: this.selectedOrder.ID_ORDER,
        imageUp: base64Image
      }).subscribe(
        response => {
          console.log('Imagen subida con éxito:', response);
        },
        error => {
          console.error('Error al subir la imagen:', error);
        }
      );*/
    }
  }

  fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }


  deleteImage(image: Image) {
    this.listImages = this.listImages.filter(i => i !== image);
  }

  ngOnInit(): void {
    this.selectedOrder = this.orderService.getSelectedOrder();
    this.getHistory();
  }

}
