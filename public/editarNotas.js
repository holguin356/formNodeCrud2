function cargarDatosEnFormulario(nota) {
    console.log("Datos de la nota al cargar:", nota);
    document.getElementById('editarId').value = nota.id;
    document.getElementById('editarNombre').value = nota.nombre;
    document.getElementById('editarDescripcion').value = nota.descripcion;
}