// -------------------------------------------
// 1. Configuración y verificación del día actual
const todayDate = new Date().toISOString().split('T')[0];
let storedDate = localStorage.getItem('currentDay');

// Si el día almacenado es distinto al actual, reiniciamos los contadores
if (storedDate !== todayDate) {
    localStorage.setItem('currentDay', todayDate);
    localStorage.setItem('gananciasDiarias', '0');
    localStorage.setItem('perdidasDiarias', '0');
}

let gananciasDiarias = Number(localStorage.getItem('gananciasDiarias'));
let perdidasDiarias = Number(localStorage.getItem('perdidasDiarias'));

// 2. Inicialización de la gráfica de ECharts
const domdaily = document.getElementById('chart-container-estadisticas');
const myChartdaily = echarts.init(domdaily, null, {
    renderer: 'canvas',
    useDirtyRect: false
});

// Función para actualizar el gráfico con los datos diarios actuales
function updateChart() {
    // Se calcula el valor máximo para configurar el rango del eje X
    const maxValue = Math.max(gananciasDiarias, perdidasDiarias);

    const optiondaily = {
        title: {
            text: 'Balance Financiero Diario',
            subtext: todayDate,
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
                        value: -perdidasDiarias,
                        itemStyle: { color: 'red', borderColor: 'white', borderWidth: 2 },
                        label: {
                            show: true,
                            position: 'right',
                            formatter: (params) =>
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
                        value: gananciasDiarias,
                        itemStyle: { color: 'green', borderColor: 'white', borderWidth: 2 },
                        label: {
                            show: true,
                            position: 'left',
                            formatter: (params) =>
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

    myChartdaily.setOption(optiondaily);
}

// 3. Función para consultar nuevos datos y actualizar datos diarios
function updateDailyData() {
    // Se asume que cada consulta devuelve el valor total actual (no el incremento)
    $.get("/ganancias", function(data) {
        const totalGanancias = Number(data) || 0;
        if (totalGanancias !== gananciasDiarias) {
            gananciasDiarias = totalGanancias;
            localStorage.setItem('gananciasDiarias', gananciasDiarias);
            updateChart();
        }
    }).fail(function(error) {
        console.error("Error al obtener ganancias:", error);
    });

    $.get("/perdidas", function(data) {
        const totalPerdidas = Number(data) || 0;
        if (totalPerdidas !== perdidasDiarias) {
            perdidasDiarias = totalPerdidas;
            localStorage.setItem('perdidasDiarias', perdidasDiarias);
            updateChart();
        }
    }).fail(function(error) {
        console.error("Error al obtener pérdidas:", error);
    });
}

// 4. Inicializamos el gráfico y gestionamos el redimensionado
updateChart();
window.addEventListener('resize', () => {
    myChartdaily.resize();
});

// 5. Intervalo para consultar datos y verificar cambio de día cada 10 segundos
setInterval(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    if (currentDate !== localStorage.getItem('currentDay')) {
        // Ha cambiado el día: se reinician los contadores y se actualiza la fecha en localStorage
        localStorage.setItem('currentDay', currentDate);
        gananciasDiarias = 0;
        perdidasDiarias = 0;
        localStorage.setItem('gananciasDiarias', '0');
        localStorage.setItem('perdidasDiarias', '0');
        updateChart();
    } else {
        // Se consulta la API para ver si hay nuevos datos
        updateDailyData();
    }
}, 10000);
