// -------------------------------------------
// 1. Configuración y verificación del día actual
const todayDate = new Date().toISOString().split('T')[0];
let storedDate = localStorage.getItem('currentDay');

// Si el día almacenado es distinto al actual, reiniciamos los contadores
if (storedDate !== todayDate) {
    localStorage.setItem('currentDay', todayDate);
    localStorage.setItem('gananciasDiarias', '0');
    localStorage.setItem('perdidasDiarias', '0');
    // Eliminar valores iniciales anteriores
    localStorage.removeItem('initialGanancias');
    localStorage.removeItem('initialPerdidas');
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
    // Obtener valores iniciales del día
    const initialGanancias = Number(localStorage.getItem('initialGanancias')) || 0;
    const initialPerdidas = Number(localStorage.getItem('initialPerdidas')) || 0;

    // Actualizar ganancias diarias
    $.get("/ganancias", function(data) {
        const totalGanancias = Number(data) || 0;
        const dailyGanancias = totalGanancias - initialGanancias;
        if (dailyGanancias !== gananciasDiarias) {
            gananciasDiarias = dailyGanancias;
            localStorage.setItem('gananciasDiarias', gananciasDiarias.toString());
            updateChart();
        }
    }).fail(function(error) {
        console.error("Error al obtener ganancias:", error);
    });

    // Actualizar pérdidas diarias
    $.get("/perdidas", function(data) {
        const totalPerdidas = Number(data) || 0;
        const dailyPerdidas = totalPerdidas - initialPerdidas;
        if (dailyPerdidas !== perdidasDiarias) {
            perdidasDiarias = dailyPerdidas;
            localStorage.setItem('perdidasDiarias', perdidasDiarias.toString());
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
    const storedDate = localStorage.getItem('currentDay');

    if (currentDate !== storedDate) {
        // Nuevo día: obtener y guardar valores iniciales
        Promise.all([
            $.get("/ganancias"),
            $.get("/perdidas")
        ]).then(([gananciasData, perdidasData]) => {
            const initialGanancias = Number(gananciasData) || 0;
            const initialPerdidas = Number(perdidasData) || 0;

            localStorage.setItem('currentDay', currentDate);
            localStorage.setItem('initialGanancias', initialGanancias.toString());
            localStorage.setItem('initialPerdidas', initialPerdidas.toString());

            // Restablecer contadores diarios
            localStorage.setItem('gananciasDiarias', '0');
            localStorage.setItem('perdidasDiarias', '0');
            gananciasDiarias = 0;
            perdidasDiarias = 0;

            updateChart();
        }).catch(error => {
            console.error("Error al obtener valores iniciales:", error);
        });
    } else {
        // Verificar si los valores iniciales están establecidos
        if (!localStorage.getItem('initialGanancias') || !localStorage.getItem('initialPerdidas')) {
            // Si no hay valores iniciales, obtenerlos
            Promise.all([
                $.get("/ganancias"),
                $.get("/perdidas")
            ]).then(([gananciasData, perdidasData]) => {
                const initialGanancias = Number(gananciasData) || 0;
                const initialPerdidas = Number(perdidasData) || 0;

                localStorage.setItem('initialGanancias', initialGanancias.toString());
                localStorage.setItem('initialPerdidas', initialPerdidas.toString());
                updateDailyData();
            }).catch(error => {
                console.error("Error al obtener valores iniciales:", error);
            });
        } else {
            updateDailyData();
        }
    }
}, 10000);