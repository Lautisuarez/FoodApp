/* FUNCIONES */
const getCarro = (clave) => {
    return JSON.parse(localStorage.getItem(clave));
}

/* PROGRAMA */
let carro = getCarro('carro')
let numTotal = 0;
for (const c of carro){
    numTotal += c.price * c.cantidad;
    carrito.innerHTML += `
        <article>
            <a href="#" class="food" id='close'>
                <img src='${c.urlImage}' alt='${c.description}'>
                <div class="description-product">
                    <h2>${c.name}</h2>
                    <p>Cantidad: ${c.cantidad}</p>
                </div>
                <i class="fas fa-times"></i>
            </a>
        </article>
    `
}
total.innerHTML = `<p class='total'>Total: $${numTotal}</p>`