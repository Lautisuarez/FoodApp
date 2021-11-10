let shop = document.getElementsByClassName('shop')[0].childNodes[1];

const getCarro = (clave) => {
    return JSON.parse(localStorage.getItem(clave));
}

let carro = getCarro('carro')
if ( carro != null && carro.length > 0){
    shop.innerHTML += `
        <div id='notification'></div>
    `
}