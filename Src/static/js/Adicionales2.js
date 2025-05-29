// Mostrar los paquetes seleccionados
const paquetes = JSON.parse(localStorage.getItem('carrito')) || [];
const contenedor = document.getElementById('lista-paquetes');
let precioBase = 0;
let tipoPaquete = '';

if (paquetes.length === 0) {
  contenedor.innerHTML = '<h4>No hay paquetes seleccionados.</h4>';
} else {
  paquetes.forEach((paquete) => {
    contenedor.innerHTML += `
      <div class="col-md-4 paquete-card">
        ${paquete.nombre}<br><small>${paquete.detalles}</small>
      </div>
    `;
    precioBase += parseInt(paquete.precio); // Sumar precios
    tipoPaquete += paquete.nombre + ', ';
  });
}

document.getElementById('paquete-precio').textContent = precioBase;
document.getElementById('paquete-tipo').textContent = tipoPaquete.slice(0, -2);

// Actualizar Total
function actualizarTotal() {
  const extraHoras = parseInt(document.getElementById('extraHoras').value) || 0;
  const fotosAdicionales = parseInt(document.getElementById('fotosAdicionales').value) || 0;
  const videosAdicionales = parseInt(document.getElementById('videosAdicionales').value) || 0;

  const total = precioBase + (extraHoras + fotosAdicionales + videosAdicionales) * 10;

  document.getElementById("total").textContent = "$" + total.toFixed(2) + " dlls";

  // Guardar total
  localStorage.setItem('STotalCompra', total);
}

document.getElementById('extraHoras').addEventListener("input", actualizarTotal);
document.getElementById('fotosAdicionales').addEventListener("input", actualizarTotal);
document.getElementById('videosAdicionales').addEventListener("input", actualizarTotal);

document.addEventListener("DOMContentLoaded", actualizarTotal);

// Confirmar paquete y guardar en `localStorage`
function confirmarPaquete() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  // Guardar datos del formulario
  localStorage.setItem('SNombre', document.getElementById("ticketNombre").value.trim());
  localStorage.setItem('SApellido', document.getElementById("ticketApellido").value.trim());
  localStorage.setItem('SCorreo', document.getElementById("ticketCorreo").value.trim());
  localStorage.setItem('SFecha', document.getElementById("ticketFecha").value);
  localStorage.setItem('SHoraEvento', document.getElementById("ticketHoraEvento").value);
  localStorage.setItem('SDireccion', document.getElementById("ticketDireccion").value.trim());
  localStorage.setItem('SComentario', document.getElementById("ticketComentario").value);
  localStorage.setItem('SExtraHoras', document.getElementById("extraHoras").value);
  localStorage.setItem('SFotosAdd', document.getElementById("fotosAdicionales").value);
  localStorage.setItem('SVideosAdd', document.getElementById("videosAdicionales").value);
  localStorage.setItem('STotalCompra', document.getElementById("total").textContent);

  // Guardar paquetes seleccionados en `paquetesTicket`
  localStorage.setItem('paquetesTicket', JSON.stringify(carrito));

  // Enviar fecha al servidor
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
      // Redirigir al ticket
      alert('¡Paquete confirmado!');
      window.location.href = '/ticket2'; // ✅ corregido
    })
    .catch(err => {
      alert("Error: " + err.message);
    });
}
