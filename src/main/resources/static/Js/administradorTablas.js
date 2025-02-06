var domcvi = document.getElementById('chart-container-cvi');
var myChartcvi = echarts.init(domcvi, null, {
    renderer: 'canvas',
    useDirtyRect: false
});
var app = {};

var optioncvi;

setTimeout(function () {
    optioncvi = {
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
                ['Intercambios', 10, 20, 15, 33, 40],
                ['Ventas', 15, 10, 20, 30, 40],
                ['Compras', 20, 15, 78, 22, 10]
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
    myChartcvi.setOption(optioncvi);
});


// -------------------------------------------
var domtotal = document.getElementById('chart-container-totales');
var myCharttotal = echarts.init(domtotal, null, {
    renderer: 'canvas',
    useDirtyRect: false
});

// Definir ganancias y pérdidas totales
const gananciasTotales = Math.round(Math.random() * 50000000);
const perdidasTotales = Math.round(Math.random() * 500000000);
const maxValue = Math.max(gananciasTotales, perdidasTotales);

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
        data: ['Pérdidas', '', 'Ganancias'], // Espacio vacío entre barras
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
                        position: 'right', // Valores de pérdidas a la derecha
                        formatter: (params) => `{shadowStyle|-${Math.abs(params.value).toLocaleString()}€}`,
                        rich: {
                            shadowStyle: {
                                fontFamily: 'sans-serif',
                                fontWeight: 'bold',
                                fontSize: 12, // 3rem
                                color: 'black',
                                textBorderColor: 'white', // Simula el borde blanco
                                textBorderWidth: 2 // Tamaño del borde
                            }
                        }
                    }
                },
                { value: 0, itemStyle: { opacity: 0 } }, // Espacio vacío
                { 
                    value: gananciasTotales, 
                    itemStyle: { color: 'green', borderColor: 'white', borderWidth: 2 },
                    label: {
                        show: true,
                        position: 'left', // Valores de ganancias a la izquierda
                        formatter: (params) => `{shadowStyle|${Math.abs(params.value).toLocaleString()}€}`,
                        rich: {
                            shadowStyle: {
                                fontFamily: 'sans-serif',
                                fontWeight: 'bold',
                                fontSize: 12, // 3rem
                                color: 'black',
                                textBorderColor: 'white', // Simula el borde blanco
                                textBorderWidth: 2 // Tamaño del borde
                            }
                        }
                    }
                }
            ]
        }
    ],
    grid: {
        left: '20%', // Más espacio a la izquierda para los valores de ganancias
        right: '20%', // Más espacio a la derecha para los valores de pérdidas
        containLabel: true
    },
    legend: { show: false },
    animationDuration: 0,
    animationDurationUpdate: 3000,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear'
};

myCharttotal.setOption(optiontotal);

// Ajustar tamaño al cambiar la ventana
window.addEventListener('resize', () => {
    myCharttotal.resize();
    myChartcvi.resize();
});

