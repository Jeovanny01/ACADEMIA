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

const fetchVendedores = async () => {
    try {
        const response = await fetch(
            url +"vendedores"
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

const fetchIdiomas= async () => {
    try {
        const response = await fetch(
            url +"idiomas"
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

async function cargarSucursal() {
    try {
      
        const selectBranch = document.getElementById('sucursalreg');
        if (!selectBranch) return;
         // Verificar si ya hay datos cargados
         if (selectBranch.children.length > 1) {
            console.log('Los idiomas ya están cargados.');
            return;
        }
        const sucursales = await fetchSucursales();
        sucursales.forEach(sucursal => {
            const option = document.createElement('option');
            option.value = sucursal.BODEGA;
            option.textContent = sucursal.NOMBRE;
            selectBranch.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar las sucursales:', error.message);
        const selectBranch = document.getElementById('sucursalregister');
        const option = document.createElement('option');
        option.value = "error";
        option.textContent = error.message;
        selectBranch.appendChild(option);
    }
};

async function cargarIdioma() {
    try {
        const selectBranch = document.getElementById('idioma');
        if (!selectBranch) return;
        
          // Verificar si ya hay datos cargados
          if (selectBranch.children.length > 1) {
            console.log('Los idiomas ya están cargados.');
            return;
        }
        const dat = await fetchIdiomas();
        

        dat.forEach(dat => {
            const option = document.createElement('option');
            option.value = dat.CODIGO;
            option.textContent = dat.DESCRIPCION;
            selectBranch.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar los idiomas:', error.message);
        const selectBranch = document.getElementById('idioma');
        const option = document.createElement('option');
        option.value = "error";
        option.textContent = error.message;
        selectBranch.appendChild(option);
    }
};

async function cargarVendedores() {
    try {
        const session = JSON.parse(localStorage.getItem("session") || "{}");

        if (!session.isLoggedIn) {
            window.location.href = "index.html";
            return;
        }
        
        const selectVendedores = document.getElementById('vendedores-1');
        if (selectVendedores.children.length > 1) {
            console.log('Los idiomas ya están cargados.');
            return;
        }
    
        const vend = session.vend;

          // Limpiar las opciones existentes
          //selectVendedores.innerHTML = '<option value="">Seleccione un vendedor</option>';

          const vendedores = await fetchVendedores();
        // Llenar el select con los datos de vendedores
        vendedores.forEach(vendedor => {
            const option = document.createElement('option');
            option.value = vendedor.CODIGO;  
            option.textContent = vendedor.NOMBRE;
            // Si el vendedor coincide con `vend`, seleccionarlo
                // Comparar eliminando espacios y forzando el mismo tipo
            if (String(vend).trim() === String(vendedor.CODIGO).trim()) {
                option.selected = true;
               // console.log('Seleccionado:', vendedor.CODIGO);
            }
            selectVendedores.appendChild(option);
        });

    } catch (error) {
        console.error('Error al cargar los vendedores:', error.message);
        const selectVendedores = document.getElementById('vendedores-1');
        const option = document.createElement('option');
        option.value = "error";
        option.textContent = error.message;
        selectVendedores.appendChild(option);
    }
};

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
};

// Mostrar solo la sección de sucursales cuando se carga la página
//document.addEventListener('DOMContentLoaded', () => {
//    showSection('sucursales');
//    cargarSuc();
//});
// Mostrar solo la sección de sucursales cuando se carga la página
//document.addEventListener('DOMContentLoaded', () => {
//    showSection('vendedores');
//    cargarVendedores();
//});


// Muestra el modal para crear o editar
function openModal(isEdit = false, sucursal = {}) {
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modal-title");
    const form = document.getElementById("modal-form");
    
    // Configuración para edición o creación
    if (isEdit) {
        modalTitle.textContent = "Editar Sucursal";
        document.getElementById("sucursal").value = sucursal.BODEGA;
        document.getElementById("sucursal").readOnly  = true;
        document.getElementById("nombre").value = sucursal.NOMBRE;
        document.getElementById("ubicacion").value = sucursal.DIRECCION;
    } else {
        modalTitle.textContent = "Crear Nueva Sucursal";
        document.getElementById("sucursal").readOnly  = false;
        form.reset(); // Limpiar el formulario para nueva entrada
    }

    modal.style.display = "flex"; // Mostrar el modal
};

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
};

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

//document.addEventListener('vendedores-1', cargarVendedores);
//document.addEventListener('sucursal-reg', cargarSucursal);
//document.addEventListener('idioma', cargarIdioma);
//document.addEventListener('tbody', cargarSuc);
