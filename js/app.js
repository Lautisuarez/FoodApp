/* ---------- VARIABLES ---------- */
let food = document.getElementsByClassName('food');
let modal = document.getElementsByClassName('modal-detalle');
let insertModal = document.getElementById('modal-js')
let close = document.getElementsByClassName('close');
let add = document.getElementById('add');
let less = document.getElementById('less');
let amount = document.getElementById('amount-input');
let valueAmount = Number(amount.value);
let productos = document.getElementById('productos');
let addProduct = document.getElementById('add-product')

/* ---------- CLASES ---------- */
class Food{
    constructor(name, price, desc, url){
        this.name = name;
        this.cantidad = 0;
        this.price = Number(price);
        this.description = desc,
        this.urlImage = url
    }
    insertHTML(dad){
        let contenedor = document.createElement('div');
        contenedor.innerHTML = `
            <article>
                <a href="#" class="food">
                    <img src='${this.urlImage}' alt='${this.description}'>
                    <div class="description-product">
                        <h2>${this.name}</h2>
                        <p>$${this.price}</p>
                    </div>
                    <i class="fas fa-arrow-right"></i>
                </a>
            </article>
        `
        dad.appendChild(contenedor)
    }
}

/* ---------- BASE DE DATOS ---------- */
const doubleBurguer = new Food('Doble carne hamburguesa', 500, "Pan de papa, carne smasheada, queso cheddar, lechuga, tomate, rodajas de cebolla y salsa especial + papas.", "../img/burguers/double.png")
const barbacoaBurguer = new Food('Hamburguesa con barbacoa', 400, "Pan de papa, carne smasheada, queso cheddar, cebolla caramelizada y salsa barbacoa + papas.", "../img/burguers/barbacoa.png")
const bigBurguer = new Food('GRAN Burguer', 650, "3 capas de pan de papa, carne smasheada, queso cheddar, cebolla cortada en brunoise, lechuga, pepinillos y salsa especial + papas.", "../img/burguers/big-burguer.png")
const criollaBurguer = new Food('Hamburguesa criolla', 550, "Pan de papa, dos carnes, queso Emmenthal, mayo casera, toque de chimi, lechuga, tomate, huevos + papas.", "../img/burguers/criolla.png")
const champiBurguer = new Food('Hamburguesa con champiñones', 400, "Pan de papa, dos carnes, queso Emmenthal, mayo casera, champiñones salteados a la plancha + papas.", "../img/burguers/champiñon.png")
let burguers = [doubleBurguer, barbacoaBurguer, bigBurguer, criollaBurguer, champiBurguer];
/* CARGAMOS LA BASE DE DATOS */
for (const b of burguers){
    b.insertHTML(productos)
}

/* ---------- FUNCIONES ---------- */
let contentModal = (f) => {
    /* Rellenamos el modal con el contenido del elemento que se hizo click */
    insertModal.innerHTML = `
        ${f.childNodes[1].outerHTML}
        ${f.childNodes[3].outerHTML}
        <p>${f.childNodes[1].alt}</p>
    `
}
const guardarCarro = (clave, valor) => {
    localStorage.setItem(clave, valor)
}
const getCarro = (clave) => {
    return JSON.parse(localStorage.getItem(clave));
}

/* ---------- EVENTOS ---------- */
/* MODALES */
for (const f of food){
    f.addEventListener('click', (e) => {
        e.preventDefault()
        modal[0].style.display = 'block';
        contentModal(f)
    })
}
close[0].addEventListener('click', (e) => {
    e.preventDefault()
    modal[0].style.display = 'none'
    /* Reseteamos valores */
    valueAmount = 0
    amount.value = valueAmount;
})
/* CANTIDAD */
add.addEventListener('click', (e) => {
    e.preventDefault()
    valueAmount += 1;
    amount.value = valueAmount
})
less.addEventListener('click', (e) => {
    e.preventDefault()
    if (valueAmount == 0){
        valueAmount = 0;
    } else {
        valueAmount -= 1;
    }
    amount.value = valueAmount
})
/* LocalStorage */
addProduct.addEventListener('click', () => {
    let title = addProduct.parentElement.parentElement.childNodes[1].childNodes[3].childNodes[1].innerHTML; // Buscamos el nombre de la comida que eligió
    let amountFood = addProduct.parentElement.parentElement.childNodes[3].childNodes[3].value; // Buscamos la cantidad que eligió
    let flag = true

    for (const f of burguers){ // Recorremos la base de datos y verificamos que la comida exista
        if (title == f.name){
            f.cantidad += Math.abs(Number(amountFood)) // Sumamos la cantidad en el objeto
            let carro = getCarro('carro'); // Obtenemos el carro almacenado en el LocalStorage
            if(carro != null){
                for (const c of carro){ //Recorremos el localStorage del carro
                    if(c.name == title){ // Si el objeto ya existe se le suma la cantidad a ese mismo objeto y la banderase anula
                        c.cantidad += Math.abs(Number(amountFood));
                        flag = false;
                    }
                }
                if (flag){ // Si no hay ningún objeto en el localStorage del carro, entonces se lo agrega
                    carro.push(f)
                }
            } else { // Si el carro está vacío, se le agrega el objeto que el usuario pidió
                carro = [f]
            }
            guardarCarro('carro', JSON.stringify(carro)) // Finalmente guardamos el carro en el localStorage
        }
    }

    /* Aclaramos que el objeto se agrego con exito */
    let success = document.getElementById('success')
    success.innerHTML += `
        <p class='success'>Agregado...</p>
    `
    setTimeout(function(){
        success.removeChild(success.children[0]) // Le establecemos un tiempo para que desaparezca la alerta
        modal[0].style.display = 'none' // Cerramos el modal
    }, (1000))

    /* Reseteamos valores */
    valueAmount = 0
    amount.value = valueAmount;
})