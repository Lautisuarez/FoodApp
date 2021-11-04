let nameForm = document.getElementById('nombre');
let tel = document.getElementById('tel');
let email = document.getElementById('email');
let msg = document.getElementById('msg');
let send = document.getElementById('send');
let notification = document.getElementById('get-notification');

send.addEventListener('click', (e) => {
    e.preventDefault();

    // Notificacion
    notification.innerHTML = `
    <h2 class='notification'>Mensaje enviado correctamente...</h2>
    `
    setTimeout(() => {
        notification.innerHTML = ''
    }, 5000);

    // Reseteamos valores
    nameForm.value = '';
    tel.value = '';
    email.value = '';
    msg.value = '';
})


// API DE PRUEBA
let url = "https://hp-api.herokuapp.com/api/characters/students"

$("#api").prepend('<button class="btn btn-primary" id="btn-get">Obtener API</button>');
//Escuchamos el evento click del botón agregado
$("#btn-get").click(() => {
    $.get(url, function (res, est) {
          if(est === "success"){
            for (const dato of res) {
                $("#api").prepend(`<div>
                    <h3>Nombre: ${dato.name}</h3>
                    <p><b>Casa:</b> ${dato.house == '' ? 'No tiene' : dato.house}</p>
                    </div>
                `);
            }
          }
    });
});
