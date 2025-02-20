const url = "https://apitest.grupocarosa.com/ApiDatos/"
// Muestra el modal para crear o editar
function openModal(isEdit = false, sucursal = {}) {
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modal-title");
    const form = document.getElementById("modal-form");
    
    // Configuración para edición o creación
    if (isEdit) {
        modalTitle.textContent = "Editar Sucursal";
        document.getElementById("sucursal-id").value = sucursal.BODEGA;
        document.getElementById("sucursal-id").readOnly  = true;
        document.getElementById("nombre").value = sucursal.NOMBRE;
        document.getElementById("ubicacion").value = sucursal.DIRECCION;
    } else {
        modalTitle.textContent = "Crear Nueva Sucursal";
        document.getElementById("sucursal-id").readOnly  = false;
        form.reset(); // Limpiar el formulario para nueva entrada
    }

    modal.style.display = "flex"; // Mostrar el modal
};


// Guardar sucursal (creación o edición)
async function  saveSucursal(event) {
    event.preventDefault(); // Evitar recarga de la página
    const id = document.getElementById("sucursal-id").value;
    const nombre = document.getElementById("nombre").value;
    const ubicacion = document.getElementById("ubicacion").value;

    if (document.getElementById("sucursal-id").readOnly) {
        // Lógica para actualizar una sucursal existente
       // console.log("Actualizar sucursal:", { id, nombre, ubicacion });
            // Aquí puedes agregar la lógica para actualizar la fila en la tabla
            try {
                const response = await postBodegas("UPDATE2", id, nombre, ubicacion);
                console.log("Sucursal actualizada:", response);
                // Lógica para actualizar la fila correspondiente en la tabla
                //updateTableRow(id, nombre, ubicacion); // Función para actualizar la fila
                cargarSuc();
            } catch (error) {
                console.error("Error al actualizar la sucursal:", error.message);
                alert("Error al actualizar ");
            }

        } else {
            // Lógica para crear una nueva sucursal
            const rows = document.querySelectorAll('tr');
          
            for (const row of rows) {
               // Buscar la celda específica dentro de la fila
               const firstCell = row.cells[0]; // Suponiendo que el valor está en la primera celda
               if (firstCell.textContent.trim() === id) {
                   // Actualizar los valores de las columnas correspondientes
                alert("Codigo "+ id +" ya existe");
                  return;
               }
           };
       
       

        // Aquí puedes agregar la lógica para agregar una nueva fila en la tabla
        try {
            const response = await postBodegas("INSERT", id, nombre, ubicacion);
            console.log("Sucursal INSERTADA:", response);
            // Lógica para actualizar la fila correspondiente en la tabla
           // updateTableRow(id, nombre, ubicacion); // Función para actualizar la fila
           cargarSuc();

        } catch (error) {
            console.error("Error al actualizar la sucursal:", error.message);
            alert("Error al crear ");
        }
    }

    closeModal();
};
// Funciones auxiliares
function updateTableRowVend(id, nombre) {
    // Busca la fila correspondiente en la tabla y actualiza los datos
    const rows = document.querySelectorAll('tr');
     let rowFound = false;

    rows.forEach(row => {
        // Buscar la celda específica dentro de la fila
        const firstCell = row.cells[0]; // Suponiendo que el valor está en la primera celda
        if (firstCell && firstCell.textContent.trim() === id) {
            // Actualizar los valores de las columnas correspondientes
            row.cells[1].textContent = nombre;
            rowFound = true;
        }
    });

    if (!rowFound) {
        console.error(`No se encontró una fila con el valor "${id}" en la primera celda.`);
    }
}

// Guardar sucursal (creación o edición)
async function  saveVendedor(event) {
    event.preventDefault(); // Evitar recarga de la página
    const id = document.getElementById("vendedor-id").value;
    const nombre = document.getElementById("nombreVend").value;
    const activo = document.getElementById("activo").checked;

    if (document.getElementById("vendedor-id").readOnly) {
        // Lógica para actualizar una sucursal existente
       // console.log("Actualizar sucursal:", { id, nombre, ubicacion });
            // Aquí puedes agregar la lógica para actualizar la fila en la tabla
            try {
                const response = await postVendedores("UPDATE2", id, nombre,activo);
                console.log("Vendedor actualizado:", response);
                // Lógica para actualizar la fila correspondiente en la tabla
                //updateTableRowVend(id, nombre); // Función para actualizar la fila
                cargarVend();
            } catch (error) {
                console.error("Error al actualizar la sucursal:", error.message);
                alert("Error al actualizar ");
            }

        } else {
            // Lógica para crear una nueva sucursal
            const rows = document.querySelectorAll('tr');
          
            for (const row of rows) {
               // Buscar la celda específica dentro de la fila
               const firstCell = row.cells[0]; // Suponiendo que el valor está en la primera celda
               if (firstCell.textContent.trim() === id) {
                   // Actualizar los valores de las columnas correspondientes
                alert("Codigo "+ id +" ya existe");
                  return;
               }
           };
       
       

        // Aquí puedes agregar la lógica para agregar una nueva fila en la tabla
        try {
            const response = await postVendedores("INSERT", id, nombre,activo);
            console.log("IDIOMA INSERTADO:", response);
            // Lógica para actualizar la fila correspondiente en la tabla
           // updateTableRow(id, nombre, ubicacion); // Función para actualizar la fila
           cargarVend();

        } catch (error) {
            console.error("Error al actualizar la sucursal:", error.message);
            alert("Error al crear ");
        }
    }

    closeModal();
};

// Guardar sucursal (creación o edición)
async function  saveIdioma(event) {
    event.preventDefault(); // Evitar recarga de la página
    const id = document.getElementById("idioma-id").value;
    const nombre = document.getElementById("nombreIdioma").value;
    const activo = document.getElementById("activoIdioma").checked;

    if (document.getElementById("idioma-id").readOnly) {
        // Lógica para actualizar una sucursal existente
       // console.log("Actualizar sucursal:", { id, nombre, ubicacion });
            // Aquí puedes agregar la lógica para actualizar la fila en la tabla
            try {
                const response = await postDatos("UPDATE", id, nombre,activo,"IDIOMA_ACCION");
                console.log("IDIOMA actualizado:", response);
                // Lógica para actualizar la fila correspondiente en la tabla
                //updateTableRowVend(id, nombre); // Función para actualizar la fila
                cargarIdio();
            } catch (error) {
                console.error("Error al actualizar IDIOMA:", error.message);
                alert("Error al actualizar ");
            }

        } else {
            // Lógica para crear una nueva sucursal
            const rows = document.querySelectorAll('tr');
          
            for (const row of rows) {
               // Buscar la celda específica dentro de la fila
               const firstCell = row.cells[0]; // Suponiendo que el valor está en la primera celda
               if (firstCell.textContent.trim() === id) {
                   // Actualizar los valores de las columnas correspondientes
                alert("Codigo "+ id +" ya existe");
                  return;
               }
           };
       
       
        // Aquí puedes agregar la lógica para agregar una nueva fila en la tabla
        try {
            const response = await postDatos("INSERT", id, nombre,activo,"IDIOMA_ACCION");
            console.log("vendedor INSERTADO:", response);
            // Lógica para actualizar la fila correspondiente en la tabla
           // updateTableRow(id, nombre, ubicacion); // Función para actualizar la fila
           cargarIdio();

        } catch (error) {
            console.error("Error al actualizar IDOMA:", error.message);
            alert("Error al crear ");
        }
    }

    closeModal();
};

