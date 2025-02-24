/**
 * EN ESTE JS GENERAMOS LOS GRAFICOS DE LA PAGINA ADMINISTRADOR.
 * LOS GRAFICOS SON:
 * - CVI (Compras, Ventas e Intercambios)
 * - Ganancias y Perdidas
 */
// Inicialización de los gráficos
let domcvi = document.getElementById('chart-container-cvi');
let myChartcvi = echarts.init(domcvi, null, {
    renderer: 'canvas',
    useDirtyRect: false
});

let domtotal = document.getElementById('chart-container-totales');
let myCharttotal = echarts.init(domtotal, null, {
    renderer: 'canvas',
    useDirtyRect: false
});

// Variable global para almacenar la última data (se usará para actualizar el pie)
window.ultimaDataCVI = { compras: [], ventas: [], intercambios: [] };

/**
 * Actualiza el gráfico de transacciones (Compras, Ventas e Intercambios)
 */
function updateChartCVI() {
    // Obtener datos de las transacciones
    const compraPromise = $.get("/transaction/Compra").fail(err => alert(err));
    const ventaPromise = $.get("/transaction/Venta").fail(err => alert(err));
    const intercambioPromise = $.get("/transaction/Intercambio").fail(err => alert(err));

    Promise.all([compraPromise, ventaPromise, intercambioPromise])
        .then(([compras, ventas, intercambios]) => {
            // Contar transacciones por fecha y tipo
            const conteoPorFecha = {};

            const contarTransacciones = (transacciones, tipo) => {
                transacciones.forEach(({ date }) => {
                    const fecha = date.split('T')[0];
                    if (!conteoPorFecha[fecha]) {
                        conteoPorFecha[fecha] = { Compra: 0, Venta: 0, Intercambio: 0 };
                    }
                    conteoPorFecha[fecha][tipo] += 1;
                });
            };

            contarTransacciones(compras, 'Compra');
            contarTransacciones(ventas, 'Venta');
            contarTransacciones(intercambios, 'Intercambio');

            // Ordenar fechas y extraer datos para cada serie
            const fechas = Object.keys(conteoPorFecha).sort();
            const datosLineas = {
                compras: fechas.map(f => conteoPorFecha[f].Compra),
                ventas: fechas.map(f => conteoPorFecha[f].Venta),
                intercambios: fechas.map(f => conteoPorFecha[f].Intercambio)
            };

            // Almacenamos los datos globalmente para usar en el updateAxisPointer del gráfico pie
            window.ultimaDataCVI = datosLineas;

            // Configuración del gráfico
            let optioncvi = {
                legend: { data: ['Compras', 'Ventas', 'Intercambios'] },
                tooltip: { trigger: 'axis' },
                xAxis: { type: 'category', data: fechas },
                yAxis: { type: 'value', name: 'Cantidad' },
                grid: { top: '55%' },
                dataZoom: [
                    {
                        type: 'slider',
                        xAxisIndex: 0,
                        start: 0,
                        end: 100,
                        textStyle: { color: '#8392A5' }
                    },
                    { type: 'inside', xAxisIndex: 0 }
                ],
                series: [
                    {
                        name: 'Compras',
                        type: 'line',
                        data: datosLineas.compras,
                        smooth: true
                    },
                    {
                        name: 'Ventas',
                        type: 'line',
                        data: datosLineas.ventas,
                        smooth: true
                    },
                    {
                        name: 'Intercambios',
                        type: 'line',
                        data: datosLineas.intercambios,
                        smooth: true
                    },
                    {
                        type: 'pie',
                        id: 'pie',
                        radius: '30%',
                        center: ['50%', '25%'],
                        data: [
                            { name: 'Compras', value: datosLineas.compras[0] || 0 },
                            { name: 'Ventas', value: datosLineas.ventas[0] || 0 },
                            { name: 'Intercambios', value: datosLineas.intercambios[0] || 0 }
                        ],
                        label: { formatter: '{b}: {c} ({d}%)' }
                    }
                ]
            };

            // Actualizamos el gráfico CVI
            myChartcvi.setOption(optioncvi, true);
        })
        .catch(error => console.error("Error al actualizar gráfico CVI:", error));
}

