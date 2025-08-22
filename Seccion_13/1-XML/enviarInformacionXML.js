function enviarFormulario() {
    // Obtener los valores de los campos del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const anio = document.getElementById('anio').value;

    // Crear un objeto XML
    const xmlData = `
        <usuario>
            <nombre>${nombre}</nombre>
            <email>${email}</email>
            <anio>${anio}</anio>
        </usuario>
    `;
    //Almacenar el XML en el localStorage
    localStorage.setItem('usuarioXML', xmlData);

    //Redirigir a la pagina de visualizacion
    window.location.href = 'visualizarXML.html';

    // Evitar que el formulario se envie de forma tradicional
    return false;
}