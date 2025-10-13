// estos son los nombres de los mounstruos y el daño minimo y maximo que se tenia que hacer y tambien la vida y turnos
const monstruos = ["Venom", "Spider-Man", "Batman", "SuperMan"];
const MIN_DANIO = 10;
const MAX_DANIO = 30;

let vidas = [100, 100, 100, 100];
let turnos = [3, 3, 3, 3];
let ultimoAtacado = null;
let juegoIniciado = false;

let daniosActuales = [];

//esto hace que se genere los numeros aleatorios en cada una de las filas
function generarDaniosAleatorios() {
    daniosActuales = monstruos.map(() => [
        Math.floor(Math.random() * (MAX_DANIO - MIN_DANIO + 1)) + MIN_DANIO,
        Math.floor(Math.random() * (MAX_DANIO - MIN_DANIO + 1)) + MIN_DANIO,
        Math.floor(Math.random() * (MAX_DANIO - MIN_DANIO + 1)) + MIN_DANIO
    ]);
}

// esta funcion hace que al momento de iniciar la partida se muestre las vidas y turnos
function iniciarJuego() {
    vidas = [100, 100, 100, 100];
    turnos = [3, 3, 3, 3];
    ultimoAtacado = null;
    juegoIniciado = true;

    generarDaniosAleatorios();

    document.getElementById("mensaje").textContent = "";
    mostrarTabla();
}

// esta funcion lo que hace es poner en cada fila una categoria y muestre los mounstruos su daño, turnos y vida a la hora de iniciar la partida

function mostrarTabla() {
    let html = "<table>";

    html += `
        <tr>
            <th>Monstruo</th>
            <th>Ataque 1</th>
            <th>Ataque 2</th>
            <th>Ataque 3</th>
            <th>Vida</th>
            <th>Turnos</th>
        </tr>
    `;

    for (let i = 0; i < monstruos.length; i++) {
        html += `
            <tr>
                <td>${monstruos[i]}</td>
                <td>${daniosActuales[i][0]}</td>
                <td>${daniosActuales[i][1]}</td>
                <td>${daniosActuales[i][2]}</td>
                <td class="${ultimoAtacado === i ? 'resaltado' : ''}">${vidas[i]}</td>
                <td>${turnos[i]}</td>
            </tr>
        `;
    }

    html += "</table>";
    document.getElementById("tablero").innerHTML = html;
}

//esta funcion hace que elija un atacante random para use un ataque y luego elige un oponente para restarle la vida
//dependiendo del daño que hace el ataque y luego muestra un mensaje para saber quien ataco a quien y por cada ataque 
//que haga se va restando un turno

function ejecutarTurno() {
    if (!juegoIniciado) {
        alert("Inicia una nueva partida.");
        return;
    }

    if (juegoTerminado()) return;

    let atacante;
    do {
        atacante = Math.floor(Math.random() * monstruos.length);
    } while (vidas[atacante] <= 0 || turnos[atacante] <= 0);

    let oponente;
    do {
        oponente = Math.floor(Math.random() * monstruos.length);
    } while (oponente === atacante || vidas[oponente] <= 0);

    let ataque = Math.floor(Math.random() * 3);
    let danio = daniosActuales[atacante][ataque];

    vidas[oponente] -= danio;
    if (vidas[oponente] < 0) vidas[oponente] = 0;
    turnos[atacante]--;
    ultimoAtacado = oponente;

    document.getElementById("mensaje").textContent =
        `${monstruos[atacante]} atacó a ${monstruos[oponente]} con Ataque ${ataque + 1} (${danio} daño)`;

    mostrarTabla();
    juegoTerminado();
}
//en esta funcion se elige al ganador por medio de la vida restante y se termina el juego cuando se queden sin turnos
//y manda el mensaje final con el nombre del ganador y la vida que le quedo

function juegoTerminado() {
    const vivos = vidas.filter(v => v > 0).length;
    const turnosRestantes = turnos.some(t => t > 0);

    if (vivos <= 1 || !turnosRestantes) {
        let ganadores = [];
        let maxVida = Math.max(...vidas);
        for (let i = 0; i < monstruos.length; i++) {
            if (vidas[i] === maxVida) ganadores.push(monstruos[i]);
        }

        let mensajeFinal = "";
        if (ganadores.length === 1) {
            mensajeFinal = `${ganadores[0]} gana con ${maxVida} de vida restante`;
        } else {
            mensajeFinal = `Empate entre: ${ganadores.join(", ")} (${maxVida} de vida)`;
        }

        document.getElementById("mensaje").textContent = mensajeFinal;
        juegoIniciado = false;
        return true;
    }
    return false;
}