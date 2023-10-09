import {Component, OnInit} from '@angular/core';
import {DetailsOrderComponent} from "../details-order/details-order.component";
import {OrderService} from "../../servicios/order.service";
import {HistoryService} from "../../servicios/history.service";
import {interval} from "rxjs";

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

  constructor(private orderService: OrderService, private historyService: HistoryService) {
  }

    listImages: Image[] = [];

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


  getHistory(){
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

    subirImagenes() {
        for (const imagen of this.listImages) {
            console.log(imagen.file.size);
        }
    }

    deleteImage(image: Image) {
        this.listImages = this.listImages.filter(i => i !== image);
    }

    ngOnInit(): void {
      this.selectedOrder = this.orderService.getSelectedOrder();
      this.getHistory();
    }

}