async function  saveEstrategia(event) {
    event.preventDefault(); // Evitar recarga de la página
    const id = document.getElementById("estrategia-id").value;
    const nombre = document.getElementById("nombreEstrategia").value;
    const activo = document.getElementById("activoEstrategia").checked;

    if (document.getElementById("estrategia-id").readOnly) {
        // Lógica para actualizar una sucursal existente
       // console.log("Actualizar sucursal:", { id, nombre, ubicacion });
            // Aquí puedes agregar la lógica para actualizar la fila en la tabla
            try {
                const response = await postDatos("UPDATE", id, nombre,activo,"estrategia_ACCION");
                console.log("estrategia actualizado:", response);
                // Lógica para actualizar la fila correspondiente en la tabla
                //updateTableRowVend(id, nombre); // Función para actualizar la fila
                cargarEstra();
            } catch (error) {
                console.error("Error al actualizar estrategia:", error.message);
                alert("Error al actualizar ");
            }

        } else {
            // Lógica para crear una nueva sucursal
            const rows = document.querySelectorAll('tr');
          
            for (const row of rows) {
               // Buscar la celda específica dentro de la fila
               const firstCell = row.cells[0]; // Suponiendo que el valor está en la primera celda
               if (firstCell.textContent.trim() === id) {
                   // Actualizar los valores de las columnas correspondientes
                alert("Codigo "+ id +" ya existe");
                  return;
               }
           };     
        // Aquí puedes agregar la lógica para agregar una nueva fila en la tabla
        try {
            const response = await postDatos("INSERT", id, nombre,activo,"estrategia_ACCION");
            console.log("vendedor INSERTADO:", response);
            // Lógica para actualizar la fila correspondiente en la tabla
           // updateTableRow(id, nombre, ubicacion); // Función para actualizar la fila
           cargarEstra();

        } catch (error) {
            console.error("Error al actualizar ESTRATEGIA:", error.message);
            alert("Error al crear ");
        }
    }

    closeModal();
};

async function  saveFormaPago(event) {
    event.preventDefault(); // Evitar recarga de la página
    const id = document.getElementById("formaPago-id").value;
    const nombre = document.getElementById("nombreformaPago").value;
    const activo = document.getElementById("activoformaPago").checked;

    if (document.getElementById("formaPago-id").readOnly) {
        // Lógica para actualizar una sucursal existente
       // console.log("Actualizar sucursal:", { id, nombre, ubicacion });
            // Aquí puedes agregar la lógica para actualizar la fila en la tabla
            try {
                const response = await postDatos("UPDATE", id, nombre,activo,"FORMA_PAGO_ACCION");
                console.log("formaPago actualizado:", response);
                // Lógica para actualizar la fila correspondiente en la tabla
                //updateTableRowVend(id, nombre); // Función para actualizar la fila
                cargarFormaPag();
            } catch (error) {
                console.error("Error al actualizar formaPago:", error.message);
                alert("Error al actualizar ");
            }

        } else {
            // Lógica para crear una nueva sucursal
            const rows = document.querySelectorAll('tr');
          
            for (const row of rows) {
               // Buscar la celda específica dentro de la fila
               const firstCell = row.cells[0]; // Suponiendo que el valor está en la primera celda
               if (firstCell.textContent.trim() === id) {
                   // Actualizar los valores de las columnas correspondientes
                alert("Codigo "+ id +" ya existe");
                  return;
               }
           };     
        // Aquí puedes agregar la lógica para agregar una nueva fila en la tabla
        try {
            const response = await postDatos("INSERT", id, nombre,activo,"FORMA_PAGO_ACCION");
            console.log("formaPago INSERTADO:", response);
            // Lógica para actualizar la fila correspondiente en la tabla
           // updateTableRow(id, nombre, ubicacion); // Función para actualizar la fila
           cargarFormaPag();

        } catch (error) {
            console.error("Error al actualizar formaPago:", error.message);
            alert("Error al crear ");
        }
    }

    closeModal();
};

async function  saveEstado(event) {
    event.preventDefault(); // Evitar recarga de la página
    const id = document.getElementById("estado-id").value;
    const nombre = document.getElementById("nombreEstado").value;
    const activo = document.getElementById("activoEstado").checked;

    if (document.getElementById("estado-id").readOnly) {
            try {
                const response = await postDatos("UPDATE", id, nombre,activo,"ESTADO_ALUMNO_ACCION");
                console.log("formaPago actualizado:", response);
                // Lógica para actualizar la fila correspondiente en la tabla
                //updateTableRowVend(id, nombre); // Función para actualizar la fila
                cargarEstados();
            } catch (error) {
                console.error("Error al actualizar formaPago:", error.message);
                alert("Error al actualizar ");
            }

        } else {
            // Lógica para crear una nueva sucursal
            const rows = document.querySelectorAll('tr');
          
            for (const row of rows) {
               // Buscar la celda específica dentro de la fila
               const firstCell = row.cells[0]; // Suponiendo que el valor está en la primera celda
               if (firstCell.textContent.trim() === id) {
                   // Actualizar los valores de las columnas correspondientes
                alert("Codigo "+ id +" ya existe");
                  return;
               }
           };     
        // Aquí puedes agregar la lógica para agregar una nueva fila en la tabla
        try {
            const response = await postDatos("INSERT", id, nombre,activo,"ESTADO_ALUMNO_ACCION");
            console.log("formaPago INSERTADO:", response);
            // Lógica para actualizar la fila correspondiente en la tabla
           // updateTableRow(id, nombre, ubicacion); // Función para actualizar la fila
           cargarEstados();

        } catch (error) {
            console.error("Error al actualizar formaPago:", error.message);
            alert("Error al crear ");
        }
    }

    closeModal();
};

