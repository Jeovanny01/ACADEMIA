// URL del endpoint para obtener las sucursales
const url = 'http://131.100.140.45:8082/ApiDatos/Bodegas';

// Función para cargar las sucursales
async function cargarSucursales() {
    try {
        const response = await fetch(url);
        console.log(response);
        if (!response.ok) throw new Error('Error al obtener las sucursales. Código de estado: ' + response.status);
        
        const sucursales = await response.json();
        
        const selectBranch = document.getElementById('branch');
        sucursales.forEach(sucursal => {
            const option = document.createElement('option');
            console.log(sucursal);
            option.value = sucursal.BODEGA;
            option.textContent = sucursal.NOMBRE;
            selectBranch.appendChild(option);
        });
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Llama a la función cuando se carga la página
document.addEventListener('DOMContentLoaded', cargarSucursales);
