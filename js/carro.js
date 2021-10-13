/* VARIABLES */
let carrito = document.getElementById('carrito');
let food = document.getElementsByClassName('food');

/* FUNCIONES */
const getCarro = (clave) => {
    return JSON.parse(localStorage.getItem(clave));
}
const showCarro = (carro) => {
    carrito.innerHTML = ''
    numTotal = 0;
    if (carro == null || carro.length == 0){ // Verificamos si hay algo en el localStorage del carro
        carrito.innerHTML += `
            <h2>No hay productos en tu carrito</h2>
        `
    } else {
        for (const c of carro){
            numTotal += c.price * c.cantidad;
            carrito.innerHTML += `
                <article>
                    <div class="food">
                        <img src='${c.urlImage}' alt='${c.description}'>
                        <div class="description-product">
                            <h2>${c.name}</h2>
                            <p>Cantidad: ${c.cantidad}</p>
                        </div>
                        <a href='#' id='remove'><i class="fas fa-times"></i></a>
                    </div>
                </article>
            `
        }
        total.innerHTML = `<p class='total'>Total: $${numTotal}</p>`
    }
}
const deleteFood = (f) => {
    let carro = JSON.parse(localStorage.getItem('carro'));
    for (let i=0; i<carro.length; i++){
        if (carro[i].name == f.childNodes[3].childNodes[1].innerHTML){
            carro.splice(i, 0)
            console.log(carro.splice(i, 1));
            console.log(carro);
        }
    }
    localStorage.setItem('carro', JSON.stringify(carro))
    location.reload(); // Recargamos la página para que no se quede clavada
}

/* PROGRAMA */
let carro = getCarro('carro')
let numTotal = 0;
showCarro(carro)
for (const f of food){
    f.childNodes[5].addEventListener('click', () => {
        deleteFood(f)
    })
}