async function  saveMaestro(event) {
    event.preventDefault(); // Evitar recarga de la página
    const id = document.getElementById("maestro-id").value;
    const nombre = document.getElementById("nombremaestro").value;
    const activo = document.getElementById("activomaestro").checked;
    if (document.getElementById("maestro-id").readOnly) {
            try {
                const response = await postDatos("UPDATE", id, nombre,activo,"MAESTROS_ACCION");
                console.log("MAESTRO actualizado:", response);
                // Lógica para actualizar la fila correspondiente en la tabla
                //updateTableRowVend(id, nombre); // Función para actualizar la fila
                cargarMaestros();
            } catch (error) {
                console.error("Error al actualizar MAESTRO:", error.message);
                alert("Error al actualizar ");
            }
        } else {
            // Lógica para crear una nueva sucursal
            const rows = document.querySelectorAll('tr');
            for (const row of rows) {
               // Buscar la celda específica dentro de la fila
               const firstCell = row.cells[0]; // Suponiendo que el valor está en la primera celda
               if (firstCell.textContent.trim() === id) {
                   // Actualizar los valores de las columnas correspondientes
                alert("Codigo "+ id +" ya existe");
                  return;
               }
           };     
        // Aquí puedes agregar la lógica para agregar una nueva fila en la tabla
        try {
            const response = await postDatos("INSERT", id, nombre,activo,"MAESTROS_ACCION");
            console.log("MAESTRO INSERTADO:", response);
            cargarMaestros();

        } catch (error) {
            console.error("Error al actualizar MAESTRO:", error.message);
            alert("Error al crear ");
        }
    }

    closeModal();
};
async function  saveRegistro(event) {
    event.preventDefault(); // Evitar recarga de la página
    const id = document.getElementById("idEdit").value;
    const nombre = document.getElementById("nombreEdit").value;
    const estado = document.getElementById("estadoEdit").value;
    const modalidad = document.getElementById("modalidadEdit").value;
    const bienvenida = document.getElementById("bienvenidaEdit").value.trim() === "" ? null: document.getElementById("bienvenidaEdit").value.trim();
    const gerente = document.getElementById("gerenteEdit").value.trim() === "" ? null: document.getElementById("gerenteEdit").value.trim();
    const notas = document.getElementById("notasEdit").value.trim() === "" ? null: document.getElementById("notasEdit").value.trim();
    const maestro = document.getElementById("maestroEdit").value.trim() === "" ? null: document.getElementById("maestroEdit").value.trim();
    const turno = document.getElementById("turnoEdit").value.trim() === "" ? null: document.getElementById("turnoEdit").value.trim();
    const horario = document.getElementById("horarioEdit").value.trim()=== "" ? null: document.getElementById("horarioEdit").value.trim();
    const primerPago = document.getElementById("primerPago").value || null; 
    const fechaPago = document.getElementById("fechaPagoEdit").value || null; 
    const nivel = document.getElementById("nivelEdit").value.trim()=== "" ? null: document.getElementById("nivelEdit").value.trim();
    if (document.getElementById("idEdit").readOnly) {
            try {
                const response = await postDatosUpdate("UPDATE", id,estado, nombre,"REGISTROS_ACCION",modalidad,bienvenida,gerente,notas,
                    maestro,turno,horario,primerPago,fechaPago,nivel
                );
                console.log("MAESTRO actualizado:", response);
                // Lógica para actualizar la fila correspondiente en la tabla
                //updateTableRowVend(id, nombre); // Función para actualizar la fila
                cargarDatos(document.getElementById('fechaInicio').value,
                document.getElementById('fechaFin').value);
                closeModal();
            } catch (error) {
                console.error("Error al actualizar registro:", error.message);
                alert("Error al actualizar ");
            }
       
    }

    
};

async function  guardarBase() {
   // event.preventDefault(); // Evitar recarga de la página
    const suc = document.getElementById("sucursalTabla").value;
    const mes = document.getElementById("mes").value;
    const anio = document.getElementById("anio").value;
    const estado = 0//document.getElementById("estado").value;
  
    if (typeof suc === 'string' && suc.trim() !== '') {
            try {
                const response = await postInsertDatos("INSERT", mes,anio, suc,estado,"CHIVO");
                console.log("datos insertados:", response);
                // Lógica para actualizar la fila correspondiente en la tabla
                //updateTableRowVend(id, nombre); // Función para actualizar la fila
                // cargarDatos(document.getElementById('fechaInicio').value,
                // document.getElementById('fechaFin').value);
                // closeModal();
                alert("Datos guardados");
            } catch (error) {
                console.error("Error al insertar registro:", error.message);
                alert("Error al guardar ");
            }
    }
    else { 
        alert("Seleccione sucursal, para poder guardar base");
    }
    
};

async function  saveTurno(event) {
    event.preventDefault(); // Evitar recarga de la página
    const id = document.getElementById("turno-id").value;
    const nombre = document.getElementById("nombreturno").value;
    const activo = document.getElementById("activoturno").checked;
    if (document.getElementById("turno-id").readOnly) {
            try {
                const response = await postDatos("UPDATE", id, nombre,activo,"turnos_ACCION");
                console.log("turno actualizado:", response);
                // Lógica para actualizar la fila correspondiente en la tabla
                //updateTableRowVend(id, nombre); // Función para actualizar la fila
                cargarTurnos();
            } catch (error) {
                console.error("Error al actualizar turno:", error.message);
                alert("Error al actualizar ");
            }
        } else {
            // Lógica para crear una nueva sucursal
            const rows = document.querySelectorAll('tr');
            for (const row of rows) {
               // Buscar la celda específica dentro de la fila
               const firstCell = row.cells[0]; // Suponiendo que el valor está en la primera celda
               if (firstCell.textContent.trim() === id) {
                   // Actualizar los valores de las columnas correspondientes
                alert("Codigo "+ id +" ya existe");
                  return;
               }
           };     
        // Aquí puedes agregar la lógica para agregar una nueva fila en la tabla
        try {
            const response = await postDatos("INSERT", id, nombre,activo,"turnoS_ACCION");
            console.log("turno INSERTADO:", response);
            cargarTurnos();

        } catch (error) {
            console.error("Error al actualizar turno:", error.message);
            alert("Error al crear ");
        }
    }

    closeModal();
};

