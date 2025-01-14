//require('dotenv').config();
// URL del endpoint para obtener las sucursales
let distritos = [];
let DOC_DUI = null
let DOC_COMPROBANTE = null
let DOC_INSCRIPCION = null
const session = JSON.parse(localStorage.getItem("session") || "{}");
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
const postDatosUpdate = async (accion, codigo, estado,nombre,sp,modalidad,bienvenida,gerente,notas, maestro,turno,horario,primerPago,fechaPago,nivel) => {
    try {
        const response = await fetch(url + "datosUpdate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                accion,
                codigo,
                estado,
                nombre,
                sp,modalidad,bienvenida,gerente,notas,maestro,turno,horario,primerPago,fechaPago,nivel
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
const fetchSelectDatos= async (sp) => {
    try {
        const response = await fetch(url + "selectDatos", {
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
async function cargarEstadosList(opcion = false ) {
     try {
            const sucursales = await fetchSelectDatos("ESTADO_ALUMNO_ACCION");
            const selectBranch = document.getElementById('estadoEdit');
            if (!selectBranch) return;
            
            sucursales.forEach(sucursal => {
                const option = document.createElement('option');
                option.value = sucursal.CODIGO;
                option.textContent = sucursal.DESCRIPCION;
                selectBranch.appendChild(option);
            });
        } catch (error) {
            console.error('Error al cargar las ESTADOS:', error.message);
           
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

async function cargarBienvenida(opcion = false ) {
    try {
        const selectBranch = document.getElementById('bienvenidaEdit');
        const selectBranch2 = document.getElementById('gerenteEdit');
        if (!selectBranch) return;
        
          // Verificar si ya hay datos cargados
          if (selectBranch.children.length > 1 && opcion === false) {
            console.log('Los Usuario ya están cargados.');
            return;
        }
        
        selectBranch.innerHTML = '<option value="">Seleccione Usuario</option>';
        selectBranch2.innerHTML = '<option value="">Seleccione Gerente</option>';
        const dat = await fetchSelectDatos("SELECT_USUARIO_GRUPOS");
        
        dat.forEach(dat => {
            const option = document.createElement('option');
            const option2 = document.createElement('option');
            option.value = dat.USUARIO;
            option.textContent = dat.NOMBRE;
            selectBranch.appendChild(option);
            option2.value = dat.USUARIO;
            option2.textContent = dat.NOMBRE;
            selectBranch2.appendChild(option2);
        });
       
    } catch (error) {
        console.error('Error al cargar los USUARIOS:', error.message);
        const selectBranch = document.getElementById('bienvenidaEdit');
        const option = document.createElement('option');
        option.value = "error";
        option.textContent = error.message;
        selectBranch.appendChild(option);
    }
};

async function cargarMaestro(opcion = false ) {
    try {
        const selectBranch = document.getElementById('maestroEdit');
        if (!selectBranch) return;
        
          // Verificar si ya hay datos cargados
          if (selectBranch.children.length > 1 && opcion === false) {
            console.log('Los maestros ya están cargados.');
            return;
        }
        selectBranch.innerHTML = '<option value="">Seleccione Maestro</option>';
        const dat = await fetchSelectDatos("MAESTROS_ACCION");
        dat.forEach(dat => {
            const option = document.createElement('option');
            option.value = dat.CODIGO;
            option.textContent = dat.DESCRIPCION;
            selectBranch.appendChild(option);
        });
       
    } catch (error) {
        console.error('Error al cargar los maestros:', error.message);
        const selectBranch = document.getElementById('maestroEdit');
        const option = document.createElement('option');
        option.value = "error";
        option.textContent = error.message;
        selectBranch.appendChild(option);
    }
};

async function cargarTurno(opcion = false ) {
    try {
        const selectBranch = document.getElementById('turnoEdit');
        if (!selectBranch) return;
        
          // Verificar si ya hay datos cargados
          if (selectBranch.children.length > 1 && opcion === false) {
            console.log('Los turnoEdit ya están cargados.');
            return;
        }
        selectBranch.innerHTML = '<option value="">Seleccione Turno</option>';
        const dat = await fetchSelectDatos("TURNOS_ACCION");
        dat.forEach(dat => {
            const option = document.createElement('option');
            option.value = dat.CODIGO;
            option.textContent = dat.DESCRIPCION;
            selectBranch.appendChild(option);
        });
       
    } catch (error) {
        console.error('Error al cargar los turnoEdit:', error.message);
        const selectBranch = document.getElementById('turnoEdit');
        const option = document.createElement('option');
        option.value = "error";
        option.textContent = error.message;
        selectBranch.appendChild(option);
    }
};
async function cargarHorario(opcion = false ) {
    try {
        const selectBranch = document.getElementById('horarioEdit');
        if (!selectBranch) return;
        
          // Verificar si ya hay datos cargados
          if (selectBranch.children.length > 1 && opcion === false) {
            console.log('Los horarioEdit ya están cargados.');
            return;
        }
        selectBranch.innerHTML = '<option value="">Seleccione Horario</option>';
        const dat = await fetchSelectDatos("HORARIOS_ACCION");
        dat.forEach(dat => {
            const option = document.createElement('option');
            option.value = dat.CODIGO;
            option.textContent = dat.DESCRIPCION;
            selectBranch.appendChild(option);
        });
       
    } catch (error) {
        console.error('Error al cargar los horarioEdit:', error.message);
        const selectBranch = document.getElementById('horarioEdit');
        const option = document.createElement('option');
        option.value = "error";
        option.textContent = error.message;
        selectBranch.appendChild(option);
    }
};

async function cargarNivel(opcion = false ) {
    try {
        const selectBranch = document.getElementById('nivelEdit');
        if (!selectBranch) return;
        
          // Verificar si ya hay datos cargados
          if (selectBranch.children.length > 1 && opcion === false) {
            console.log('Los nivelEdit ya están cargados.');
            return;
        }
        selectBranch.innerHTML = '<option value="">Seleccione Nivel</option>';
        const dat = await fetchSelectDatos("NIVEL_ACADEMICO_ACCION");
        dat.forEach(dat => {
            const option = document.createElement('option');
            option.value = dat.CODIGO;
            option.textContent = dat.DESCRIPCION;
            selectBranch.appendChild(option);
        });
       
    } catch (error) {
        console.error('Error al cargar los nivelEdit:', error.message);
        const selectBranch = document.getElementById('nivelEdit');
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

async function cargarEstados() {
    try {
        const data = await fetchDatos("ESTADO_ALUMNO_ACCION");
        const tablaData = document.getElementById('tablaEstado').getElementsByTagName('tbody')[0];
        
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
            botonEditar.onclick = () => openModalEstado(true, dat); // Llamar a la función para abrir el modal con los datos de la sucursal
            celdaAcciones.appendChild(botonEditar);
            fila.appendChild(celdaAcciones);
        
            // Agregar la fila a la tabla
            tablaData.appendChild(fila);
        });
        
    } catch (error) {
        console.error('Error al cargar estados:', error.message);
      
    }
};


async function cargarMaestros() {
    try {
        const data = await fetchDatos("MAESTROS_ACCION");
        const tablaData = document.getElementById('tablaMaestros').getElementsByTagName('tbody')[0];
        
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
            botonEditar.onclick = () => openModalMaestro(true, dat); // Llamar a la función para abrir el modal con los datos de la sucursal
            celdaAcciones.appendChild(botonEditar);
            fila.appendChild(celdaAcciones);
        
            // Agregar la fila a la tabla
            tablaData.appendChild(fila);
        });
        
    } catch (error) {
        console.error('Error al cargar forma de pago:', error.message);
      
    }
};


async function cargarTurnos() {
    try {
        const data = await fetchDatos("TURNOS_ACCION");
        const tablaData = document.getElementById('tablaTurnos').getElementsByTagName('tbody')[0];
        
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
            botonEditar.onclick = () => openModalTurno(true, dat); // Llamar a la función para abrir el modal con los datos de la sucursal
            celdaAcciones.appendChild(botonEditar);
            fila.appendChild(celdaAcciones);
        
            // Agregar la fila a la tabla
            tablaData.appendChild(fila);
        });
        
    } catch (error) {
        console.error('Error al cargar forma de pago:', error.message);
      
    }
};

async function cargarHorarios() {
    try {
        const data = await fetchDatos("HORARIOS_ACCION");
        const tablaData = document.getElementById('tablaHorarios').getElementsByTagName('tbody')[0];
        
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
            botonEditar.onclick = () => openModalHorario(true, dat); // Llamar a la función para abrir el modal con los datos de la sucursal
            celdaAcciones.appendChild(botonEditar);
            fila.appendChild(celdaAcciones);
        
            // Agregar la fila a la tabla
            tablaData.appendChild(fila);
        });
        
    } catch (error) {
        console.error('Error al cargar forma horarios:', error.message);
      
    }
};


async function cargarNiveles() {
    try {
        const data = await fetchDatos("NIVEL_ACADEMICO_ACCION");
        const tablaData = document.getElementById('tablaNivel').getElementsByTagName('tbody')[0];
        
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
            botonEditar.onclick = () => openModalNivel(true, dat); // Llamar a la función para abrir el modal con los datos de la sucursal
            celdaAcciones.appendChild(botonEditar);
            fila.appendChild(celdaAcciones);
        
            // Agregar la fila a la tabla
            tablaData.appendChild(fila);
        });
        
    } catch (error) {
        console.error('Error al cargar forma horarios:', error.message);
      
    }
};

document.getElementById('formRegistrarAlumno').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío tradicional del formulario
    registrarAlumno(); // Llama a la función para registrar al alumno
});
// Función para leer el archivo como ArrayBuffer
function convertirArchivoABase64(archivo) {
    return new Promise((resolve, reject) => {
        const lector = new FileReader();
        
        lector.onload = function(event) {
          resolve(event.target.result);  // Resuelve la promesa con el resultado base64
        };
        
        lector.onerror = function(error) {
          reject(error);  // Si ocurre un error, rechaza la promesa
        };
        
        lector.readAsDataURL(archivo);  // Lee el archivo como base64
      });
}


