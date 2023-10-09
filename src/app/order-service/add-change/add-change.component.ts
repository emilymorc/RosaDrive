import {Component, OnInit} from '@angular/core';

interface Imagen {
    nombre: string;
    miniatura: string;
}

@Component({
    selector: 'app-add-change',
    templateUrl: './add-change.component.html',
    styleUrls: ['./add-change.component.css']
})
export class AddChangeComponent implements OnInit {

    listaImagenes: Imagen[] = [];

    onFileSelected(event: Event) {
        const input = (event.target as HTMLInputElement);
        if (input?.files) {
            for (const file of Array.from(input.files)) {
                const reader = new FileReader();
                reader.onload = () => {
                    const imagen: Imagen = {
                        nombre: file.name,
                        miniatura: reader.result as string
                    };
                    this.listaImagenes.push(imagen);
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
                    const imagen: Imagen = {
                        nombre: file.name,
                        miniatura: reader.result as string
                    };
                    this.listaImagenes.push(imagen);
                };
                reader.readAsDataURL(file);
            }
        }
    }

    eliminarImagen(imagen: Imagen) {
        this.listaImagenes = this.listaImagenes.filter(i => i !== imagen);
    }

    ngOnInit(): void {
    }


}
