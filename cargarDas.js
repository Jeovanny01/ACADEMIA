const url = "https://apitest.grupocarosa.com/ApiDatos/"
document.addEventListener("DOMContentLoaded", () => {
    cargarDatos2(document.getElementById('startDate').value,
    document.getElementById('endDate').value) 
    actualizar();
});
function actualizar(){
    const data = JSON.parse(localStorage.getItem("tablaDatos")) || [];

    // Actualizar las tarjetas del dashboard
    actualizarTarjetas(data);

        // Procesar datos para el gráfico
    const conteoPorVendedor = procesarDatosParaGrafico(data);
        // Crear el gráfico dinámico
    crearGraficoPie(conteoPorVendedor);

    const datosAgrupados = procesarDatosPorDia(data);

    // Crear gráfico de línea
    crearGraficoLinea(datosAgrupados);  

    const conteo = procesarDatosParaGraficoBarra(data);
    // Crear el gráfico dinámico
    crearGraficoBarrasIdiomas(conteo);
} 

function cargarDatos2(fechaInicio,fechaFin) {
    if (fechaInicio && fechaFin) {
        fetchData2(fechaInicio, fechaFin)
        .then(() => {
                actualizar();
        })
        .catch((error) => {
            console.error("Error al cargar datos:", error);
        });
    
    actualizar;
 
} else {
  alert('Por favor, ingrese las fechas inicial y final.');
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
function actualizarTarjetas(data) {
    // Obtener el contenedor de tarjetas
    const container = document.querySelector('.card-container');
    if (!container) {
        console.error('No se encontró el contenedor de tarjetas.');
        return;
    }

    // Calcular totales para cada categoría
    const totales = {
        total: data.length,
        enEspera: data.filter(item => item.ESTADO == 1).length,
        nuevoIngreso: data.filter(item => item.ESTADO == 2).length,
        ingresoExento: data.filter(item => item.ESTADO == 3).length,
        pendienteOrientacion: data.filter(item => item.ESTADO == 5).length,
        pendienteExamen: data.filter(item => item.ESTADO == 6).length,
        devolucion: data.filter(item => item.ESTADO == 4).length
    };

    // Actualizar contenido de las tarjetas
    container.innerHTML = `
        <div class="card bg-info text-white">
            <div class="card-body">
                <h5>Total</h5>
                <h3>${totales.total}</h3>
            </div>
        </div>
        <div class="card bg-secondary text-white">
            <div class="card-body">
                <h5>En espera</h5>
                <h3>${totales.enEspera}</h3>
            </div>
        </div>
        <div class="card bg-success text-white">
            <div class="card-body">
                <h5>Nuevo ingreso</h5>
                <h3>${totales.nuevoIngreso}</h3>
            </div>
        </div>
        <div class="card bg-warning text-dark">
            <div class="card-body">
                <h5>Ingreso exento</h5>
                <h3>${totales.ingresoExento}</h3>
            </div>
        </div>
        <div class="card bg-primary text-white">
            <div class="card-body">
                <h5>Pendiente de orientación</h5>
                <h3>${totales.pendienteOrientacion}</h3>
            </div>
        </div>
        <div class="card bg-dark text-white">
            <div class="card-body">
                <h5>Pendiente de examen</h5>
                <h3>${totales.pendienteExamen}</h3>
            </div>
        </div>
        <div class="card bg-danger text-white">
            <div class="card-body">
                <h5>Devolución</h5>
                <h3>${totales.devolucion}</h3>
            </div>
        </div>
    `;
}


function procesarDatosParaGrafico(data) {
    // Agrupar y contar registros por nombre del vendedor
    const conteo = {};

    data.forEach(item => {
        const vendedor = item['NOMBRE VENDEDOR']; // Asegúrate de que el nombre coincida con tu tabla
        if (vendedor) {
            conteo[vendedor] = (conteo[vendedor] || 0) + 1;
        }
    });

    return conteo;
}
function procesarDatosParaGraficoBarra(data) {
    // Agrupar y contar registros por nombre del vendedor
    const conteo = {};

    data.forEach(item => {
        const vendedor = item['NOMBRE IDIOMA']; // Asegúrate de que el nombre coincida con tu tabla
        if (vendedor) {
            conteo[vendedor] = (conteo[vendedor] || 0) + 1;
        }
    });

    return conteo;
}

function crearGraficoPie(conteo) {
    const labels = Object.keys(conteo); // Nombres de los vendedores
    const valores = Object.values(conteo); // Cantidad de registros por vendedor
    const total = valores.reduce((sum, val) => sum + val, 0); // Total de registros

    const lineCanvas = document.getElementById('pieChart');
    const lineCtx = lineCanvas.getContext('2d');

    if (lineCanvas.chartInstance) {
        lineCanvas.chartInstance.destroy();
    }



    if (!lineCtx) {
        lineCtx.error('No se encontró el contenedor de pieChart.');
        return;
    }

    lineCanvas.chartInstance  =    new Chart(lineCtx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: valores,
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
                    '#FF9F40', '#8E44AD', '#3498DB', '#E74C3C', '#2ECC71',
                    '#F39C12', '#C0392B'
                ],
                hoverOffset: 4
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: true,
                    position: 'right'
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            const valor = tooltipItem.raw;
                            const porcentaje = ((valor / total) * 100).toFixed(2);
                            return `${labels[tooltipItem.dataIndex]}: ${valor} (${porcentaje}%)`;
                        }
                    }
                },
                // Etiquetas permanentes sobre el gráfico
                datalabels: {
                    color: '#fff', // Color del texto
                    anchor: 'end', // Ubicación de la etiqueta
                    align: 'start', // Alineación del texto
                    offset: 10, // Distancia desde el borde
                    font: {
                        weight: 'bold',
                        size: 14 // Tamaño de la fuente
                    },
                    formatter: (value, context) => {
                        // Calcular porcentaje
                        const porcentaje = ((value / total) * 100).toFixed(2);
                        return `${porcentaje}%`; // Mostrar porcentaje
                    }
                }
            }
        },
        plugins: [ChartDataLabels] // Habilitar el plugin de etiquetas permanentes
    });
}

