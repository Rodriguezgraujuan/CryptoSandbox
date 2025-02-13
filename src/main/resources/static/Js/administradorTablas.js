let domcvi = document.getElementById('chart-container-cvi');
let myChartcvi = echarts.init(domcvi, null, {
    renderer: 'canvas',
    useDirtyRect: false
});
let optioncvi;

// Obtener datos de Compra, Venta e Intercambio
const compraPromise = $.get("/transaction/Compra").fail(err => alert(err));
const ventaPromise = $.get("/transaction/Venta").fail(err => alert(err));
const intercambioPromise = $.get("/transaction/Intercambio").fail(err => alert(err));

Promise.all([compraPromise, ventaPromise, intercambioPromise])
    .then(([compras, ventas, intercambios]) => {
        // Objeto para contar transacciones por fecha y tipo
        const conteoPorFecha = {};

        // Función para contar transacciones
        const contarTransacciones = (transacciones, tipo) => {
            transacciones.forEach(({ date }) => {
                const fecha = date.split('T')[0];
                if (!conteoPorFecha[fecha]) {
                    conteoPorFecha[fecha] = {
                        Compra: 0,
                        Venta: 0,
                        Intercambio: 0
                    };
                }
                conteoPorFecha[fecha][tipo] += 1; // Contar +1 por transacción
            });
        };

        // Procesar cada tipo de transacción
        contarTransacciones(compras, 'Compra');
        contarTransacciones(ventas, 'Venta');
        contarTransacciones(intercambios, 'Intercambio');

        // Ordenar fechas y extraer datos
        const fechas = Object.keys(conteoPorFecha).sort();
        const datosLineas = {
            compras: fechas.map(f => conteoPorFecha[f].Compra),
            ventas: fechas.map(f => conteoPorFecha[f].Venta),
            intercambios: fechas.map(f => conteoPorFecha[f].Intercambio)
        };

        // Configuración del gráfico
        optioncvi = {
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
                    textStyle: {
                        color: '#8392A5'
                    }
                },
                {
                    type: 'inside',
                    xAxisIndex: 0
                }
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

        // Actualizar el gráfico circular al interactuar
        myChartcvi.on('updateAxisPointer', event => {
            const index = event.axesInfo[0]?.value;
            if (index !== undefined) {
                myChartcvi.setOption({
                    series: [{
                        id: 'pie',
                        data: [
                            { name: 'Compras', value: datosLineas.compras[index] || 0 },
                            { name: 'Ventas', value: datosLineas.ventas[index] || 0 },
                            { name: 'Intercambios', value: datosLineas.intercambios[index] || 0 }
                        ]
                    }]
                });
            }
        });

        myChartcvi.setOption(optioncvi);
    });
// -------------------------------------------
let domtotal = document.getElementById('chart-container-totales');
let myCharttotal = echarts.init(domtotal, null, {
    renderer: 'canvas',
    useDirtyRect: false
});

let gananciasTotales = 0;
let perdidasTotales = 0;

// Obtener datos de ganancias y pérdidas
let gananciasPromise = new Promise((resolve, reject) => {
    $.get("/ganancias", (data) => resolve(data)).fail((error) => {
        alert(error);
        reject(error);
    });
});

let perdidasPromise = new Promise((resolve, reject) => {
    $.get("/perdidas", (data) => resolve(data)).fail((error) => {
        alert(error);
        reject(error);
    });
});

Promise.all([gananciasPromise, perdidasPromise]).then(([gananciasGet, perdidasGet]) => {
    gananciasTotales = gananciasGet;
    perdidasTotales = perdidasGet;

    const maxValue = Math.max(gananciasTotales, perdidasTotales);

    // Configurar el gráfico
    optiontotal = {
        title: {
            text: 'Balance Financiero',
            left: 'center',
            textStyle: {
                fontSize: 18,
                fontWeight: 'bold',
                color: 'white'
            }
        },
        xAxis: {
            type: 'value',
            min: -maxValue,
            max: maxValue,
            axisLabel: {
                formatter: (value) => `€${value.toLocaleString()}`
            },
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
                            formatter: (params) => `{shadowStyle|-${Math.abs(params.value).toLocaleString()}€}`,
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
                            formatter: (params) => `{shadowStyle|${Math.abs(params.value).toLocaleString()}€}`,
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
        grid: {
            left: '20%',
            right: '20%',
            containLabel: true
        },
        legend: { show: false },
        animationDuration: 0,
        animationDurationUpdate: 3000,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear'
    };

    myCharttotal.setOption(optiontotal);
    window.addEventListener('resize', () => {
        myCharttotal.resize();
        myChartcvi.resize();
    });
}).catch(error => {
    console.error("Error al cargar los datos:", error);
});

