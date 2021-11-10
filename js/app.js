/* ---------- VARIABLES ---------- */
let modal = $( ".modal-detalle" )
let amount = document.getElementById('amount-input');
let valueAmount = Number(amount.value);
let productos = document.getElementById('productos');
let productToAdd = document.getElementById('add-product');
let page = window.location.pathname;
let shop = document.getElementsByClassName('shop')[0].childNodes[1];

/* ---------- BASE DE DATOS ---------- */
$.getJSON('../bd.json', (res, est) => {
    if (est === 'success'){
        if (page == '/FoodApp/pages/burguers.html'){
            insertHTML(res.burguers)
        } else if (page == '/FoodApp/pages/lomos.html'){
            insertHTML(res.lomitos)
        } else if(page == '/FoodApp/pages/fries.html') {
            insertHTML(res.fries)
        } else if (page == '/FoodApp/pages/drinks.html'){
            insertHTML(res.drinks)
        }
    }
    /* Si no se realiza el evento durante el llamado ajax, éste no funciona debido a que todavía no existen los elementos en el DOM. Por este motivo se encuentra ubicado acá */
    for (const f of document.getElementsByClassName('food')){
        f.addEventListener('click', (e) => {
            e.preventDefault()
            modal.css("display", "flex")
            contentModal(f)
        })
    }
})
/* CARGAMOS LA BASE DE DATOS AL DOM */
const insertHTML = (array) => {
    for (const i of array){
        let contenedor = document.createElement('div');
        contenedor.innerHTML = `
            <article>
                <a href="#" class="food">
                    <img src='${i.urlImage}' alt='${i.description}'>
                    <div class="description-product">
                        <h2>${i.name}</h2>
                        <p>$<span>${i.price}</span></p>
                    </div>
                    <i class="fas fa-arrow-right"></i>
                </a>
            </article>
        `
        productos.appendChild(contenedor)
    }
}

/* ---------- CLASES ---------- */
class Pedido{
    constructor(name, desc, amount, price, url){
        this.name = name;
        this.description = desc;
        this.amount = amount;
        this.price = price;
        this.urlImage = url;
    }
}

/* ---------- FUNCIONES ---------- */
let contentModal = (f) => {
    /* Rellena el modal con el contenido del elemento que se hizo click */
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
const addProduct = () => {
    let title = productToAdd.parentElement.parentElement.childNodes[1].childNodes[3].childNodes[1].innerHTML; // Buscamos el nombre de la comida que eligió
    let amountFood = Number(productToAdd.parentElement.parentElement.childNodes[3].childNodes[3].value); // Buscamos la cantidad que eligió
    let price = Number(productToAdd.parentElement.parentElement.childNodes[1].childNodes[3].childNodes[3].childNodes[1].innerHTML); // Buscamos el precio de la comida
    let urlImage = productToAdd.parentElement.parentElement.childNodes[1].childNodes[1].getAttribute("src"); // Obtenemos la ruta de la imagen
    let description = productToAdd.parentElement.parentElement.childNodes[1].childNodes[5].innerHTML; // Obtenemos la descripcion de la comida
    let carro = getCarro('carro'); // Obtenemos el carro almacenado en el LocalStorage
    let flag = true
    const pedido = new Pedido(title, description, amountFood, price, urlImage); // Creamos el objeto pedido

    if(carro != null){
        for (const c of carro){ //Recorremos el localStorage del carro
            if(c.name == title){
                c.amount += Math.abs(amountFood);
                flag = false;
            }
        }
        if (flag){
            carro.push(pedido)
        }
    } else {
        carro = [pedido]
    }
    guardarCarro('carro', JSON.stringify(carro)) // Finalmente guardamos el carro en el localStorage
}

/* ---------- EVENTOS ---------- */
/* MODALES */
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
        addProduct('burguers')
    } else if (page == '/FoodApp/pages/lomos.html'){
        addProduct('lomos')
    } else if (page == '/FoodApp/pages/fries.html'){
        addProduct('fries')
    } else if (page == '/FoodApp/pages/drinks.html'){
        addProduct('drinks')
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
let carro = getCarro('carro')
if ( carro != null && carro.length > 0){
    shop.innerHTML += `
        <div id='notification'></div>
    `
}