function crearGraficoBarrasIdiomas(conteo) {
    const labels = Object.keys(conteo); // Idiomas como etiquetas
    const valores = Object.values(conteo); // Cantidad emitida por idioma
    const total = valores.reduce((sum, val) => sum + val, 0); // Total de valores

    const lineCanvas = document.getElementById('barChart');
    const lineCtx = lineCanvas.getContext('2d');

    if (lineCanvas.chartInstance) {
        lineCanvas.chartInstance.destroy();
    }

    if (!lineCtx) {
        lineCtx.error('No se encontró el contenedor de pieChart.');
        return;
    }

    lineCanvas.chartInstance  =    new Chart(lineCtx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Cantidad Emitida',
                data: valores,
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
                    '#FF9F40', '#8E44AD', '#3498DB', '#E74C3C', '#2ECC71',
                    '#F39C12', '#C0392B'
                ],
                borderColor: '#000000', // Borde negro para todas las barras
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Idiomas',
                        font: {
                            size: 14
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Cantidad Emitida',
                        font: {
                            size: 14
                        }
                    },
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: false // No mostrar leyenda
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            const valor = tooltipItem.raw;
                            const porcentaje = ((valor / total) * 100).toFixed(2);
                            return `${labels[tooltipItem.dataIndex]}: ${valor} (${porcentaje}%)`;
                        }
                    }
                },
                datalabels: {
                    color: '#000', // Color del texto sobre las barras
                    anchor: 'end', // Ubicación de la etiqueta
                    align: 'start', // Alineación del texto
                    font: {
                        weight: 'bold',
                        size: 12
                    },
                    formatter: (value, context) => {
                        const porcentaje = ((value / total) * 100).toFixed(2);
                        return `${porcentaje}%`; // Mostrar porcentaje sobre las barras
                    }
                }
            }
        },
        plugins: [ChartDataLabels] // Habilitar el plugin de etiquetas
    });
}


// Agrupar datos por día
function procesarDatosPorDia(data) {
    const agrupados = {};

    data.forEach(item => {
        // Extraer el timestamp de la fecha '/Date(1735928693377)/'
       // Extraer el timestamp de la fecha '/Date(1735928693377)/'
const timestamp = item['FECHA'].match(/\/Date\((\d+)\)\//);

        if (timestamp && timestamp[1]) {
            const fechaObj = new Date(parseInt(timestamp[1]));
            
            // Formatear la fecha en 'dd/MM/yyyy'
            const dia = String(fechaObj.getDate()).padStart(2, '0'); // Día con dos dígitos
            const mes = String(fechaObj.getMonth() + 1).padStart(2, '0'); // Mes con dos dígitos
            const anio = fechaObj.getFullYear(); // Año completo
            const fecha = `${dia}/${mes}/${anio}`; // Formato 'dd/MM/yyyy'

            // Incrementar el conteo por día
            agrupados[fecha] = (agrupados[fecha] || 0) + 1; // Cuenta transacciones por fecha
        }
    });

    // Ordenar las fechas
    const fechasOrdenadas = Object.keys(agrupados).sort();
    const valores = fechasOrdenadas.map(fecha => agrupados[fecha]);

    return { fechas: fechasOrdenadas, valores: valores };
}

// Crear gráfico de línea
function crearGraficoLinea(datos) {
   
    const lineCanvas = document.getElementById('chart');
    const lineCtx = lineCanvas.getContext('2d');

    if (lineCanvas.chartInstance) {
        lineCanvas.chartInstance.destroy();
    }

    if (!lineCtx) {
        lineCtx.error('No se encontró el contenedor de pieChart.');
        return;
    }

    lineCanvas.chartInstance  =    new Chart(lineCtx, {
        type: 'line',
        data: {
            labels: datos.fechas, // Fechas como etiquetas
            datasets: [{
                label: 'Transacciones Diarias',
                data: datos.valores, // Conteo de transacciones
                borderColor: 'blue',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: true,
                tension: 0.1 // Suavizado opcional
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Fecha'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Transacciones'
                    },
                    beginAtZero: true
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return `Transacciones: ${tooltipItem.raw}`;
                        }
                    }
                }
            }
        }
    });
}