async function  saveHorario(event) {
    event.preventDefault(); // Evitar recarga de la página
    const id = document.getElementById("horario-id").value;
    const nombre = document.getElementById("nombrehorario").value;
    const activo = document.getElementById("activohorario").checked;
    if (document.getElementById("horario-id").readOnly) {
            try {
                const response = await postDatos("UPDATE", id, nombre,activo,"horarios_ACCION");
                console.log("horario actualizado:", response);
                // Lógica para actualizar la fila correspondiente en la tabla
                //updateTableRowVend(id, nombre); // Función para actualizar la fila
                cargarHorarios();
            } catch (error) {
                console.error("Error al actualizar horario:", error.message);
                alert("Error al actualizar ");
            }
        } else {
            // Lógica para crear una nueva sucursal
            const rows = document.querySelectorAll('tr');
            for (const row of rows) {
               // Buscar la celda específica dentro de la fila
               const firstCell = row.cells[0]; // Suponiendo que el valor está en la primera celda
               if (firstCell.textContent.trim() === id) {
                   // Actualizar los valores de las columnas correspondientes
                alert("Codigo "+ id +" ya existe");
                  return;
               }
           };     
        // Aquí puedes agregar la lógica para agregar una nueva fila en la tabla
        try {
            const response = await postDatos("INSERT", id, nombre,activo,"horarioS_ACCION");
            console.log("horario INSERTADO:", response);
            cargarHorarios();

        } catch (error) {
            console.error("Error al actualizar horario:", error.message);
            alert("Error al crear ");
        }
    }

    closeModal();
};

async function  saveNivel(event) {
    event.preventDefault(); // Evitar recarga de la página
    const id = document.getElementById("nivel-id").value;
    const nombre = document.getElementById("nombrenivel").value;
    const activo = document.getElementById("activonivel").checked;
    if (document.getElementById("nivel-id").readOnly) {
            try {
                const response = await postDatos("UPDATE", id, nombre,activo,"NIVEL_ACADEMICO_ACCION");
                console.log("nivel actualizado:", response);
                // Lógica para actualizar la fila correspondiente en la tabla
                //updateTableRowVend(id, nombre); // Función para actualizar la fila
                cargarNiveles();
            } catch (error) {
                console.error("Error al actualizar nivel:", error.message);
                alert("Error al actualizar ");
            }
        } else {
            // Lógica para crear una nueva sucursal
            const rows = document.querySelectorAll('tr');
            for (const row of rows) {
               // Buscar la celda específica dentro de la fila
               const firstCell = row.cells[0]; // Suponiendo que el valor está en la primera celda
               if (firstCell.textContent.trim() === id) {
                   // Actualizar los valores de las columnas correspondientes
                alert("Codigo "+ id +" ya existe");
                  return;
               }
           };     
        // Aquí puedes agregar la lógica para agregar una nueva fila en la tabla
        try {
            const response = await postDatos("INSERT", id, nombre,activo,"NIVEL_ACADEMICO_ACCION");
            console.log("nivel INSERTADO:", response);
            cargarNiveles();

        } catch (error) {
            console.error("Error al actualizar nivel:", error.message);
            alert("Error al crear ");
        }
    }

    closeModal();
};

// Manejar el cierre del modal al hacer clic fuera del contenido
window.onclick = function(event) {
    const modal = document.getElementById("modal");
    if (event.target == modal) {
        closeModal();
    }
    const modal2 = document.getElementById("modalVendedor");
    if (event.target == modal2) {
        closeModal();
    }
    const modal3 = document.getElementById("modalIdioma");
    if (event.target == modal3) {
        closeModal();
    }
    const modal4 = document.getElementById("modalEstrategia");
    if (event.target == modal4) {
        closeModal();
    }
    const modal6 = document.getElementById("modalEstado");
    if (event.target == modal6) {
        closeModal();
    }
    const modal7 = document.getElementById("modalTurno");
    if (event.target == modal7) {
        closeModal();
    }
    const modal8 = document.getElementById("modalMaestro");
    if (event.target == modal8) {
        closeModal();
    }
    const modal9 = document.getElementById("modalHorario");
    if (event.target == modal9) {
        closeModal();
    }
    const modal10 = document.getElementById("formulario");
    if (event.target == modal10) {
        closeModal();
    }
    
};



// Muestra el modal para crear o editar
function openModalVend(isEdit = false, data = {}) {
    const modal = document.getElementById("modalVendedor");
    const modalTitle = document.getElementById("modal-title2");
    const form = document.getElementById("modal-form");
    
    // Configuración para edición o creación
    if (isEdit) {
        modalTitle.textContent = "Editar Vendedor";
        document.getElementById("vendedor-id").value = data.VENDEDOR;
        document.getElementById("vendedor-id").readOnly  = true;
        document.getElementById("nombreVend").value = data.NOMBRE;
        document.getElementById("activo").checked  = data.ACTIVO;
    } else {
        modalTitle.textContent = "Crear Nuevo Vendedor";
        document.getElementById("vendedor-id").value = "";
        document.getElementById("vendedor-id").readOnly  = false;
        document.getElementById("nombreVend").value = "";

        document.getElementById("activo").checked   = true;
        form.reset(); // Limpiar el formulario para nueva entrada
    }

    modal.style.display = "flex"; // Mostrar el modal
};


// Muestra el modal para crear o editar
function openModalIdioma(isEdit = false, data = {}) {
    const modal = document.getElementById("modalIdioma");
    const modalTitle = document.getElementById("modal-title3");
    const form = document.getElementById("modal-form");
    
    // Configuración para edición o creación
    if (isEdit) {
        modalTitle.textContent = "Editar Idioma";
        document.getElementById("idioma-id").value = data.CODIGO;
        document.getElementById("idioma-id").readOnly  = true;
        document.getElementById("nombreIdioma").value = data.DESCRIPCION;
        document.getElementById("activoIdioma").checked  = data.ACTIVO;
    } else {
        modalTitle.textContent = "Crear Nuevo Idioma";
        document.getElementById("idioma-id").value = "";
        document.getElementById("idioma-id").readOnly  = false;
        document.getElementById("nombreIdioma").value = "";

        document.getElementById("activoIdioma").checked   = true;
        form.reset(); // Limpiar el formulario para nueva entrada
    }

    modal.style.display = "flex"; // Mostrar el modal
};

// Muestra el modal para crear o editar
function openModalEstrategia(isEdit = false, data = {}) {
    const modal = document.getElementById("modalEstrategia");
    const modalTitle = document.getElementById("modal-title4");
    const form = document.getElementById("modal-form");
    
    // Configuración para edición o creación
    if (isEdit) {
        modalTitle.textContent = "Editar Estrategia";
        document.getElementById("estrategia-id").value = data.CODIGO;
        document.getElementById("estrategia-id").readOnly  = true;
        document.getElementById("nombreEstrategia").value = data.DESCRIPCION;
        document.getElementById("activoEstrategia").checked  = data.ACTIVO;
    } else {
        modalTitle.textContent = "Crear Nueva Estrategia";
        document.getElementById("estrategia-id").value = "";
        document.getElementById("estrategia-id").readOnly  = false;
        document.getElementById("nombreEstrategia").value = "";

        document.getElementById("activoEstrategia").checked   = true;
        form.reset(); // Limpiar el formulario para nueva entrada
    }

    modal.style.display = "flex"; // Mostrar el modal
};

