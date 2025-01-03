//require('dotenv').config();
// URL del endpoint para obtener las sucursales
const url = "https://apitest.grupocarosa.com/ApiDatos/"
let distritos = [];

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
const fetchEjecutar = async (funct) => {
    try {
        const response = await fetch(
            url + funct
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
const fetchDatos= async (sp) => {
    try {
        const response = await fetch(url + "dato", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                sp
            })
        });
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
async function cargarSucursal(opcion = false ) {
    try {
      
        const selectBranch = document.getElementById('sucursalreg');
        if (!selectBranch) return;
         // Verificar si ya hay datos cargados
         if (selectBranch.children.length > 1 && opcion === false) {
            console.log('Los idiomas ya están cargados.');
            return;
        }
        
        selectBranch.innerHTML = '<option value="">Seleccione una Sucursal</option>';
        const sucursales = await fetchEjecutar("Bodegas");
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
async function cargarDepartamentos() {
    try {
      
        const selectBranch = document.getElementById('departamento');
        if (!selectBranch) return;
         // Verificar si ya hay datos cargados
         if (selectBranch.children.length > 1) {
            console.log('Los departamentos ya están cargados.');
            return;
        }
        const dat = await fetchEjecutar("departamentos");
        dat.forEach(data => {
            const option = document.createElement('option');
            option.value = data.CODIGO;
            option.textContent = data.NOMBRE;
            selectBranch.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar los departamentos:', error.message);
        const selectBranch = document.getElementById('sucursalregister');
        const option = document.createElement('option');
        option.value = "error";
        option.textContent = error.message;
        selectBranch.appendChild(option);
    }
};

async function cargarDistritos() {
    try {
      
        const selectBranch = document.getElementById('distrito');
        if (!selectBranch) return;
         // Verificar si ya hay datos cargados
         if (selectBranch.children.length > 1) {
            console.log('Los Distritos ya están cargados.');
            return;
        }
        const dat = await fetchEjecutar("distritos");
        distritos = dat; // Guardar distritos en el arreglo global
    } catch (error) {
        console.error('Error al cargar los distritos:', error.message);
        const selectBranch = document.getElementById('sucursalregister');
        const option = document.createElement('option');
        option.value = "error";
        option.textContent = error.message;
        selectBranch.appendChild(option);
    }
};
  // Función para actualizar los distritos según el departamento seleccionado
  function actualizarDistritosPorDepartamento(departamentoId) {
    const selectDistrito = document.getElementById('distrito');
    // Limpiar el selector de distritos
    selectDistrito.innerHTML = '<option value="">Seleccione</option>';

    // Filtrar distritos por departamento
    const distritosFiltrados = distritos.filter(distrito => distrito.DEPARTAMENTO === departamentoId);

    // Agregar distritos filtrados al selector
    distritosFiltrados.forEach(distrito => {
        const option = document.createElement('option');
        option.value = distrito.CODIGO;
        option.textContent = distrito.NOMBRE;
        selectDistrito.appendChild(option);
    });
}

// Evento para actualizar distritos al seleccionar un departamento
document.getElementById('departamento').addEventListener('change', (event) => {
    const departamentoId = event.target.value;
    if (departamentoId) {
        actualizarDistritosPorDepartamento(departamentoId);
    } else {
        // Limpiar distritos si no hay departamento seleccionado
        document.getElementById('distrito').innerHTML = '<option value="">Seleccione</option>';
    }
});


async function cargarIdioma(opcion = false ) {
    try {
        const selectBranch = document.getElementById('idioma');
        if (!selectBranch) return;
        
          // Verificar si ya hay datos cargados
          if (selectBranch.children.length > 1 && opcion === false) {
            console.log('Los idiomas ya están cargados.');
            return;
        }

        selectBranch.innerHTML = '<option value="">Seleccione Idioma</option>';

        const dat = await fetchEjecutar("idiomas");
        

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

async function cargarFormaPago(opcion = false ) {
    try {
        const selectBranch = document.getElementById('metodopago');
        if (!selectBranch) return;
        
          // Verificar si ya hay datos cargados
          if (selectBranch.children.length > 1 && opcion === false) {
            console.log('Los metos de Pago ya están cargados.');
            return;
        }

        selectBranch.innerHTML = '<option value="">Seleccione un método de pago</option>';
        const dat = await fetchEjecutar("formaPago");
        

        dat.forEach(dat => {
            const option = document.createElement('option');
            option.value = dat.CODIGO;
            option.textContent = dat.DESCRIPCION;
            selectBranch.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar los metodoPago:', error.message);
        const selectBranch = document.getElementById('metodoPago');
        const option = document.createElement('option');
        option.value = "error";
        option.textContent = error.message;
        selectBranch.appendChild(option);
    }
};

async function cargarVendedores(opcion = false ) {
    try {
        const session = JSON.parse(localStorage.getItem("session") || "{}");
        if (!session.isLoggedIn) {
            window.location.href = "index.html";
            return;
        }
        
        const selectVendedores = document.getElementById('vendedores-1');
        if (selectVendedores.children.length > 1 && opcion === false) {
            console.log('Los vendedores ya están cargados.');
            return;
        }
    
        const vend = session.vend;

          // Limpiar las opciones existentes
          selectVendedores.innerHTML = '<option value="">Seleccione vendedor</option>';

          const vendedores = await fetchEjecutar("vendedores");
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

async function cargarEstrategia(opcion = false ) {
    try {
        const selectBranch = document.getElementById('estrategia');
        if (!selectBranch) return;
        
          // Verificar si ya hay datos cargados
          if (selectBranch.children.length > 1 && opcion === false) {
            console.log('Los metos de Pago ya están cargados.');
            return;
        }
        selectBranch.innerHTML = '<option value="">Seleccione estrategia</option>';

        const dat = await fetchEjecutar("estrategias");
        

        dat.forEach(dat => {
            const option = document.createElement('option');
            option.value = dat.CODIGO;
            option.textContent = dat.DESCRIPCION;
            selectBranch.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar los metodoPago:', error.message);
        const selectBranch = document.getElementById('metodoPago');
        const option = document.createElement('option');
        option.value = "error";
        option.textContent = error.message;
        selectBranch.appendChild(option);
    }
};

async function cargarBancos(opcion = false ) {
    try {
        const selectBranch = document.getElementById('banco');
        if (!selectBranch) return;
        
          // Verificar si ya hay datos cargados
          if (selectBranch.children.length > 1 && opcion === false) {
            console.log('Los metos de Pago ya están cargados.');
            return;
        }
        
        selectBranch.innerHTML = '<option value="">Seleccione banco</option>';
        const dat = await fetchEjecutar("bancos");
        

        dat.forEach(dat => {
            const option = document.createElement('option');
            option.value = dat.CODIGO;
            option.textContent = dat.DESCRIPCION;
            selectBranch.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar los metodoPago:', error.message);
        const selectBranch = document.getElementById('banco');
        const option = document.createElement('option');
        option.value = "error";
        option.textContent = error.message;
        selectBranch.appendChild(option);
    }
};

// Función para cargar las sucursales en la tabla
async function cargarSuc() {
    try {
        const sucursales = await fetchEjecutar("bodegas");
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
async function buscarTitular() {
    const duiInput = document.getElementById('dui');
    const titularInput = document.getElementById('titular');

    if (!duiInput.value) {
        alert('Por favor, ingresa un DUI.');
        return;
    }

    try {
        const response = await fetch(url + "datosDui", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                dui: duiInput.value // Aquí asignas el valor del input al body
            })
        });

        if (!response.ok) {
            throw new Error('Error al obtener los datos del titular.');
        }

        const data = await response.json();

        // Asigna el nombre del titular al campo "Titular"
        titularInput.value = data[0].Nombres || 'No encontrado';
    } catch (error) {
        console.error('Error:', error);
        titularInput.value="";
        //alert('Hubo un problema al buscar el titular.');
    }
}

// Función para cargar las sucursales en la tabla
async function cargarVend() {
    try {
        const data = await fetchEjecutar("vendedoresAll");
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
        const data = await fetchEjecutar("idiomasAll");
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

async function cargarEstra() {
    try {
        const data = await fetchDatos("ESTRATEGIA_ACCION");
        const tablaData = document.getElementById('tablaEstrategia').getElementsByTagName('tbody')[0];
        
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
            botonEditar.onclick = () => openModalEstrategia(true, dat); // Llamar a la función para abrir el modal con los datos de la sucursal
            celdaAcciones.appendChild(botonEditar);
            fila.appendChild(celdaAcciones);
        
            // Agregar la fila a la tabla
            tablaData.appendChild(fila);
        });
        
    } catch (error) {
        console.error('Error al cargar ESTRATEGIA:', error.message);
      
    }
};
async function cargarFormaPag() {
    try {
        const data = await fetchDatos("FORMA_PAGO_ACCION");
        const tablaData = document.getElementById('tablaFormaPago').getElementsByTagName('tbody')[0];
        
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
            botonEditar.onclick = () => openModalFormaPago(true, dat); // Llamar a la función para abrir el modal con los datos de la sucursal
            celdaAcciones.appendChild(botonEditar);
            fila.appendChild(celdaAcciones);
        
            // Agregar la fila a la tabla
            tablaData.appendChild(fila);
        });
        
    } catch (error) {
        console.error('Error al cargar forma de pago:', error.message);
      
    }
};