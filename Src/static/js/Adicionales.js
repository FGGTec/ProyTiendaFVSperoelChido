function actualizarTotal() {
    console.log("Ejecutando actualizarTotal()");

    let precioBase = JSON.parse(localStorage.getItem('paquetePrecio')) || 0;
    console.log("Precio base del paquete:", precioBase);

    let extraHoras = parseInt(document.getElementById('extraHoras').value) || 0;
    let fotosAdicionales = parseInt(document.getElementById('fotosAdicionales').value) || 0;
    let videosAdicionales = parseInt(document.getElementById('videosAdicionales').value) || 0;

    let precioHora = 10, precioFoto = 10, precioVideo = 10;

    let total = precioBase + (extraHoras * precioHora) + (fotosAdicionales * precioFoto) + (videosAdicionales * precioVideo);

    console.log("Total calculado:", total);

    localStorage.setItem('STotalCompra', total);

    document.getElementById("total").textContent = "$" + total.toFixed(2) + " dlls";
}

document.getElementById('extraHoras').addEventListener("input", actualizarTotal);
document.getElementById('fotosAdicionales').addEventListener("input", actualizarTotal);
document.getElementById('videosAdicionales').addEventListener("input", actualizarTotal);

document.addEventListener("DOMContentLoaded", actualizarTotal);
