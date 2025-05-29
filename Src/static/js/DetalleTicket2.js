document.addEventListener("DOMContentLoaded", function () {
    console.log("🔄 DOMContentLoaded ejecutado");

    // Leer localStorage
    let paquetesRaw = localStorage.getItem('paquetesTicket');
    console.log("📦 paquetesTicket (raw):", paquetesRaw);

    let paquetes = [];
    try {
        paquetes = JSON.parse(paquetesRaw) || [];
    } catch (err) {
        console.error("❌ Error al parsear paquetesTicket:", err);
    }

    let paqueteIndividual = localStorage.getItem('paqueteNombre');
    let detallesIndividuales = localStorage.getItem('paqueteDetalles');

    console.log("📦 paquetes parsed:", paquetes);
    console.log("🎁 paqueteIndividual:", paqueteIndividual);
    console.log("📝 detallesIndividuales:", detallesIndividuales);

    // Mostrar paquetes
    if (paquetes.length > 0) {
        const nombres = paquetes.map(p => p.nombre).join(", ");
        console.log("✅ Mostrando nombres de paquetes:", nombres);
        document.getElementById('ticketNombrePaquete').textContent = nombres;

        let detallesHTML = "";
        paquetes.forEach(paquete => {
            detallesHTML += `<p><strong>${paquete.nombre}</strong>: ${paquete.detalles || "Sin detalles disponibles"}</p>`;
        });
        document.getElementById("ticketDetallePaquete").innerHTML = detallesHTML;

    } else if (paqueteIndividual) {
        console.log("🟡 Mostrando paquete individual");
        document.getElementById('ticketNombrePaquete').textContent = paqueteIndividual || "Paquete no definido";
        document.getElementById('ticketDetallePaquete').textContent = detallesIndividuales || "Detalles no disponibles";

    } else {
        console.warn("⚠️ No hay paquetes seleccionados");
        document.getElementById("ticketNombrePaquete").textContent = "Sin paquetes";
        document.getElementById("ticketDetallePaquete").textContent = "No hay paquetes seleccionados.";
    }

    // Mostrar información del cliente
    const campos = ['SNombre', 'SApellido', 'SCorreo', 'SFecha', 'SHoraEvento', 'SDireccion', 'SComentario'];
    const camposExtras = ['SExtraHoras', 'SFotosAdd', 'SVideosAdd'];

    campos.forEach(campo => {
        const valor = localStorage.getItem(campo);
        console.log(`🧾 ${campo}:`, valor);
        const id = campo.replace('S', 'ticket');
        const elemento = document.getElementById(id);
        if (elemento) elemento.textContent = valor || `Sin ${id.toLowerCase()}`;
    });

    camposExtras.forEach(campo => {
        const valor = localStorage.getItem(campo);
        console.log(`➕ Extra ${campo}:`, valor);
        const id = campo.replace('S', '');
        const elemento = document.getElementById(id);
        if (elemento) elemento.textContent = valor || "0";
    });

    const total = localStorage.getItem('STotalCompra') || "0";
    console.log("💰 STotalCompra:", total);
    document.querySelector(".total span:last-child").textContent = "$" + total;

    // Opcional: limpiar el carrito
    localStorage.removeItem('carrito');
    localStorage.removeItem('paquetesTicket');
});
