
document.addEventListener("DOMContentLoaded", () => {
    // Leer datos del localStorage
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
});

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

function crearGraficoPie(conteo) {
    const labels = Object.keys(conteo); // Nombres de los vendedores
    const valores = Object.values(conteo); // Cantidad de registros por vendedor
    const total = valores.reduce((sum, val) => sum + val, 0); // Total de registros

    const pieCtx = document.getElementById('pieChart').getContext('2d');
    if (!pieCtx) {
        pieCtx.error('No se encontró el contenedor de pieChart.');
        return;
    }

    new Chart(pieCtx, {
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
    const ctx = document.getElementById('chart').getContext('2d');

    if (!ctx) {
        ctx.error('No se encontró el contenedor de chart.');
        return;
    }
    new Chart(ctx, {
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