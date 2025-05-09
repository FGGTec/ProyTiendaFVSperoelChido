function mostrarPaquete() {
    const nombre = localStorage.getItem('paqueteNombre');
    const detalles = localStorage.getItem('paqueteDetalles');
    if (nombre && detalles) {
        document.getElementById('paquete-nombre').innerText = nombre;
        document.getElementById('paquete-detalles').innerText = detalles;
    } else {
        document.getElementById('paquete-nombre').innerText = 'No has seleccionado un paquete';
    }
}