// Muestra el modal para crear o editar
function openModalFormaPago(isEdit = false, data = {}) {
    const modal = document.getElementById("modalFormaPago");
    const modalTitle = document.getElementById("modal-title4");
    const form = document.getElementById("modal-form");
    
    // Configuración para edición o creación
    if (isEdit) {
        modalTitle.textContent = "Editar Forma de Pago";
        document.getElementById("formaPago-id").value = data.CODIGO;
        document.getElementById("formaPago-id").readOnly  = true;
        document.getElementById("nombreformaPago").value = data.DESCRIPCION;
        document.getElementById("activoformaPago").checked  = data.ACTIVO;
    } else {
        modalTitle.textContent = "Crear Nueva forma de pago";
        document.getElementById("formaPago-id").value = "";
        document.getElementById("formaPago-id").readOnly  = false;
        document.getElementById("nombreformaPago").value = "";

        document.getElementById("activoformaPago").checked   = true;
        form.reset(); // Limpiar el formulario para nueva entrada
    }

    modal.style.display = "flex"; // Mostrar el modal
};

function openModalEstado(isEdit = false, data = {}) {
    const modal = document.getElementById("modalEstado");
    const modalTitle = document.getElementById("modal-title5");
    const form = document.getElementById("modal-form");
    
    // Configuración para edición o creación
    if (isEdit) {
        modalTitle.textContent = "Editar Estado";
        document.getElementById("estado-id").value = data.CODIGO;
        document.getElementById("estado-id").readOnly  = true;
        document.getElementById("nombreEstado").value = data.DESCRIPCION;
        document.getElementById("activoEstado").checked  = data.ACTIVO;
    } else {
        modalTitle.textContent = "Crear Nuevo Estado";
        document.getElementById("estado-id").value = "";
        document.getElementById("estado-id").readOnly  = false;
        document.getElementById("nombreEstado").value = "";

        document.getElementById("activoEstado").checked   = true;
        form.reset(); // Limpiar el formulario para nueva entrada
    }

    modal.style.display = "flex"; // Mostrar el modal
};

function openModalMaestro(isEdit = false, data = {}) {
    const modal = document.getElementById("modalMaestro");
    const modalTitle = document.getElementById("modal-title6");
    const form = document.getElementById("modal-form");
    
    // Configuración para edición o creación
    if (isEdit) {
        modalTitle.textContent = "Editar Maestro";
        document.getElementById("maestro-id").value = data.CODIGO;
        document.getElementById("maestro-id").readOnly  = true;
        document.getElementById("nombremaestro").value = data.DESCRIPCION;
        document.getElementById("activomaestro").checked  = data.ACTIVO;
    } else {
        modalTitle.textContent = "Crear Nuevo Maestro";
        document.getElementById("maestro-id").value = "";
        document.getElementById("maestro-id").readOnly  = false;
        document.getElementById("nombremaestro").value = "";

        document.getElementById("activomaestro").checked   = true;
        form.reset(); // Limpiar el formulario para nueva entrada
    }

    modal.style.display = "flex"; // Mostrar el modal
};

function openModalTurno(isEdit = false, data = {}) {
    const modal = document.getElementById("modalTurno");
    const modalTitle = document.getElementById("modal-title7");
    const form = document.getElementById("modal-form");
    
    // Configuración para edición o creación
    if (isEdit) {
        modalTitle.textContent = "Editar turno";
        document.getElementById("turno-id").value = data.CODIGO;
        document.getElementById("turno-id").readOnly  = true;
        document.getElementById("nombreturno").value = data.DESCRIPCION;
        document.getElementById("activoturno").checked  = data.ACTIVO;
    } else {
        modalTitle.textContent = "Crear Nuevo turno";
        document.getElementById("turno-id").value = "";
        document.getElementById("turno-id").readOnly  = false;
        document.getElementById("nombreturno").value = "";

        document.getElementById("activoturno").checked   = true;
        form.reset(); // Limpiar el formulario para nueva entrada
    }

    modal.style.display = "flex"; // Mostrar el modal
};


function openModalHorario(isEdit = false, data = {}) {
    const modal = document.getElementById("modalHorario");
    const modalTitle = document.getElementById("modal-title8");
    const form = document.getElementById("modal-form");
    
    // Configuración para edición o creación
    if (isEdit) {
        modalTitle.textContent = "Editar Horario";
        document.getElementById("horario-id").value = data.CODIGO;
        document.getElementById("horario-id").readOnly  = true;
        document.getElementById("nombrehorario").value = data.DESCRIPCION;
        document.getElementById("activohorario").checked  = data.ACTIVO;
    } else {
        modalTitle.textContent = "Crear Nuevo Horario";
        document.getElementById("horario-id").value = "";
        document.getElementById("horario-id").readOnly  = false;
        document.getElementById("nombrehorario").value = "";

        document.getElementById("activohorario").checked   = true;
        form.reset(); // Limpiar el formulario para nueva entrada
    }

    modal.style.display = "flex"; // Mostrar el modal
};

function openModalNivel(isEdit = false, data = {}) {
    const modal = document.getElementById("modalNivel");
    const modalTitle = document.getElementById("modal-title9");
    const form = document.getElementById("modal-form");
    
    // Configuración para edición o creación
    if (isEdit) {
        modalTitle.textContent = "Editar Nivel";
        document.getElementById("nivel-id").value = data.CODIGO;
        document.getElementById("nivel-id").readOnly  = true;
        document.getElementById("nombrenivel").value = data.DESCRIPCION;
        document.getElementById("activonivel").checked  = data.ACTIVO;
    } else {
        modalTitle.textContent = "Crear Nuevo Nivel";
        document.getElementById("nivel-id").value = "";
        document.getElementById("nivel-id").readOnly  = false;
        document.getElementById("nombrenivel").value = "";

        document.getElementById("activonivel").checked   = true;
        form.reset(); // Limpiar el formulario para nueva entrada
    }

    modal.style.display = "flex"; // Mostrar el modal
};

