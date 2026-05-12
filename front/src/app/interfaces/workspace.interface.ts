
// Con estas interfaces intento mapear un workspace en concreto y sus distintos Boards. Por ahora los generales.
export interface MondayResponse {
    workspaces: Workspace[],
    boards: Board[];
}

export interface Workspace{
    id: string;
    name: string;
}

// Esta es la interface que mapea los Boards concretos
export interface Board {
    id: string;
    name: string;
    type: string;
    groups: Group [];
    columns: Column[];
    items_page?: ItemsPage;
}

// Interface para los grupos que puede tener un tablero.
export interface Group {
    id: string;
    title: string;
    color: string;
}

// Viendo algunas cosas de la documentación he encontrado la parte de paginación. Es la que contiene los items, pero se podría eliminar
// de ser necesario
export interface ItemsPage {
    cursor: string | null;
    items: Item[];
}

// Esta parte es simplemente la de estructura de las columnas. Nos viene bien para definir en el front los tipos de elementos que se 
// deberían dibujar.
export interface Column {
    id: string;
    title: string;
    type: string;
    settings: ColumnSettings;
}

// Las settings de una columna. Todos los campos son opcionales, porque aquí podemos encontrar el color, el indice de un status, el formato
// de fechas y monedas, etc, etc.
export interface ColumnSettings {
    
    labels?: StatusLabel[];
    
    
    show_weekends?: boolean;
    date_format?: string;
    
    
    unit?: {
        symbol: string;
        custom_unit: string;
        direction: string;
        precision: number;
    };
}

// Las columnas status pueden tener un array con los labels que la componen, tanto el index, como el color, el texto.
// De existir una columna status debemos de saber las opciones para saber lo que se debe de renderizar.
export interface StatusLabel {
    id: number;
    color: number;
    label: string;
    index: number;
    is_done: boolean;
    is_deactivated: boolean;
    hex: string;
}

// Cada Item que compone un grupo o board, tiene su id, su name y luego un array de valores de columnas.
export interface Item {
    id: string;
    name: string;
    group?: {id: string};
    column_values?: ColumnValue[]; 
}

// Los valores de cada columna de un item.
export interface ColumnValue {
    id: string;
    text: string;
    type: string;
    value: string | null;
}