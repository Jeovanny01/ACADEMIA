// URL del endpoint para obtener las sucursales
const url2 = "http:\\apitest.grupocarosa.com/ApiDatos/Bodegas";

// Función para cargar las sucursales
async function cargarSucursales() {
    try {
        const response = await fetch("http:\\apitest.grupocarosa.com/ApiDatos/Bodegas");
        const selectBranch = document.getElementById('branch');
        console.log(response);
        if (!response.ok) throw new Error('Error al obtener las sucursales. Código de estado: ' + response.status);
        
        const sucursales = await response.json();
        
       
        sucursales.forEach(sucursal => {
            const option = document.createElement('option');
            console.log(sucursal);
            option.value = sucursal.BODEGA;
            option.textContent = sucursal.NOMBRE;
            selectBranch.appendChild(option);
        });
    } catch (error) {
        console.error('Error:', error.message);
        const option = document.createElement('option');
        option.value = "error";
        option.textContent = error.message;
        selectBranch.appendChild(option);
    }
}

// Llama a la función cuando se carga la página
document.addEventListener('DOMContentLoaded', cargarSucursales);
