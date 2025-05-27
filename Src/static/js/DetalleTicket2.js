/*
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
*/
document.addEventListener("DOMContentLoaded", function () {
    let paquetes = JSON.parse(localStorage.getItem('paquetesTicket')) || [];
    let paqueteIndividual = localStorage.getItem('paqueteNombre');
    let detallesIndividuales = localStorage.getItem('paqueteDetalles');

    if (paquetes.length > 0) {
        // Si hay múltiples paquetes, mostramos todos en Ticket2
        let detallesHTML = "";
        paquetes.forEach(paquete => {
            detallesHTML += `<p><strong>${paquete.nombre}</strong>: ${paquete.detalles}</p>`;
        });
        document.getElementById("ticketDetallePaquete").innerHTML = detallesHTML;
    } else if (paqueteIndividual) {
        // Si es una compra individual, mostramos solo un paquete
        document.getElementById('ticketNombrePaquete').textContent = paqueteIndividual || "Paquete no definido";
        document.getElementById('ticketDetallePaquete').textContent = detallesIndividuales || "Detalles no disponibles";
    } else {
        document.getElementById("ticketDetallePaquete").textContent = "No hay paquetes seleccionados.";
    }

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

    // Mostrar total correctamente
    document.querySelector(".total span:last-child").textContent = "$" + (localStorage.getItem('STotalCompra') || "0");

    // ⚠️ Vaciar el carrito después de llegar a Ticket2.html
    localStorage.removeItem('carrito');
    localStorage.removeItem('paquetesTicket');    
});
