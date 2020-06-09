function funcionLogin(){

    let usuario = document.querySelector('input[name="usuario"]').value;
    let contrasenya = document.querySelector('input[name="contrasenya"]').value;

    console.log(usuario + ' y ' + contrasenya);
    
}

function cargarEventos() {
    document.querySelector('input[name="button_login"]').addEventListener('click', funcionLogin);
}

function init() {
    cargarEventos();
}

window.onload = init;