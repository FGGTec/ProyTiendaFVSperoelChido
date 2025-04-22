// Mostrar los paquetes seleccionados
const paquetes = JSON.parse(localStorage.getItem('carrito')) || [];
const contenedor = document.getElementById('lista-paquetes');
let precioBase = 0;
let tipoPaquete = '';

if (paquetes.length === 0) {
  contenedor.innerHTML = '<h4>No hay paquetes seleccionados.</h4>';
} else {
  paquetes.forEach((paquete, index) => {
    contenedor.innerHTML += `
      <div class="col-md-4 paquete-card">
        ${paquete.nombre}<br>(<small>${paquete.detalles}</small>)
      </div>
    `;
    precioBase += parseInt(paquete.precio); // Sumando precios si hay más de uno
    tipoPaquete += paquete.nombre + ', ';
  });
}
document.getElementById('paquete-precio').textContent = precioBase;
document.getElementById('paquete-tipo').textContent = tipoPaquete.slice(0, -2);

// Actualizar Total
function actualizarTotal() {
  let extraHoras = parseInt(document.getElementById('extraHoras').value) || 0;
  let fotosAdicionales = parseInt(document.getElementById('fotosAdicionales').value) || 0;
  let videosAdicionales = parseInt(document.getElementById('videosAdicionales').value) || 0;

  let total = precioBase + (extraHoras * 10) + (fotosAdicionales * 10) + (videosAdicionales * 10);

  document.getElementById("total").textContent = "$" + total.toFixed(2) + " dlls";

  // Guardar total
  localStorage.setItem('STotalCompra', total);
}

document.getElementById('extraHoras').addEventListener("input", actualizarTotal);
document.getElementById('fotosAdicionales').addEventListener("input", actualizarTotal);
document.getElementById('videosAdicionales').addEventListener("input", actualizarTotal);

document.addEventListener("DOMContentLoaded", actualizarTotal);

// Confirmar paquete
function confirmarPaquete() {
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
  alert('¡Paquete confirmado!');
  window.location.href = 'Ticket2.html';
}