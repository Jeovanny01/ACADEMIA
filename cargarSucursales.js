

// Función para cargar las sucursales
async function cargarSucursales() {
    try {
        // URL del endpoint para obtener las sucursales
const apiCarosa =`https:\\apitest.grupocarosa.com/ApiDatos/Bodegas`;
        const response = await fetch(apiCarosa);
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
