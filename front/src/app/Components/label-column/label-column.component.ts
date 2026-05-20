import { Component, Input, OnInit, signal } from '@angular/core';
import { Column } from '../../interfaces/DTO/board-data.interface';
import { KeyValuePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Como con el mapa no está funcionando muy bien voy a declarar un type para tipar todo mejor y así conseguir que funcione de otra forma
  type ColumnSettings = {
    id: number,
    label: string,
    selected: boolean
  }

@Component({
  selector: 'app-label-column',
  imports: [KeyValuePipe, FormsModule],
  templateUrl: './label-column.component.html',
  styleUrl: './label-column.component.css',
})
export class LabelColumnComponent implements OnInit{

  // Estas son las settings de una columna de tipo label, por lo tanto debo de recibirlo mediante un ouput
  @Input() columnSetting!: Column;

  // Este valor solo está aquí para poder saber cuales son las seleccionadas
  @Input() values!: any;
  
  // Creo un mapa que llevará un number, para el id del label, y un string para su texto.
  opcionesDropdown: Map<number, ColumnSettings> = new Map();

  //Debo de asegurarme de que si el número de etiquetas que se pueden seleccionar está definido y es mayor de 1 debe de ser de tipo checkbox
  // Si solo se puede seleccionar 1 tiene que ser de tipo radio
  tipo: 'radio' | 'checkbox';

   // Como quiero hacerlo parecido a Monday.com, voy a crear un signal, que me va a servir de contador. Este contador es para indicar que hay seleccionadas
  // más de 1 etiqueta. Para ello voy a crear un signal que va a incrementarse cada vez que en mi mapa (que al final lo mismo es verdad y es mejor cambiarlo por 
  // un array) exista mas de un elemento con el valor de seleccionado a true.

  counter = signal<number>(0);

  // Podría ahorrarmelo declarando su valor a la vez que defino la variable pero por costumbre
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
      
      // Lo primero evaluamos que la columna de dropdown que hemos recibido sea de tipo único o selección múltiple
      if(this.columnSetting.settings.label_limit_count === 1){
      this.tipo = 'radio';
    }
      
    // Recorremos el valor de las label que se nos envía, así conocemos todos los valores que se deben desplegar como labels
      this.columnSetting.settings.labels.forEach((element) => {
        
        // Creamos un nuevo elemento del type que hemos definido al inicio del componente
        const value: ColumnSettings = {
          id: element.id,
          label: element.label,
          selected: false
        }

        // Almacenamos ese objeto en nuestro Map
        this.opcionesDropdown.set(value.id, value);
      });
    }
  }

  // Según el valor que nos llega de values tenemos un array que nos indica cuales están seleccionadas y cual no.
  displaySelectedValues(){

    // Trabajo con los valores que recibo y me aseguro de que tengan valor. La columna puede no tener valor
    if(this.values !== undefined){
      // Recorremos el array que nos manda los values de la columna. Monday lo manda como ids: [array de indices seleccionado].
      this.values.ids.forEach((index: number) =>{
    // Buscamos el objeto en el Map
        const objeto = this.opcionesDropdown.get(index);
    // Si lo encontramos, actualizamos su valor de selected a true, para saber que ese valor esta seleccionado dentro del dropdown
        if(objeto){
          objeto.selected = true;
          this.counter.set(this.counter() + 1);
        };
      });
    };
  }
  
}
