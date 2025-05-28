
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('ticketNombrePaquete').textContent = localStorage.getItem('paqueteNombre') || "Paquete no definido";
    document.getElementById('ticketDetallePaquete').textContent = localStorage.getItem('paqueteDetalles') || "Detalles no disponibles";
    document.getElementById('ticketNombre').textContent = localStorage.getItem('SNombre') || "Sin nombre";
    document.getElementById('ticketApellido').textContent = localStorage.getItem('SApellido') || "Sin apellido";
    document.getElementById('ticketCorreo').textContent = localStorage.getItem('SCorreo') || "Sin correo";
    document.getElementById('ticketFecha').textContent = localStorage.getItem('SFecha') || "Sin fecha";
    document.getElementById('ticketHoraEvento').textContent = localStorage.getItem('SHoraEvento') || "Sin hora";
    document.getElementById('ticketDireccion').textContent = localStorage.getItem('SDireccion') || "Sin dirección";
    document.getElementById('ticketComentario').textContent = localStorage.getItem('SComentario') || "Sin comentarios";

    document.getElementById('extraHoras').textContent = localStorage.getItem('SExtraHoras') || 0;
    document.getElementById('fotosAdicionales').textContent = localStorage.getItem('SFotosAdd') || 0;
    document.getElementById('videosAdicionales').textContent = localStorage.getItem('SVideosAdd') || 0;

    document.querySelector(".total span:last-child").textContent = "$" + (localStorage.getItem('STotalCompra') || "0");
});
// Borra los datos relacionados después de mostrar el ticket
window.addEventListener('DOMContentLoaded', function() {
    // Lista de claves a borrar
    const claves = [
        'paqueteNombre', 'paqueteDetalles', 'paquetePrecio', 'paqueteTipo',
        'SNombre', 'SApellido', 'SCorreo', 'SFecha', 'SHoraEvento', 'SDireccion',
        'SComentario', 'SExtraHoras', 'SFotosAdd', 'SVideosAdd', 'STotalCompra'
    ];
    claves.forEach(clave => localStorage.removeItem(clave));
});
/*
document.addEventListener("DOMContentLoaded", function () {
    let paquetes = JSON.parse(localStorage.getItem('paquetesTicket')) || [];

    // Verificar si hay paquetes seleccionados
    if (paquetes.length === 0) {
        document.getElementById("ticketDetallePaquete").textContent = "No hay paquetes seleccionados.";
        return;
    }

    // Mostrar todos los paquetes en `Ticket2.html`
    let detallesHTML = "";
    paquetes.forEach(paquete => {
        detallesHTML += `<p><strong>${paquete.nombre}</strong>: ${paquete.detalles}</p>`;
    });

    document.getElementById("ticketDetallePaquete").innerHTML = detallesHTML;

    // Mostrar información del usuario
    document.getElementById('ticketNombre').textContent = localStorage.getItem('SNombre') || "Sin nombre";
    document.getElementById('ticketApellido').textContent = localStorage.getItem('SApellido') || "Sin apellido";
    document.getElementById('ticketCorreo').textContent = localStorage.getItem('SCorreo') || "Sin correo";
    document.getElementById('ticketFecha').textContent = localStorage.getItem('SFecha') || "Sin fecha";
    document.getElementById('ticketHoraEvento').textContent = localStorage.getItem('SHoraEvento') || "Sin hora";
    document.getElementById('ticketDireccion').textContent = localStorage.getItem('SDireccion') || "Sin dirección";
    document.getElementById('ticketComentario').textContent = localStorage.getItem('SComentario') || "Sin comentarios";

    // Mostrar extras
    document.getElementById('extraHoras').textContent = localStorage.getItem('SExtraHoras') || "0";
    document.getElementById('fotosAdicionales').textContent = localStorage.getItem('SFotosAdd') || "0";
    document.getElementById('videosAdicionales').textContent = localStorage.getItem('SVideosAdd') || "0";

    // Mostrar total
    document.querySelector(".total span:last-child").textContent = "$" + (localStorage.getItem('STotalCompra') || "0");
});*/