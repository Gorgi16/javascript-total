fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
})
.then(() => {
    cargarProductos();
})
.catch(error => {
    console.error('Error al eliminar producto:', error);
});
