//require('dotenv').config();
// URL del endpoint para obtener las sucursales
const url = "https://apitest.grupocarosa.com/ApiDatos/"

const fetchSucursales = async () => {
    try {
        const response = await fetch(
            url +"Bodegas"
        );
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`Error en la petición. Código de estado:  ${response.status}`);
        }
    } catch (error) {
        console.error('Error en la petición:', error.message);
        throw error;
    }
};

async function cargarSucursales() {
    try {
        const sucursales = await fetchSucursales();
        const selectBranch = document.getElementById('branch');
        if (!selectBranch) return;
        
        sucursales.forEach(sucursal => {
            const option = document.createElement('option');
            option.value = sucursal.BODEGA;
            option.textContent = sucursal.NOMBRE;
            selectBranch.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar las sucursales:', error.message);
        const selectBranch = document.getElementById('branch');
        const option = document.createElement('option');
        option.value = "error";
        option.textContent = error.message;
        selectBranch.appendChild(option);
    }
}


document.addEventListener('DOMContentLoaded', cargarSucursales)