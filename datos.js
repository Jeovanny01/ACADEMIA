//require('dotenv').config();
// URL del endpoint para obtener las sucursales
const url = "https://apitest.grupocarosa.com/ApiDatos/"

const postBodegas = async (accion, bodega, nombre, direccion) => {
    try {
        const response = await fetch(url + "Bodegas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                accion,
                bodega,
                nombre,
                direccion
            })
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`Error en la petición. Código de estado: ${response.status}`);
        }
    } catch (error) {
        console.error("Error en la petición:", error.message);
        throw error;
    }
};


const postVendedores = async (accion, codigo, nombre,activo) => {
    try {
        const response = await fetch(url + "Vendedor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                accion,
                codigo,
                nombre,
                activo
            })
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`Error en la petición. Código de estado: ${response.status}`);
        }
    } catch (error) {
        console.error("Error en la petición:", error.message);
        throw error;
    }
};

const postDatos = async (accion, codigo, descripcion,activo,sp) => {
    try {
        const response = await fetch(url + "datos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                accion,
                codigo,
                descripcion,
                activo,
                sp
            })
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`Error en la petición. Código de estado: ${response.status}`);
        }
    } catch (error) {
        console.error("Error en la petición:", error.message);
        throw error;
    }
};
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

const fetchVendedores = async (funt) => {
    try {
        const response = await fetch(
            url + funt
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
const fetchIdiomas= async (funt) => {
    try {
        const response = await fetch(
            url + funt
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
        const dat = await fetchIdiomas("idiomas");
        

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

          const vendedores = await fetchVendedores("vendedores");
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

// Función para cargar las sucursales en la tabla
async function cargarVend() {
    try {
        const data = await fetchVendedores("vendedoresAll");
        const tablaData = document.getElementById('tablaVendedores').getElementsByTagName('tbody')[0];
        
        // Limpiar cualquier fila previa en la tabla
        tablaData.innerHTML = '';
                data.forEach(dat => {
            // Crear una nueva fila
            const fila = document.createElement('tr');
            
            // Crear celdas para cada columna
            const celdaNombre = document.createElement('td');
            celdaNombre.textContent = dat.VENDEDOR;
            fila.appendChild(celdaNombre);
            
            const celdaCodigo = document.createElement('td');
            celdaCodigo.textContent = dat.NOMBRE;
            fila.appendChild(celdaCodigo);

            const celdaActivo = document.createElement('td');
            celdaActivo.textContent = dat.ACTIVO;
            fila.appendChild(celdaActivo);
            
            // Crear la celda para el botón de edición
            const celdaAcciones = document.createElement('td');
            const botonEditar = document.createElement('button');
            botonEditar.textContent = 'Editar';
            botonEditar.onclick = () => openModalVend(true, dat); // Llamar a la función para abrir el modal con los datos de la sucursal
            celdaAcciones.appendChild(botonEditar);
            fila.appendChild(celdaAcciones);
        
            // Agregar la fila a la tabla
            tablaData.appendChild(fila);
        });
        
    } catch (error) {
        console.error('Error al cargar las vendedores:', error.message);
      
    }
};

async function cargarIdio() {
    try {
        const data = await fetchIdiomas("idiomasAll");
        const tablaData = document.getElementById('tablaIdiomas').getElementsByTagName('tbody')[0];
        
        // Limpiar cualquier fila previa en la tabla
        tablaData.innerHTML = '';
                data.forEach(dat => {
            // Crear una nueva fila
            const fila = document.createElement('tr');
            
            // Crear celdas para cada columna
            const celdaNombre = document.createElement('td');
            celdaNombre.textContent = dat.CODIGO;
            fila.appendChild(celdaNombre);
            
            const celdaCodigo = document.createElement('td');
            celdaCodigo.textContent = dat.DESCRIPCION;
            fila.appendChild(celdaCodigo);

            const celdaActivo = document.createElement('td');
            celdaActivo.textContent = dat.ACTIVO;
            fila.appendChild(celdaActivo);
            
            // Crear la celda para el botón de edición
            const celdaAcciones = document.createElement('td');
            const botonEditar = document.createElement('button');
            botonEditar.textContent = 'Editar';
            botonEditar.onclick = () => openModalIdioma(true, dat); // Llamar a la función para abrir el modal con los datos de la sucursal
            celdaAcciones.appendChild(botonEditar);
            fila.appendChild(celdaAcciones);
        
            // Agregar la fila a la tabla
            tablaData.appendChild(fila);
        });
        
    } catch (error) {
        console.error('Error al cargar los idiomas:', error.message);
      
    }
};