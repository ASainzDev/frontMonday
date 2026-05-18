import { Component, Input, OnInit } from '@angular/core';
import { Column } from '../../interfaces/DTO/board-data.interface';

@Component({
  selector: 'app-label-column',
  imports: [],
  templateUrl: './label-column.component.html',
  styleUrl: './label-column.component.css',
})
export class LabelColumnComponent implements OnInit{

  // Estas son las settings de una columna de tipo label, por lo tanto debo de recibirlo mediante un ouput
  @Input() columnSetting!: Column;

  // Este valor solo está aquí para poder saber cuales son las seleccionadas
  @Input() values!: any;
  
  // Creo un mapa que llevará un number, para el id del label, y un string para su texto.
  opcionesDropdown: Map<number, {label: string, selected: boolean}> = new Map();

  //Debo de asegurarme de que si el número de etiquetas que se pueden seleccionar está definido y es mayor de 1 debe de ser de tipo checkbox
  // Si solo se puede seleccionar 1 tiene que ser de tipo radio
  tipo: 'radio' | 'checkbox';

  constructor(){
    this.tipo = 'checkbox';
  }

  ngOnInit(){

    // Vamos a crear un método para cargar las opciones de labels del dropdown
    this.loadOptions();

    // Después, una vez hemos cargado las diferentes labels debemos asegurarnos de que el dropdown muestra el valor que nosotros hemos
    // traido de el tablero.

    this.displaySelectedValues();
  }

  loadOptions(){
    
    if(this.columnSetting.settings.labels !== undefined){
      this.columnSetting.settings.labels.map((element) => {
        const settings = {
          label: element.label,
          selected: false
        }
        this.opcionesDropdown.set(element.id, settings);
      });
    }

    if(this.columnSetting.settings.label_limit_count === 1){
      this.tipo = 'radio';
    }
  }

  // Según el valor que nos llega de values tenemos un array que nos indica cuales están seleccionadas y cual no.
  displaySelectedValues(){

    if(this.values !== undefined){
      this.values.ids.forEach((index: number) =>{

        const valores = {
          label: this.opcionesDropdown.get(index)?.label,
          selected: true,
        }

        this.opcionesDropdown.set(index, valores);
      })
    }
  }
  
}
