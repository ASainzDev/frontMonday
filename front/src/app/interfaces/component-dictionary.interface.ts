
// Este Record se va a usar para evitar un switch enorme a la hora de decidir que componente debemos de renderizar en pantalla
// Como los tipos de columnas de monday son muchos y cada uno debe de llevar su propio componente, hay que buscar una forma de 
// seleccionarlo de forma dinámica

// La Key de este record va a ser el type del elemento y el value debe de ser componente que se le va a asginar
export const componentDictionary : Record<string, any> = {

}