const monstruos = ["goku", "vegeta", "piccolo", "freezer"];
let matrizPoderes = [];
let vidas = [100, 100, 100, 100];
let turnos = [3, 3, 3, 3];
let turnosRestantes = null;
let ultimoAtacado = null;


function iniciarJuego() {
    generarMatriz();
    mostrarTabla();
}


function generarMatriz() {
    matrizPoderes = [];
    for (let i = 0; i < monstruos.length; i++) {
        let fila = [];
        for (let j = 0; j < 3; j++) {
            fila.push(Math.floor(Math.random() * 21) + 10);
        }
        matrizPoderes.push(fila);
    }
}


function mostrarTabla() {
    let html = "<table>";


    html += `
        <tr>
          <th>Monstruo</th>
          <th>Ataque 1</th>
          <th>Ataque 2</th>
          <th>Ataque 3</th>
          <th>turnos</th>
          <th>Vida</th>
        </tr>
      `;
    for (let i = 0; i < monstruos.length; i++) {
        html += `<tr>
          <td>${monstruos[i]}</td>
          <td>${matrizPoderes[i][0]}</td>
          <td>${matrizPoderes[i][1]}</td>
          <td>${matrizPoderes[i][2]}</td>
          <td class="${turnosRestantes === i ? 'resaltado' : ''}">${turnos[i]}</td>
          <td class="${ultimoAtacado === i ? 'resaltado' : ''}">${vidas[i]}</td>
        </tr>`;
    }

    html += "</table>";
    document.getElementById("tablero").innerHTML = html;
}