// URL del endpoint para obtener las sucursales
const fetchSucursales = async () => {
    try {
        const response = await fetch(
            `https://apitest.grupocarosa.com/ApiDatos/Bodegas`
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

// Función para cargar las sucursales en la tabla
async function cargarSuc() {
    try {
        const sucursales = await fetchSucursales();
        const tablaSucursales = document.getElementById('tablaSucursales').getElementsByTagName('tbody')[0];
        
        // Limpiar cualquier fila previa en la tabla
        tablaSucursales.innerHTML = '';
        
        sucursales.forEach(sucursal => {
            // Crear una nueva fila
            const fila = document.createElement('tr');
            
            // Crear celdas para cada columna
            const celdaNombre = document.createElement('td');
            celdaNombre.textContent = sucursal.BODEGA;
            fila.appendChild(celdaNombre);
            
            const celdaCodigo = document.createElement('td');
            celdaCodigo.textContent = sucursal.NOMBRE;
            fila.appendChild(celdaCodigo);
            
            const celdaDireccion = document.createElement('td');
            celdaDireccion.textContent = sucursal.DIRECCION || 'No disponible';
            fila.appendChild(celdaDireccion);
        
            // Crear la celda para el botón de edición
            const celdaAcciones = document.createElement('td');
            const botonEditar = document.createElement('button');
            botonEditar.textContent = 'Editar';
            botonEditar.onclick = () => openModal(true, sucursal); // Llamar a la función para abrir el modal con los datos de la sucursal
            celdaAcciones.appendChild(botonEditar);
            fila.appendChild(celdaAcciones);
        
            // Agregar la fila a la tabla
            tablaSucursales.appendChild(fila);
        });
        
    } catch (error) {
        console.error('Error al cargar las sucursales:', error.message);
        const tablaSucursales = document.getElementById('tablaSucursales').getElementsByTagName('tbody')[0];
        const filaError = document.createElement('tr');
        const celdaError = document.createElement('td');
        celdaError.colSpan = 3;
        celdaError.textContent = 'Error al cargar las sucursales: ' + error.message;
        filaError.appendChild(celdaError);
        tablaSucursales.appendChild(filaError);
    }
}

// Mostrar solo la sección de sucursales cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    showSection('sucursales');
    cargarSuc();
});

// Muestra el modal para crear o editar
function openModal(isEdit = false, sucursal = {}) {
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modal-title");
    const form = document.getElementById("modal-form");
    
    // Configuración para edición o creación
    if (isEdit) {
        modalTitle.textContent = "Editar Sucursal";
        document.getElementById("sucursal-id").value = sucursal.BODEGA;
        document.getElementById("nombre").value = sucursal.NOMBRE;
        document.getElementById("ubicacion").value = sucursal.DIRECCION;
    } else {
        modalTitle.textContent = "Crear Nueva Sucursal";
        form.reset(); // Limpiar el formulario para nueva entrada
    }

    modal.style.display = "flex"; // Mostrar el modal
}

// Ocultar el modal
function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

// Guardar sucursal (creación o edición)
function saveSucursal(event) {
    event.preventDefault(); // Evitar recarga de la página
    const id = document.getElementById("sucursal-id").value;
    const nombre = document.getElementById("nombre").value;
    const ubicacion = document.getElementById("ubicacion").value;

    if (id) {
        // Lógica para actualizar una sucursal existente
        console.log("Actualizar sucursal:", { id, nombre, ubicacion });
        // Aquí puedes agregar la lógica para actualizar la fila en la tabla
    } else {
        // Lógica para crear una nueva sucursal
        console.log("Crear nueva sucursal:", { nombre, ubicacion });
        // Aquí puedes agregar la lógica para agregar una nueva fila en la tabla
    }

    closeModal();
}

// Llamar a openModal con los datos de la sucursal seleccionada para editar
function editSucursal(id) {
    const sucursal = {
        id: id,
        nombre: "Nombre de ejemplo", // Sustituir con datos reales
        ubicacion: "Ubicación de ejemplo" // Sustituir con datos reales
    };
    openModal(true, sucursal);
}

// Manejar el cierre del modal al hacer clic fuera del contenido
window.onclick = function(event) {
    const modal = document.getElementById("modal");
    if (event.target == modal) {
        closeModal();
    }
};