/* ---------- VARIABLES ---------- */
let modal = $( ".modal-detalle" )
let amount = document.getElementById('amount-input');
let valueAmount = Number(amount.value);
let productos = document.getElementById('productos');
let productToAdd = document.getElementById('add-product');
let page = window.location.pathname;
let shop = document.getElementsByClassName('shop')[0].childNodes[1];

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
/* HAMBURGUESAS */
const doubleBurguer = new Food('Doble carne hamburguesa', 500, "Pan de papa, carne smasheada, queso cheddar, lechuga, tomate, rodajas de cebolla y salsa especial + papas.", "../img/burguers/double.png")
const barbacoaBurguer = new Food('Hamburguesa con barbacoa', 400, "Pan de papa, carne smasheada, queso cheddar, cebolla caramelizada y salsa barbacoa + papas.", "../img/burguers/barbacoa.png")
const bigBurguer = new Food('GRAN Burguer', 650, "3 capas de pan de papa, carne smasheada, queso cheddar, cebolla cortada en brunoise, lechuga, pepinillos y salsa especial + papas.", "../img/burguers/big-burguer.png")
const criollaBurguer = new Food('Hamburguesa criolla', 550, "Pan de papa, dos carnes, queso Emmenthal, mayo casera, toque de chimi, lechuga, tomate, huevos + papas.", "../img/burguers/criolla.png")
const champiBurguer = new Food('Hamburguesa con champiñones', 400, "Pan de papa, dos carnes, queso Emmenthal, mayo casera, champiñones salteados a la plancha + papas.", "../img/burguers/champiñon.png")
let burguers = [doubleBurguer, barbacoaBurguer, bigBurguer, criollaBurguer, champiBurguer];
/* LOMITOS */
const completo = new Food('Lomo completo', 600, 'Pan casero, bife de lomo, lechuga, tomate, jamón, huevo, queso, mayo casera, chimi (opcional) + papas.', '../img/lomo/completo.png')
const bigLomo = new Food('BIG lomo', 700, 'Pan casero, bife de lomo, lechuga, tomate, bacon, triple cheddar, cebolla morada y mayo casera + papas.', '../img/lomo/big-lomo.png')
const cheeseLomo = new Food('Cheese lomo', 550, 'Pan casero, bife de lomo, lechuga, tomate, jamón, huevo, queso roquefort, mayonesa casera + papas.', '../img/lomo/cheese.png')
const especialLomo = new Food('Especial lomo', 650, 'Pan casero, bife de lomo, lechuga, tomate, jamón, huevo, queso, mayo casera, chimi (opcional), ajíes y morrones en conserva + papas.', '../img/lomo/especial.png')
let lomos = [completo, bigLomo, cheeseLomo, especialLomo];
/* PAPAS */
const fritas = new Food('Papas fritas', 150, 'Porción de crocantes papas.', '../img/papas/fritas.jpg');
const cheddar = new Food('Papas con cheddar', 180, 'Porción de crocantes fritas con mucho cheddar', '../img/papas/papas-cheddar.jpg');
const baconCheddar = new Food('Fritas con cheddar y bacon', 200, 'Porción de crocantes papas con mucho cheddar y bacon.', '../img/papas/baconCheddar.jpg');
let papas = [fritas, cheddar, baconCheddar]
/* BEBIDAS */
const bebida500 = new Food('Bebida 500ml', 150, 'Agua mineral, Agua saborizada, Coca Cola, Fanta y Sprite', '../img/bebidas/bebida500.png');
const imperial = new Food('Cerveza Imperial 473 cm3', 120, 'Imperial Lager, Imperial Golden, Imperial Ipa', '../img/bebidas/imperial.png');
let bebidas = [bebida500, imperial];
/* CARGAMOS LA BASE DE DATOS */
const insertArray = (array) => {
    for (const a of array){
        a.insertHTML(productos)
    }
}
if (page == '/FoodApp/pages/burguers.html'){
    insertArray(burguers)
} else if (page == '/FoodApp/pages/lomos.html'){
    insertArray(lomos)
} else if(page == '/FoodApp/pages/fries.html') {
    insertArray(papas)
} else if (page == '/FoodApp/pages/drinks.html'){
    insertArray(bebidas)
}

/* ---------- FUNCIONES ---------- */
let contentModal = (f) => {
    /* Rellenamos el modal con el contenido del elemento que se hizo click */
    document.getElementById('modal-js').innerHTML = `
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
const addProduct = (array) => {
    let title = productToAdd.parentElement.parentElement.childNodes[1].childNodes[3].childNodes[1].innerHTML; // Buscamos el nombre de la comida que eligió
    let amountFood = productToAdd.parentElement.parentElement.childNodes[3].childNodes[3].value; // Buscamos la cantidad que eligió
    let flag = true

    for (const a of array){ // Recorremos la base de datos y verificamos que la comida exista
        if (title == a.name){
            a.cantidad += Math.abs(Number(amountFood)) // Sumamos la cantidad en el objeto
            let carro = getCarro('carro'); // Obtenemos el carro almacenado en el LocalStorage
            if(carro != null){
                for (const c of carro){ //Recorremos el localStorage del carro
                    if(c.name == title){
                        c.cantidad += Math.abs(Number(amountFood));
                        flag = false;
                    }
                }
                if (flag){
                    carro.push(a)
                }
            } else {
                carro = [a]
            }
            guardarCarro('carro', JSON.stringify(carro)) // Finalmente guardamos el carro en el localStorage
        }
    }
}

/* ---------- EVENTOS ---------- */
/* MODALES */
for (const f of document.getElementsByClassName('food')){
    f.addEventListener('click', (e) => {
        e.preventDefault()
        modal.css("display", "flex")
        contentModal(f)
    })
}
document.getElementById('close').addEventListener('click', (e) => {
    e.preventDefault()
    modal.toggle('fast')
    /* Reseteamos valores */
    valueAmount = 0
    amount.value = valueAmount;
})
/* CANTIDAD */
document.getElementById('add').addEventListener('click', (e) => {
    e.preventDefault()
    valueAmount += 1;
    amount.value = valueAmount
})
document.getElementById('less').addEventListener('click', (e) => {
    e.preventDefault()
    if (valueAmount == 0){
        valueAmount = 0;
    } else {
        valueAmount -= 1;
    }
    amount.value = valueAmount
})
/* LocalStorage */
productToAdd.addEventListener('click', () => {
    // Lo agregamos al localStorage
    if (page == '/FoodApp/pages/burguers.html'){
        addProduct(burguers)
    } else if (page == '/FoodApp/pages/lomos.html'){
        addProduct(lomos)
    } else if (page == '/FoodApp/pages/fries.html'){
        addProduct(papas)
    } else if (page == '/FoodApp/pages/drinks.html'){
        addProduct(bebidas)
    }

    /* Aclaramos que el objeto se agrego con exito */
    let success = document.getElementById('success')
    success.innerHTML += `
        <p class='success'>Agregado...</p>
    `
    setTimeout(function(){
        success.removeChild(success.children[0]) // Le establecemos un tiempo para que desaparezca la alerta
        modal.toggle('slow'); // Cerramos el modal con jquery
    }, (1000))

    if (shop.childNodes[2] == Element.div) { // Verificamos si la notificación ya fue agregada de un principio por existir ya comidas en el carrito
        shop.innerHTML += `
            <div id='notification'></div>
        `
    }

    /* Reseteamos valores */
    valueAmount = 0
    amount.value = valueAmount;
})

/* PROGRAMA */
if (getCarro('carro').length > 0){
    shop.innerHTML += `
        <div id='notification'></div>
    `
}