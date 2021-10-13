/* -------------------- MENU HAMBURGURESA -------------------- */
var menu = document.querySelector('.menuHamburguesa'); // selector

// method
function toggleMenu (event) {
  this.classList.toggle('is-active');
  document.querySelector( ".navegacion" ).classList.toggle("is_active");
  event.preventDefault();
}

// event
menu.addEventListener('click', toggleMenu, false);