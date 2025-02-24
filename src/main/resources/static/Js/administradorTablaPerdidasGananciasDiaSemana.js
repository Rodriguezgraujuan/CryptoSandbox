/*
AQUI SE GENERAN LA TABLA SEMANAL DE GANANCIAS Y PERDIDAS
 */
// -------------------------------------------
// 1. Configuración y verificación del día actual
const todayDate = new Date().toISOString().split('T')[0];

// 2. Inicialización de la gráfica de ECharts
const domdaily = document.getElementById('chart-container-estadisticas');
const myChartdaily = echarts.init(domdaily, null, {
    renderer: 'canvas',
    useDirtyRect: false
});

// Función para actualizar el gráfico con los datos actuales
function updateChart(gananciasDiarias, perdidasDiarias) {
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

// 3. Función para consultar datos desde la API y actualizar la gráfica
function getTransactions() {
    $.get("/transactions", function(data) {
        let gananciasDiarias = 0;
        let perdidasDiarias = 0;

        // Filtrar transacciones de hoy y calcular montos
        data.forEach(transaction => {
            if (transaction.date === todayDate) {  // Comparación directa con la fecha actual
                if (transaction.operation === "Venta") {
                    gananciasDiarias += transaction.amount;
                } else if (transaction.operation === "Compra") {
                    perdidasDiarias += transaction.amount;
                }
            }
        });

        // Actualizar la gráfica con los valores calculados
        updateChart(gananciasDiarias, perdidasDiarias);
    }).fail(function(error) {
        console.error("Error al obtener las transacciones:", error);
    });
}

// 4. Inicializamos el gráfico y gestionamos el redimensionado
getTransactions();
window.addEventListener('resize', () => {
    myChartdaily.resize();
});

// 5. Intervalo para consultar datos cada 10 segundos
setInterval(getTransactions, 10000);