async function crearPost(titulo,contenido) {
    try{
        let respuesta = await fetch(`https://api.restful-api.dev/objets`,
        {
            method: "POST",
            Headers: {
                "content-Type": "application/json",
            },
            body: JSON.stringify({
                name: titulo,
                data: contenido,
            }),
        })

if(!respuesta.ok) {
    throw new Error("Error en la solicitud: " + respuesta.statusText);
}

let data = await respuesta.jason();
console.log("Registro Creado:", data);

    } catch (error) {
        console.error("Error algo salio mal al crear el registro:", error)
    }
}