function registrarAlumno() {
    // Obtén los valores de los campos del formulario
const VENDEDOR = document.getElementById('vendedores-1').value;
const DUI = document.getElementById('dui').value;
const NOMBRE = document.getElementById('titular').value;
const TELEFONO = document.getElementById('telefono').value;
const CORREO = document.getElementById('email').value;
const LUGAR_TRABAJO = document.getElementById('lugartrabajo').value;
const TELEFONO_TRABAJO = document.getElementById('telefonotrabajo').value;
const DEPARTAMENTO = document.getElementById('departamento').value;
const DISTRITO = document.getElementById('distrito').value;
const DIRECCION = document.getElementById('direccion').value;
const NOMBRE_ALUMNO = document.getElementById('nombreAlumno').value;
const TELEFONO_ALUMNO = document.getElementById('telefonoAlternativo').value;
const FECHA_NACIMIENTO = document.getElementById('fecha_nacimiento').value;
const EDAD = document.getElementById('edad').value;
const GENERO = document.getElementById('genero').value;
const CORREO_ALUMNO = document.getElementById('email').value;
const IDIOMA = document.getElementById('idioma').value;
const GRADO_KIDS = document.getElementById('gradoKids').value;
const MODALIDAD = document.getElementById('modalidad').value;
const MATRICULA = document.getElementById('matricula').value;
const MENSUALIDAD = document.getElementById('mensualidad').value;
const METODO_PAGO = document.getElementById('metodopago').value;
const BANCO = document.getElementById('banco').value;
const REFERENCIA = document.getElementById('referencia').value;
const ESTRATEGIA = document.getElementById('estrategia').value;
//const DOC_DUI =   null;
//const DOC_COMPROBANTE =  document.getElementById('archivo2').files[0] ? document.getElementById('archivo2').files[0] : null;
//const DOC_INSCRIPCION =  document.getElementById('archivo3').files[0] ? document.getElementById('archivo3').files[0] : null;
const SUCURSAL = document.getElementById('sucursalreg').value;
const MOTIVACION = document.getElementById('motivacion').value;
const COMENTARIOS = document.getElementById('comentarios').value;


    // Construye el objeto con los datos del alumno
    const jsonDat = {
        VENDEDOR : VENDEDOR,
        DUI : DUI,
        NOMBRE : NOMBRE,
        TELEFONO : TELEFONO,
        CORREO : CORREO,
        LUGAR_TRABAJO : LUGAR_TRABAJO,
        TELEFONO_TRABAJO : TELEFONO_TRABAJO,
        DEPARTAMENTO : DEPARTAMENTO,
        DISTRITO : DISTRITO,
        DIRECCION : DIRECCION,
        NOMBRE_ALUMNO : NOMBRE_ALUMNO,
        TELEFONO_ALUMNO : TELEFONO_ALUMNO,
        FECHA_NACIMIENTO : FECHA_NACIMIENTO,
        EDAD : EDAD,
        GENERO : GENERO,
        CORREO_ALUMNO : CORREO_ALUMNO,
        IDIOMA : IDIOMA,
        GRADO_KIDS : GRADO_KIDS,
        MODALIDAD : MODALIDAD,
        MATRICULA : MATRICULA,
        MENSUALIDAD : MENSUALIDAD,
        METODO_PAGO : METODO_PAGO,
        BANCO : BANCO,
        REFERENCIA : REFERENCIA,
        ESTRATEGIA : ESTRATEGIA,
        DOC_DUI : DOC_DUI,
        DOC_COMPROBANTE : DOC_COMPROBANTE,
        DOC_INSCRIPCION : DOC_INSCRIPCION,
        SUCURSAL : SUCURSAL,
        MOTIVACION : MOTIVACION,
        COMENTARIOS : COMENTARIOS ,
        USUARIO_CREACION : session.user
    };

    // Envía los datos al backend mediante fetch
    fetch(url+"registros", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonDat)
    })
    .then(response => {
        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();  // Leer la respuesta como texto
    })
    .then(text => {
        console.log('Raw response:', text);  // Verifica lo que devuelve el servidor
        try {
            // Intentar convertir el texto a JSON
            const result = JSON.parse(text);
            console.log(result);  // Ver el contenido del objeto JSON
            if (result.success) {
                alert('Alumno registrado con éxito');
                 // Limpiar el formulario
                document.getElementById('formRegistrarAlumno').reset();  // 'miFormulario' es el ID del formulario
                document.getElementById('btn-quitar').style.display = 'none';  // Ocultar el botón
                document.getElementById('btn-quitar2').style.display = 'none';  // Ocultar el botón
                document.getElementById('btn-quitar3').style.display = 'none';  // Ocultar el botón
                DOC_COMPROBANTE = null;
                DOC_DUI=null;
                DOC_INSCRIPCION=null;
                // Suponiendo que 'session.vend' contiene el código del vendedor que debe ser seleccionado
                    const vend = session.vend;  // o cualquier variable que tenga el valor del vendedor

                    // Obtener el select de vendedores
                    const selectVendedores = document.getElementById('vendedores-1');

                    // Recorrer las opciones del select y seleccionar la opción que coincida con 'vend'
                    for (let i = 0; i < selectVendedores.options.length; i++) {
                        const option = selectVendedores.options[i];
                        
                        // Comparar si el valor de la opción es igual al valor de 'vend'
                        if (String(option.value).trim() === String(vend).trim()) {
                            option.selected = true;  // Seleccionar la opción correspondiente
                            break;  // Salir del bucle una vez que se ha seleccionado la opción
                        }
                    }
                    // Regresar al principio de la página
                    window.scrollTo(0, 0);

            } else {
                console.error('Error:', text);
                alert('Hubo un error al registrar al alumno: ' + text);
            }
        } catch (e) {
            console.error('Error al procesar la respuesta JSON:', e);
            alert('Hubo un error al procesar la respuesta del servidor');
        }
    })
    .catch(error => {
        console.error('Error al procesar la solicitud:', error);
        alert('Hubo un error al procesar la solicitud');
    });
}
