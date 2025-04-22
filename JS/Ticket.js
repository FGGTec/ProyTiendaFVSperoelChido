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
}