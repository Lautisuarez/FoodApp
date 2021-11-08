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
