class Animal {
    constructor(nombre, peso, edad) {
        this.nombre = nombre;
        this.peso = peso;
        this.edad = edad;
    }
    informacion() {
        return `Nombre: ${this.nombre}, Peso: ${this.peso}, Edad: ${this.edad}`;
    }
}

class perro1 extends Animal {
    constructor(nombre, peso, edad, raza) {
        super(nombre, peso, edad);
        this.raza = raza;
    }
    informacion() {
        return `Nombre: ${this.nombre}, Peso: ${this.peso}, Edad: ${this.edad}, Raza: ${this.raza}`;
    }
}

class gato1 extends Animal {
    constructor(nombre, peso, edad, sexo) {
        super(nombre, peso, edad);
        this.sexo = sexo;
    }
    informacion() {
        return `Nombre: ${this.nombre}, Peso: ${this.peso}, Edad: ${this.edad}, Sexo: ${this.sexo}`;
    }
}

class conejo1 extends Animal {
    constructor(nombre, peso, edad, color) {
        super(nombre, peso, edad);
        this.color = color;
    }
    informacion() {
        return `Nombre: ${this.nombre}, Peso: ${this.peso}, Edad: ${this.edad}, Color: ${this.color}`;
    }
}

let perro = new perro1('Shishi', 4, 8, 'Buldog');
let gato = new gato1('Milty', 3, 5, 'Hembra');
let conejo = new conejo1('Mocho', 6, 6, 'Negro');

let array1 = [perro, gato, conejo];

document.getElementById('showAnimalsBtn').addEventListener('click', mostrarAnimales);

function mostrarAnimales() {
    const animalsContainer = document.getElementById('animalsContainer');
    animalsContainer.innerHTML = ''; 

    array1.forEach(animal => {
        const animalCard = document.createElement('div');
        animalCard.classList.add('animal-card');
        animalCard.textContent = animal.informacion();
        animalsContainer.appendChild(animalCard);
    });
}
