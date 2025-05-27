/*function confirmarPaquete() {
    localStorage.setItem('SNombre', document.getElementById("ticketNombre").value);
    localStorage.setItem('SApellido', document.getElementById("ticketApellido").value);
    localStorage.setItem('SCorreo', document.getElementById("ticketCorreo").value);
    localStorage.setItem('SFecha', document.getElementById("ticketFecha").value);
    localStorage.setItem('SHoraEvento', document.getElementById("ticketHoraEvento").value);
    localStorage.setItem('SDireccion', document.getElementById("ticketDireccion").value);
    localStorage.setItem('SComentario', document.getElementById("ticketComentario").value);
    localStorage.setItem('SExtraHoras', document.getElementById("extraHoras").value);
    localStorage.setItem('SFotosAdd', document.getElementById("fotosAdicionales").value);
    localStorage.setItem('SVideosAdd', document.getElementById("videosAdicionales").value);

       const fecha = document.getElementById("ticketFecha").value;

    // Enviar fecha al servidor
    fetch("/reservar_fecha", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ fecha: fecha })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => { throw new Error(data.message); });
        }
        return response.json();
    })
    .then(data => {
        console.log(data.message);
        window.location.href = "ticket"; // o Ticket2
    })
    .catch(err => {
        alert("Error: " + err.message);
    });
}*/
function confirmarPaquete() {
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

    // Enviar la fecha al backend
    fetch("/reservar_fecha", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ fecha: fecha })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => { throw new Error(data.message); });
        }
        return response.json();
    })
    .then(data => {
        alert(" Registro confirmado. Redirigiendo...");
        setTimeout(() => {
            window.location.href = "/ticket"; // usa URL absoluta para seguridad
        }, 1200);
    })
    .catch(err => {
        alert(" Error: " + err.message);
    });
}

// Función para validar correos
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}