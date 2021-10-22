let shop = document.getElementsByClassName('shop')[0].childNodes[1];

const getCarro = (clave) => {
    return JSON.parse(localStorage.getItem(clave));
}

if (getCarro('carro').length > 0){
    shop.innerHTML += `
        <div id='notification'></div>
    `
}