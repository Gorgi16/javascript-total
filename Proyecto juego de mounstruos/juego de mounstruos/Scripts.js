function escapeXml(unsafe) {
    if (unsafe === null || unsafe === undefined) return "";
    return String(unsafe)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function exportarPartidaXML() {
    if (!juegoIniciado) {
        alert("Inicia una partida antes de exportar.");
        return;
    }
    try {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<partida>\n';
        xml += `  <juegoIniciado>${escapeXml(juegoIniciado)}</juegoIniciado>\n`;
        xml += `  <ultimoAtacado>${escapeXml(ultimoAtacado)}</ultimoAtacado>\n`;
        xml += `  <fecha>${escapeXml(new Date().toLocaleString())}</fecha>\n`;
        xml += `  <monstruos>\n`;
        for (let i = 0; i < (monstruos || []).length; i++) {
            const ataques = (daniosActuales && daniosActuales[i]) ? daniosActuales[i] : [0, 0, 0];
            xml += `    <monstruo>\n`;
            xml += `      <nombre>${escapeXml(monstruos[i])}</nombre>\n`;
            xml += `      <vida>${escapeXml(vidas[i])}</vida>\n`;
            xml += `      <turnos>${escapeXml(turnos[i])}</turnos>\n`;
            xml += `      <ataques>\n`;
            xml += `        <ataque1>${escapeXml(ataques[0])}</ataque1>\n`;
            xml += `        <ataque2>${escapeXml(ataques[1])}</ataque2>\n`;
            xml += `        <ataque3>${escapeXml(ataques[2])}</ataque3>\n`;
            xml += `      </ataques>\n`;
            xml += `    </monstruo>\n`;
        }
        xml += `  </monstruos>\n`;
        xml += `</partida>`;

        const blob = new Blob([xml], { type: "application/xml" });
        const enlace = document.createElement("a");
        enlace.href = URL.createObjectURL(blob);
        enlace.download = "partida.xml";
        document.body.appendChild(enlace);
        enlace.click();
        enlace.remove();
        URL.revokeObjectURL(enlace.href);

        alert("Partida exportada como archivo XML.");
    } catch (error) {
        alert("Error al exportar: " + (error && error.message ? error.message : error));
    }
}

function importarPartidaXML(event) {
    const archivo = event.target.files ? event.target.files[0] : null;
    if (!archivo) {
        alert("No se seleccionó ningún archivo XML.");
        return;
    }
    const lector = new FileReader();
    lector.onload = function (e) {
        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(e.target.result, "application/xml");
            if (xmlDoc.getElementsByTagName("parsererror").length) {
                throw new Error("XML inválido");
            }

            const jiNode = xmlDoc.getElementsByTagName("juegoIniciado")[0];
            juegoIniciado = jiNode ? (jiNode.textContent === "true" || jiNode.textContent === "1") : false;

            const uaNode = xmlDoc.getElementsByTagName("ultimoAtacado")[0];
            const uaText = uaNode ? uaNode.textContent : "";
            ultimoAtacado = uaText === "" ? null : (isNaN(Number(uaText)) ? uaText : Number(uaText));

            const monstruoNodos = xmlDoc.getElementsByTagName("monstruo");
            vidas = [];
            turnos = [];
            daniosActuales = [];
            for (let i = 0; i < monstruoNodos.length; i++) {
                const vidaNode = monstruoNodos[i].getElementsByTagName("vida")[0];
                const turnosNode = monstruoNodos[i].getElementsByTagName("turnos")[0];
                const ataquesNode = monstruoNodos[i].getElementsByTagName("ataques")[0];

                vidas.push(vidaNode ? parseInt(vidaNode.textContent, 10) || 0 : 0);
                turnos.push(turnosNode ? parseInt(turnosNode.textContent, 10) || 0 : 0);

                const a1 = ataquesNode && ataquesNode.getElementsByTagName("ataque1")[0] ? parseInt(ataquesNode.getElementsByTagName("ataque1")[0].textContent, 10) || 0 : 0;
                const a2 = ataquesNode && ataquesNode.getElementsByTagName("ataque2")[0] ? parseInt(ataquesNode.getElementsByTagName("ataque2")[0].textContent, 10) || 0 : 0;
                const a3 = ataquesNode && ataquesNode.getElementsByTagName("ataque3")[0] ? parseInt(ataquesNode.getElementsByTagName("ataque3")[0].textContent, 10) || 0 : 0;

                daniosActuales.push([a1, a2, a3]);
            }

            // Si el XML no contenía todos los monstruos, aseguro tamaños válidos
            const expected = monstruos ? monstruos.length : 0;
            while (vidas.length < expected) vidas.push(0);
            while (turnos.length < expected) turnos.push(0);
            while (daniosActuales.length < expected) daniosActuales.push([0, 0, 0]);

            mostrarTabla();
            document.getElementById("mensaje").textContent = "Partida importada desde XML correctamente.";
        } catch (error) {
            alert("Error al importar la partida: " + (error && error.message ? error.message : error));
        }
    };
    lector.readAsText(archivo);
}