function openModalTurno(isEdit = false, data = {}) {
    const modal = document.getElementById("modalTurno");
    const modalTitle = document.getElementById("modal-title9");
    const form = document.getElementById("modal-form");
    
    // Configuración para edición o creación
    if (isEdit) {
        modalTitle.textContent = "Editar Turno";
        document.getElementById("turno-id").value = data.CODIGO;
        document.getElementById("turno-id").readOnly  = true;
        document.getElementById("nombreturno").value = data.DESCRIPCION;
        document.getElementById("activoturno").checked  = data.ACTIVO;
    } else {
        modalTitle.textContent = "Crear Nuevo Turno";
        document.getElementById("turno-id").value = "";
        document.getElementById("turno-id").readOnly  = false;
        document.getElementById("nombreturno").value = "";

        document.getElementById("activoturno").checked   = true;
        form.reset(); // Limpiar el formulario para nueva entrada
    }

    modal.style.display = "flex"; // Mostrar el modal
};


// Ocultar el modal
function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
    const modal2 = document.getElementById("modalVendedor");
    modal2.style.display = "none";
    const modal3 = document.getElementById("modalIdioma");
    modal3.style.display = "none";
    const modal4 = document.getElementById("modalEstrategia");
    modal4.style.display = "none";
    const modal5 = document.getElementById("modalFormaPago");
    modal5.style.display = "none";
    const modal6= document.getElementById("modalEstado");
    modal6.style.display = "none";
    const modal7= document.getElementById("modalMaestro");
    modal7.style.display = "none";
    const modal8= document.getElementById("modalTurno");
    modal8.style.display = "none";
    const modal9= document.getElementById("modalHorario");
    modal9.style.display = "none";
    const modal10= document.getElementById("modalNivel");
    modal10.style.display = "none";
    const modal11= document.getElementById("formulario");
    modal11.style.display = "none";
}   
async function fetchData(fechaInicio, fechaFin) {
        const session = JSON.parse(localStorage.getItem("session") || "{}");
        try {
            // Llama al endpoint con las fechas como parámetros
            const response = await fetch(url + "registros2", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fi:fechaInicio,
                    ff:fechaFin,
                    vendedor:(session.vend ?? "").toString()
                })
            });

            if (!response.ok) throw new Error('Error al obtener los datos.');
            const data = await response.json();
            // Guardar datos en localStorage para acceder desde otra página
            localStorage.setItem("tablaDatos", JSON.stringify(data));
             // Actualizar las tarjetas dinámicamente
        //actualizarTarjetas(data);

            // Genera la tabla y la inserta en la sección "datos"
            generarTabla(data);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    }

    async function fetchData3(mes, anio,sucursal,accion,tabla,secc) {
        const session = JSON.parse(localStorage.getItem("session") || "{}");
        try {
            // Llama al endpoint con las fechas como parámetros
            const response = await fetch(url + "selectRegistros", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    mes,
                    anio,
                    sucursal,accion
                })
            });

            if (!response.ok) throw new Error('Error al obtener los datos.');
            const data = await response.json();
            // Guardar datos en localStorage para acceder desde otra página
            localStorage.setItem(tabla, JSON.stringify(data));
             // Actualizar las tarjetas dinámicamente
        //actualizarTarjetas(data);

            // Genera la tabla y la inserta en la sección "datos"
            
            generarTabla3(data,tabla,secc);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    }


    async function fetchData2(fechaInicio, fechaFin) {
        const session = JSON.parse(localStorage.getItem("session") || "{}");
        try {
            // Llama al endpoint con las fechas como parámetros
            const response = await fetch(url + "registros2", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fi:fechaInicio,
                    ff:fechaFin,
                    vendedor:(session.vend ?? "").toString()
                })
            });

            if (!response.ok) throw new Error('Error al obtener los datos.');
            const data = await response.json();
            // Guardar datos en localStorage para acceder desde otra página
            localStorage.setItem("tablaDatos", JSON.stringify(data));
             // Actualizar las tarjetas dinámicamente
        
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    }


    function generarTabla(datos) {
       try {
                const tablaExistente = document.getElementById('tablaDatos'); // Identifica la tabla existente
        
                // Elimina la tabla anterior, si existe
                if (tablaExistente) {
                    tablaExistente.remove();
                }
        
                const section = document.getElementById('datos');
        
                if (!datos.length) {
                    const mensaje = document.createElement('p');
                    mensaje.textContent = 'No hay datos disponibles.';
                    mensaje.id = 'mensajeNoDatos';
                    section.appendChild(mensaje);
                    return;
                } else {
                    const mensajeNoDatos = document.getElementById('mensajeNoDatos');
                    if (mensajeNoDatos) mensajeNoDatos.remove(); // Elimina cualquier mensaje previo
                }
        
                const table = document.createElement('table');
                table.id = 'tablaDatos'; // Asigna un ID único a la tabla
                table.border = '1';
        
                // Genera el encabezado de la tabla dinámicamente
                const thead = document.createElement('thead');
                const headerRow = document.createElement('tr');
                const columnNames = {
                    "DOC_ID": "Identificador",
                    "DOC_FECHA": "Fecha Documento",
                    "NOMBRE": "Nombre",
                    // Agrega más columnas según sea necesario
                };
                
                Object.keys(datos[0]).forEach((columna) => {
                    const th = document.createElement('th');
                    th.textContent = columna;
                             // Si la columna comienza con "DOC_", la ocultamos
                            if (columna.startsWith('DOC_')) {
                                th.style.display = 'none';
                            }
                    headerRow.appendChild(th);
                });
                thead.appendChild(headerRow);
                table.appendChild(thead);
        
                // Genera el cuerpo de la tabla
                const tbody = document.createElement('tbody');
                datos.forEach((fila) => {
                    const tr = document.createElement('tr');
                    Object.entries(fila).forEach(([columna, valor]) => {
                        const td = document.createElement('td');
                        // Si la columna comienza con "DOC_", la ocultamos
                            if (columna.startsWith('DOC_')) {
                                td.style.display = 'none'; // Oculta la celda
                            }
                        // Si la columna es una fecha en formato /Date(...)/, la convertimos
                        if (typeof valor === 'string' && valor.includes('/Date(') && valor.includes(')/')) {
                            // Extraer el timestamp (sin el formato /Date() y con soporte para fechas negativas)
                            const timestamp = valor.match(/\/Date\((-?\d+)\)\//)[1]; // El -? permite capturar tanto números positivos como negativos
                            const fecha = new Date(parseInt(timestamp)); // Convierte el timestamp a una fecha
                        

                            // Formatea la fecha en el formato dd/MM/yyyy
                            const dia = fecha.getDate().toString().padStart(2, '0');
                            const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
                            const anio = fecha.getFullYear();
                            
                            // Verifica si la fecha tiene hora diferente de 00:00:00
                            if (fecha.getHours() !== 0 || fecha.getMinutes() !== 0 || fecha.getSeconds() !== 0) {
                                let horas = fecha.getHours();
                                const minutos = fecha.getMinutes().toString().padStart(2, '0');
                                const ampm = horas >= 12 ? 'PM' : 'AM';
                                horas = horas % 12 || 12; // Convierte a formato de 12 horas
                            
                                // Si hay hora, muestra fecha y hora
                                td.textContent = `${dia}/${mes}/${anio} ${horas}:${minutos} ${ampm}`;
                            } else {
                                // Si no hay hora, muestra solo la fecha
                                td.textContent = `${dia}/${mes}/${anio}`;
                            }
                            

                        } else if (columna === 'ID') {
                            // Convierte el ID en un enlace
                            const enlace = document.createElement('a');
                            enlace.href = `editar.html?id=${valor}`; // URL para editar
                            enlace.textContent = valor;
                            enlace.onclick = (event) => {
                                event.preventDefault(); // Evita el comportamiento por defecto
                                editarRegistro(valor); // Llama a la función de edición
                            };
                            td.appendChild(enlace);
                        } else {
                            td.textContent = valor;
                        }
        
                        tr.appendChild(td);
                       // console.log(td);
                    });
                    tbody.appendChild(tr);
                });
                table.appendChild(tbody);
        
                // Inserta la tabla al final de la sección
                section.appendChild(table);
            } catch (error) {
                console.error('Error al generar la tabla:', error.mensaje);
        
                // Opcional: Muestra un mensaje de error al usuario
                const section = document.getElementById('datos');
                const mensajeError = document.createElement('p');
                mensajeError.textContent = 'Ocurrió un error al generar la tabla. Por favor, inténtelo nuevamente.';
                mensajeError.style.color = 'red';
                section.appendChild(mensajeError);
            }
    }
        

    function generarTabla3(datos,tabla,secc) {
        try {
                 const tablaExistente = document.getElementById(tabla); // Identifica la tabla existente
         
                 // Elimina la tabla anterior, si existe
                 if (tablaExistente) {
                     tablaExistente.remove();
                 }
         
                 const section = document.getElementById(secc);
         
                 if (!datos.length) {
                     const mensaje = document.createElement('p');
                     mensaje.textContent = 'No hay datos disponibles.';
                     mensaje.id = 'mensajeNoDatos';
                     section.appendChild(mensaje);
                     return;
                 } else {
                     const mensajeNoDatos = document.getElementById('mensajeNoDatos');
                     if (mensajeNoDatos) mensajeNoDatos.remove(); // Elimina cualquier mensaje previo
                 }
         
                 const table = document.createElement('table');
                 table.id = tabla; // Asigna un ID único a la tabla
                 table.border = '1';
         
                 // Genera el encabezado de la tabla dinámicamente
                 const thead = document.createElement('thead');
                 const headerRow = document.createElement('tr');
                 // Mapeo para renombrar columnas
const columnNames = {
    "DOC_ID": "Identificador",
    "DOC_FECHA": "Fecha Documento",
    "NOMBRE": "Nombre",
    // Agrega más columnas según sea necesario
};

                 Object.keys(datos[0]).forEach((columna) => {
                     const th = document.createElement('th');
                     th.textContent = columna;
                     // Si la columna comienza con "DOC_", la ocultamos
    if (columna.startsWith('DOC_')) {
        th.style.display = 'none';
    }
                     headerRow.appendChild(th);
                 });
                 thead.appendChild(headerRow);
                 table.appendChild(thead);
         
                 // Genera el cuerpo de la tabla
                 const tbody = document.createElement('tbody');
                 datos.forEach((fila) => {
                     const tr = document.createElement('tr');
                     Object.entries(fila).forEach(([columna, valor]) => {
                         const td = document.createElement('td');
                         // Si la columna comienza con "DOC_", la ocultamos
                             if (columna.startsWith('DOC_')) {
                                 td.style.display = 'none'; // Oculta la celda
                             }
                         // Si la columna es una fecha en formato /Date(...)/, la convertimos
                         if (typeof valor === 'string' && valor.includes('/Date(') && valor.includes(')/')) {
                             // Extraer el timestamp (sin el formato /Date() y con soporte para fechas negativas)
                             const timestamp = valor.match(/\/Date\((-?\d+)\)\//)[1]; // El -? permite capturar tanto números positivos como negativos
                             const fecha = new Date(parseInt(timestamp)); // Convierte el timestamp a una fecha
                         
 
                             // Formatea la fecha en el formato dd/MM/yyyy
                             const dia = fecha.getDate().toString().padStart(2, '0');
                             const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
                             const anio = fecha.getFullYear();
                             
                             // Verifica si la fecha tiene hora diferente de 00:00:00
                             if (fecha.getHours() !== 0 || fecha.getMinutes() !== 0 || fecha.getSeconds() !== 0) {
                                 let horas = fecha.getHours();
                                 const minutos = fecha.getMinutes().toString().padStart(2, '0');
                                 const ampm = horas >= 12 ? 'PM' : 'AM';
                                 horas = horas % 12 || 12; // Convierte a formato de 12 horas
                             
                                 // Si hay hora, muestra fecha y hora
                                 td.textContent = `${dia}/${mes}/${anio} ${horas}:${minutos} ${ampm}`;
                             } else {
                                 // Si no hay hora, muestra solo la fecha
                                 td.textContent = `${dia}/${mes}/${anio}`;
                             }
                             
 
                         } else if (columna === 'ID') {
                             // Convierte el ID en un enlace
                             const enlace = document.createElement('a');
                             enlace.href = `editar.html?id=${valor}`; // URL para editar
                             enlace.textContent = valor;
                             enlace.onclick = (event) => {
                                 event.preventDefault(); // Evita el comportamiento por defecto
                                 editarRegistro(valor); // Llama a la función de edición
                             };
                             td.appendChild(enlace);
                         } 
                         else if (columna === 'ADJUNTO') {
                            // Convierte el ID en un enlace
                            const enlace = document.createElement('a');
                            enlace.href = `editar.html?id=${valor}`; // URL para editar
                            enlace.textContent = valor;
                            enlace.onclick = (event) => {
                                event.preventDefault(); // Evita el comportamiento por defecto
                                editarRegistro(valor); // Llama a la función de edición
                            };
                            td.appendChild(enlace);
                        }
                         else {
                             td.textContent = valor;
                         }
         
                         tr.appendChild(td);
                        // console.log(td);
                     });
                     tbody.appendChild(tr);
                 });
                 table.appendChild(tbody);
         
                 // Inserta la tabla al final de la sección
                 section.appendChild(table);
             } catch (error) {
                 console.error('Error al generar la tabla:', error.mensaje);
         
                 // Opcional: Muestra un mensaje de error al usuario
                 const section = document.getElementById(secc);
                 const mensajeError = document.createElement('p');
                 mensajeError.textContent = 'Ocurrió un error al generar la tabla. Por favor, inténtelo nuevamente.';
                 mensajeError.style.color = 'red';
                 section.appendChild(mensajeError);
             }
     }


    function showSection(sectionId) {
        document.querySelectorAll('section').forEach(section => section.style.display = 'none');
        document.getElementById(sectionId).style.display = 'block';
    }

    // Simulación de función para editar
    function editarRegistro(id) {

        const session = JSON.parse(localStorage.getItem("session") || "{}");
        if (session.userRole !="1") {
            return;
        }
        
        // Obtener la tabla 'tablaDatos' desde localStorage
    let tablaDatos = JSON.parse(localStorage.getItem("tablaDatos"));
    
    // Filtrar la tabla de datos para obtener el registro con el ID seleccionado
    let registroSeleccionado = tablaDatos.filter(item => item.ID === id);
    
    // Si encuentras el registro, puedes hacer algo con él, por ejemplo, mostrarlo en un formulario
    if (registroSeleccionado.length > 0) {
        console.log("Registro encontrado:", registroSeleccionado[0]);
        
        cargarFormulario(registroSeleccionado[0])
           // Abrir el modal
           const modal = document.getElementById("formulario");
           modal.style.display = "flex"; // Mostrar el modal
    } else {
        console.log("Registro no encontrado");
    }
    }

    function cargarDatos(fechaInicio,fechaFin) {
              if (fechaInicio && fechaFin) {
            fetchData(fechaInicio, fechaFin);
                       
        } else {
            alert('Por favor, ingrese las fechas inicial y final.');
        }
    }

    function cargarDatos3(mes,anio,sucursal,accion,tabla,secc) {
        if (mes && anio) {
      fetchData3(mes, anio,sucursal,accion,tabla,secc);
                 
  } else {
      alert('Por favor, selecione mes y año');
  }
}

    function cargarFormulario(registro) {
        // Obtener el registro con el ID correspondiente
        
        if (registro) {
            // Llenar los campos del formulario con los datos del registro
            document.getElementById("idEdit").value = registro.ID;
            document.getElementById("nombreEdit").value = registro.NOMBRE_ALUMNO;
            document.getElementById("telefonoEdit").value =
            (registro.TELEFONO_ALUMNO || "") + 
            (registro.TELEFONO_ALUMNO && registro.TELEFONO ? ' / ' : '') + 
            (registro.TELEFONO || "") + 
            ((registro.TELEFONO || registro.TELEFONO_ALUMNO) && registro.TELEFONO_TRABAJO ? ' / ' : '') + 
            (registro.TELEFONO_TRABAJO || "");
           
            // Seleccionar el estado actual del registro
            document.getElementById("estadoEdit").value = registro.ESTADO;
            document.getElementById("modalidadEdit").value = registro.MODALIDAD;
            document.getElementById("bienvenidaEdit").value = registro.USUARIO_BIENVENIDA || "";
            document.getElementById("gerenteEdit").value = registro.GERENTE || "";
            document.getElementById("maestroEdit").value = registro.MAESTRO || "";
            document.getElementById("notasEdit").value = registro.NOTAS || "";
            document.getElementById("turnoEdit").value = registro.TURNO || "";
            document.getElementById("horarioEdit").value = registro.HORARIO || "";
            document.getElementById("primerPago").value = convertirFecha(registro.PRIMER_PAGO) ||  "";
            document.getElementById("fechaPagoEdit").value =  convertirFecha(registro.FECHA_PAGO) || "";
            document.getElementById("nivelEdit").value = registro.NIVEL || "";

        }
    }

    function convertirFecha(msJsonDate) {
        if (!msJsonDate) {
        // Si msJsonDate es null, undefined o vacío, retornar una cadena vacía
        return "";
    }
        // Extraer los milisegundos de la cadena
        const timestamp = parseInt(msJsonDate.match(/\d+/)[0], 10);
        const date = new Date(timestamp);
        
        // Formatear la fecha a 'YYYY-MM-DD'
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
        const day = String(date.getDate()).padStart(2, '0');
        
        return `${year}-${month}-${day}`;
    }

    document.getElementById('archivo').addEventListener('change', function(event) {
        const archivo = event.target.files[0];  // Obtener el archivo seleccionado
    
        // Asegúrate de que se ha seleccionado un archivo
        if (archivo) {
          // Convertir el archivo a base64 cuando se seleccione
          convertirArchivoABase64(archivo).then(base64 => {
            // Asigna el archivo base64 a la variable global DOC_DUI
            DOC_DUI =  base64.replace(/^data:.+;base64,/, '');
           // console.log("Archivo en base64:", DOC_DUI);  // Puedes ver el resultado en la consola
          }).catch(error => {
            console.error('Error al convertir el archivo a base64:', error);
            DOC_DUI=null;
          });
        }
      });

      
      document.getElementById('archivo2').addEventListener('change', function(event) {
        const archivo = event.target.files[0];  // Obtener el archivo seleccionado
    
        // Asegúrate de que se ha seleccionado un archivo
        if (archivo) {
          // Convertir el archivo a base64 cuando se seleccione
          convertirArchivoABase64(archivo).then(base64 => {
            // Asigna el archivo base64 a la variable global DOC_DUI
            DOC_COMPROBANTE =  base64.replace(/^data:.+;base64,/, '');
           // console.log("Archivo en base64:", DOC_COMPROBANTE);  // Puedes ver el resultado en la consola
          }).catch(error => {
            //console.error('Error al convertir el archivo a base64:', error);
            DOC_COMPROBANTE=null;
          });
        }
      });

      document.getElementById('archivo3').addEventListener('change', function(event) {
        const archivo = event.target.files[0];  // Obtener el archivo seleccionado
    
        // Asegúrate de que se ha seleccionado un archivo
        if (archivo) {
          // Convertir el archivo a base64 cuando se seleccione
          convertirArchivoABase64(archivo).then(base64 => {
            // Asigna el archivo base64 a la variable global DOC_DUI
            DOC_INCRIPCION =  base64.replace(/^data:.+;base64,/, '');
           // console.log("Archivo en base64:", DOC_INCRIPCION);  // Puedes ver el resultado en la consola
          }).catch(error => {
            console.error('Error al convertir el archivo a base64:', error);
            DOC_INCRIPCION =null;
          });
        }
      });

    
//document.addEventListener('vendedores-1', cargarVendedores);
//document.addEventListener('sucursal-reg', cargarSucursal);
//document.addEventListener('idioma', cargarIdioma);
//document.addEventListener('tbody', cargarSuc);


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

