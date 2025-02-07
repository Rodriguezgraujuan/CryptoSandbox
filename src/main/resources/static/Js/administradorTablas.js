let domcvi = document.getElementById('chart-container-cvi');
let myChartcvi = echarts.init(domcvi, null, {
    renderer: 'canvas',
    useDirtyRect: false
});
let app = {};
let optioncvi;
let ventaPromise = new Promise((resolve, reject) => {
    $.get("/transaction/Venta", (data) => {
        resolve(data);
        console.log(data)}
    ).fail((error) => {
        alert(error);
        reject(error);
    });
});
let intercambioPromise = new Promise((resolve, reject) => {
    $.get("/transaction/Intercambio", (data) => {
        resolve(data);
        console.log(data)}
    ).fail((error) => {
        alert(error);
        reject(error);
    });
});

let compraPromise = new Promise((resolve, reject) => {
    $.get("/transaction/Compra", (data) => {
        resolve(data)
        console.log(data)}
    ).fail((error) => {
        alert(error);
        reject(error);
    });
});
        setTimeout(function () {
            let optioncvi = {
                legend: {},
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                dataset: {
                    source: [
                        ['Producto', '31/1/2025', '1/2/2025', '2/2/2025', '3/2/2025', '4/2/2025'],
                        ['Intercambios', 40,30,20,10,5],
                        ['Ventas', 20,15,10,5,2],
                        ['Compras', 15,10,5,2,1]
                    ]
                },
                xAxis: { type: 'category' },
                yAxis: { gridIndex: 0 },
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
                        type: 'line',
                        smooth: true,
                        seriesLayoutBy: 'row',
                        emphasis: { focus: 'series' }
                    },
                    {
                        type: 'line',
                        smooth: true,
                        seriesLayoutBy: 'row',
                        emphasis: { focus: 'series' }
                    },
                    {
                        type: 'line',
                        smooth: true,
                        seriesLayoutBy: 'row',
                        emphasis: { focus: 'series' }
                    },
                    {
                        type: 'pie',
                        id: 'pie',
                        radius: '30%',
                        center: ['50%', '25%'],
                        emphasis: {
                            focus: 'self'
                        },
                        label: {
                            formatter: '{b}: {@Intercambios} ({d}%)'
                        },
                        encode: {
                            itemName: 'Producto',
                            value: 'Intercambios',
                            tooltip: 'Intercambios'
                        }
                    }
                ]
            };
            myChartcvi.on('updateAxisPointer', function (event) {
                const xAxisInfo = event.axesInfo[0];
                if (xAxisInfo) {
                    const dimension = xAxisInfo.value + 1;
                    myChartcvi.setOption({
                        series: {
                            id: 'pie',
                            label: {
                                formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                            },
                            encode: {
                                value: dimension,
                                tooltip: dimension
                            }
                        }
                    });
                }
            });
            myChartcvi.setOption(optioncvi);});



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