/**
 * Actualiza el gráfico de Balance Financiero (Ganancias y Pérdidas)
 */
function updateChartTotales() {
    const gananciasPromise = $.get("/ganancias").fail(err => alert(err));
    const perdidasPromise = $.get("/perdidas").fail(err => alert(err));

    Promise.all([gananciasPromise, perdidasPromise])
        .then(([gananciasGet, perdidasGet]) => {
            const gananciasTotales = gananciasGet;
            const perdidasTotales = perdidasGet;
            const maxValue = Math.max(gananciasTotales, perdidasTotales);

            let optiontotal = {
                title: {
                    text: 'Balance Financiero',
                    left: 'center',
                    textStyle: { fontSize: 18, fontWeight: 'bold', color: 'white' }
                },
                xAxis: {
                    type: 'value',
                    min: -maxValue,
                    max: maxValue,
                    axisLabel: { formatter: value => `€${value.toLocaleString()}` },
                    splitLine: { show: true }
                },
                yAxis: {
                    type: 'category',
                    data: ['Pérdidas', '', 'Ganancias'],
                    inverse: true,
                    axisTick: { show: false }
                },
                series: [
                    {
                        type: 'bar',
                        barWidth: 25,
                        data: [
                            {
                                value: -perdidasTotales,
                                itemStyle: { color: 'red', borderColor: 'white', borderWidth: 2 },
                                label: {
                                    show: true,
                                    position: 'right',
                                    formatter: params =>
                                        `{shadowStyle|-${Math.abs(params.value).toLocaleString()}€}`,
                                    rich: {
                                        shadowStyle: {
                                            fontFamily: 'sans-serif',
                                            fontWeight: 'bold',
                                            fontSize: 12,
                                            color: 'black',
                                            textBorderColor: 'white',
                                            textBorderWidth: 2
                                        }
                                    }
                                }
                            },
                            { value: 0, itemStyle: { opacity: 0 } },
                            {
                                value: gananciasTotales,
                                itemStyle: { color: 'green', borderColor: 'white', borderWidth: 2 },
                                label: {
                                    show: true,
                                    position: 'left',
                                    formatter: params =>
                                        `{shadowStyle|${Math.abs(params.value).toLocaleString()}€}`,
                                    rich: {
                                        shadowStyle: {
                                            fontFamily: 'sans-serif',
                                            fontWeight: 'bold',
                                            fontSize: 12,
                                            color: 'black',
                                            textBorderColor: 'white',
                                            textBorderWidth: 2
                                        }
                                    }
                                }
                            }
                        ]
                    }
                ],
                grid: { left: '20%', right: '20%', containLabel: true },
                legend: { show: false },
                animationDuration: 0,
                animationDurationUpdate: 3000,
                animationEasing: 'linear',
                animationEasingUpdate: 'linear'
            };

            myCharttotal.setOption(optiontotal, true);
        })
        .catch(error => console.error("Error al actualizar gráfico Totales:", error));
}

/**
 * Función que actualiza ambos gráficos
 */
function updateCharts() {
    updateChartCVI();
    updateChartTotales();
}

// Actualizamos el gráfico circular (pie) al interactuar con el eje
// Se configura una única vez para evitar duplicados
myChartcvi.off('updateAxisPointer');
myChartcvi.on('updateAxisPointer', event => {
    const axisInfo = event.axesInfo && event.axesInfo[0];
    if (axisInfo && typeof axisInfo.value !== 'undefined') {
        const index = axisInfo.value;
        const { compras, ventas, intercambios } = window.ultimaDataCVI;
        myChartcvi.setOption({
            series: [{
                id: 'pie',
                data: [
                    { name: 'Compras', value: compras[index] || 0 },
                    { name: 'Ventas', value: ventas[index] || 0 },
                    { name: 'Intercambios', value: intercambios[index] || 0 }
                ]
            }]
        });
    }
});

// Llamamos a la función de actualización al cargar la página
updateCharts();

// Actualizamos los gráficos cada 5 segundos (5000 ms)
setInterval(updateCharts, 5000);

// Redimensionar los gráficos al cambiar el tamaño de la ventana
window.addEventListener('resize', () => {
    myCharttotal.resize();
    myChartcvi.resize();
});
