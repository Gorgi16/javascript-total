function evaluarCompra(cantidadDisponible){
    let elementoRespuesta = document.getElementById("decision");

    let elementoCantidad = document.getElementById("textoCantidad");
    let elementoCompra = elementoCantidad.Value;

    if (cantidadCompra < cantidadDisponible) {
        elementoRespuesta.textContent = "Compraste" + cantidadCompra + "hay disponible aun" + (cantidadDisponible - PerseIn(cantidadCompra)).toString();;
    }
}