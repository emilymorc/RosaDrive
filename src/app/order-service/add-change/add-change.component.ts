import {Component, OnInit} from '@angular/core';
import {DetailsOrderComponent} from "../details-order/details-order.component";
import {OrderService} from "../../servicios/order.service";
import {HistoryService} from "../../servicios/history.service";
import {interval} from "rxjs";
import {ChangeService} from "../../servicios/change.service";
import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {FormBuilder} from "@angular/forms";

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

  listImages: Image[] = [];
  description: any;
  remplaced_parts: any;

  selectedOrder: any = {};
  historySelected: any = {};
  imagesApiKey: string = "b9eb61371f94895bbcb1b8ee9e15e144";
  showError = false; // Para mostrar u ocultar el error

  constructor(private orderService: OrderService, private historyService: HistoryService, private changeService: ChangeService, private toastr: ToastrService,private formBuilder: FormBuilder) {

  }

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
      const format = /[^A-Za-z0-9\-]/;

      // if (this.description.trim() === '' || this.remplaced_parts.trim()) {
      //   this.toastr.error("Por favor, complete todos los campos", "Campos Vacios");
      //   return;
      // }
      //
      // if (format.test(this.remplaced_parts) || format.test(this.remplaced_parts)) {
      //   this.toastr.error("Existen campos con caracteres especiales", "¡Campos incorrectos!");
      //   this.showError = true;
      //   return;
      // }

      this.changeService.addChange(this.selectedOrder.ID_ORDER, description, responsible_technician).subscribe(
        response => {
          console.log('Cambio agregado:', response);
          const changeId = response.insertId;
          this.postImages(changeId);
          console.log(changeId);
          this.toastr.success("Cambio agregado con exito", "EXITOSO!");
        },
        error => {
          console.error('Error al agregar el cambio:', error);
          this.toastr.error("Ocurrio un error al crear el cambio , intente de nuevo", "ERROR!");
        }
      );
    }
    //this.postImages();
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

  async postImages(idChange: number) {
    for (const imagen of this.listImages) {
      const base64Image = await this.fileToBase64(imagen.file);
      console.log(base64Image);

      this.changeService.uploadImage(base64Image, this.imagesApiKey).subscribe(
        response => {
          const imageUrl = response.data.display_url;
          const imageName = response.data.image.filename;
          console.log('Imagen subida con éxito:', response);
          this.uploadChangeImage(idChange, imageUrl, imageName);
          /*console.log(imageUrl);
          console.log(imageName);*/
        },
        error => {
          console.error('Error al subir la imagen:', error);
        }
      );
    }
  }

  uploadChangeImage(changeId: number, displayUrl: string, filename: string) {
    this.changeService.uploadChangeImage(changeId, displayUrl, filename).subscribe(
      response => {
        console.log('Imagen subida al back con éxito:', response);
      },
      error => {
        console.error('Error al subir la imagen:', error);
      }
    );
  }

  fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result?.toString().split(',')[1] || '';
        resolve(base64String);
      };
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
