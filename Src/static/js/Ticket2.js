function confirmarPaquete() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const nombre = document.getElementById('ticketNombre').value.trim();
    const apellido = document.getElementById('ticketApellido').value.trim();
    const correo = document.getElementById('ticketCorreo').value.trim();
    const fecha = document.getElementById('ticketFecha').value;
    const hora = document.getElementById('ticketHoraEvento').value;
    const direccion = document.getElementById('ticketDireccion').value.trim();

    let errores = '';

    // Validaciones
    if (!nombre) errores += ' El nombre es obligatorio.\n';
    if (!apellido) errores += ' El apellido es obligatorio.\n';
    if (!correo || !validateEmail(correo)) errores += ' Ingresa un correo electrónico válido.\n';

    if (!fecha) {
        errores += ' La fecha del evento es obligatoria.\n';
    } else {
        const fechaEvento = new Date(fecha);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0); // normaliza fecha de hoy
        if (fechaEvento <= hoy) {
            errores += ' La fecha del evento debe ser posterior a hoy.\n';
        }
    }

    if (!hora) errores += ' La hora del evento es obligatoria.\n';
    if (!direccion) errores += ' La dirección del evento es obligatoria.\n';

    if (errores) {
        alert(errores);
        return;
    }

    // Guardar datos válidos en localStorage
    localStorage.setItem('SNombre', nombre);
    localStorage.setItem('SApellido', apellido);
    localStorage.setItem('SCorreo', correo);
    localStorage.setItem('SFecha', fecha);
    localStorage.setItem('SHoraEvento', hora);
    localStorage.setItem('SDireccion', direccion);
    localStorage.setItem('SComentario', document.getElementById("ticketComentario").value);
    localStorage.setItem('SExtraHoras', document.getElementById("extraHoras").value);
    localStorage.setItem('SFotosAdd', document.getElementById("fotosAdicionales").value);
    localStorage.setItem('SVideosAdd', document.getElementById("videosAdicionales").value);
    localStorage.setItem('paquetesTicket', JSON.stringify(carrito));

    // Enviar la fecha al backend
    fetch("/reservar_fecha", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ fecha: localStorage.getItem('SFecha') })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => { throw new Error(data.message); });
        }
        return response.json();
    })
    .then(data => {
        // Llama a enviarTicketASQL antes de redirigir
        enviarTicketASQL();
        // Ya no es necesario el alert y setTimeout aquí, porque están en enviarTicketASQL
    })
    .catch(err => {
        alert(" Error: " + err.message);
    });
}
// Nueva función para enviar el ticket a la base de datos
function enviarTicketASQL() {
    const data = {
        correo: localStorage.getItem('SCorreo'),
        fecha: localStorage.getItem('SFecha'),
        hora: localStorage.getItem('SHoraEvento'),
        direccion: localStorage.getItem('SDireccion'),
        comentario: localStorage.getItem('SComentario'),
        total: localStorage.getItem('STotalCompra'),
        namepaquetes: localStorage.getItem('paquetesTicket'),
    };

    fetch('/guardar_ticket2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
        if (res.status === "ok") {
            alert("Registro confirmado y ticket guardado. Redirigiendo...");
            setTimeout(() => {
                window.location.href = "/ticket2";
            }, 1200);
        } else {
            alert("Error al guardar ticket: " + res.message);
        }
    })
    .catch(err => {
        alert("Error al guardar ticket: " + err.message);
    });
}
// Función para validar correos
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}