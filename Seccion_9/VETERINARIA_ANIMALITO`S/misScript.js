let Automovil1 = {
    marca: "Toyota",
    modelo: "Corola",
    anio: 2021,
}
let Automovil2 = {
    marca: "Ferrari",
    modelo: "F90",
    anio: 1980,
}
let Automovil3 = {
    marca: "Nissan",
    modelo: "RT",
    anio: 1989,
}
function verRegistros(){
    let myArray = [Automovil1, Automovil2, Automovil3];
    let lista = document.getElementById("lista");
    let elementosLi = lista.getElementsByTagName("li");
    let primerElemento = elementosLi[0];

    primerElemento.textContent = myArray;

    let nuevoElemento = document.createElement("li");
    lista.appendChild(nuevoElemento);
}
 function UnObjeto(verRegistros) {
        this.myArray = myArray;
      }

      UnObjeto.prototype.metodo1 = function(){}; 
      UnObjeto.prototype.metodo2 = function() {}; 