let domContainer = document.getElementById('chart-container-estadisticas');
let myChart = echarts.init(domContainer, null, { renderer: 'canvas', useDirtyRect: false });

// Obtener datos de ganancias y pérdidas
Promise.all([
    $.get("/transaction/Venta").catch(err => alert("Error ganancias: " + err.statusText)),
    $.get("/transaction/Compra").catch(err => alert("Error pérdidas: " + err.statusText))
]).then(([ganancias, perdidas]) => {

    // Función para procesar datos por fecha
    const procesarDiario = (transacciones) => {
        return transacciones.reduce((acc, { date, value }) => {
            const fecha = date.split('T')[0];
            acc[fecha] = (acc[fecha] || 0) + value;
            return acc;
        }, {});
    };

    const getInicioSemana = (dateStr) => {
        const date = new Date(dateStr);
        const dia = date.getDay();
        const diff = date.getDate() - dia + (dia === 0 ? -6 : 1); // Lunes como inicio
        return new Date(date.setDate(diff)).toISOString().split('T')[0];
    };

    const procesarSemanal = (transacciones) => {
        return transacciones.reduce((acc, { date, value }) => {
            const semana = getInicioSemana(date);
            acc[semana] = (acc[semana] || 0) + value;
            return acc;
        }, {});
    };

    // Datos para gráficos
    const datosDiarios = {
        ganancias: procesarDiario(ganancias),
        perdidas: procesarDiario(perdidas)
    };

    const datosSemanales = {
        ganancias: procesarSemanal(ganancias),
        perdidas: procesarSemanal(perdidas)
    };

    // Fechas ordenadas
    const fechasDiarias = Object.keys(datosDiarios.ganancias).sort();
    const fechasSemanales = Object.keys(datosSemanales.ganancias).sort().map(s => `Semana ${s}`);

    // Configuración del gráfico combinado
    myChart.setOption({
        title: {
            text: 'Balance Diario y Semanal',
            left: 'center',
            textStyle: { fontSize: 18, fontWeight: 'bold', color: 'white' }
        },
        tooltip: { trigger: 'axis' },
        legend: { data: ['Ganancias Diarias', 'Pérdidas Diarias', 'Ganancias Semanales', 'Pérdidas Semanales'], top: 30 },
        xAxis: [
            {
                type: 'category',
                data: fechasDiarias.concat(fechasSemanales),
                axisLabel: { rotate: 45 }
            }
        ],
        yAxis: { type: 'value' },
        series: [
            {
                name: 'Ganancias Diarias',
                type: 'bar',
                data: fechasDiarias.map(f => datosDiarios.ganancias[f] || 0),
                itemStyle: { color: '#00E396' }
            },
            {
                name: 'Pérdidas Diarias',
                type: 'bar',
                data: fechasDiarias.map(f => -(datosDiarios.perdidas[f] || 0)),
                itemStyle: { color: '#FF4560' }
            },
            {
                name: 'Ganancias Semanales',
                type: 'line',
                data: fechasSemanales.map(f => datosSemanales.ganancias[f.replace('Semana ', '')] || 0),
                itemStyle: { color: '#00E396' }
            },
            {
                name: 'Pérdidas Semanales',
                type: 'line',
                data: fechasSemanales.map(f => -(datosSemanales.perdidas[f.replace('Semana ', '')] || 0)),
                itemStyle: { color: '#FF4560' }
            }
        ],
        grid: { left: '10%', right: '10%', containLabel: true },
        animationDuration: 0
    });

    // Redimensionar al cambiar ventana
    window.addEventListener('resize', () => {
        myChart.resize();
    });

}).catch(error => console.error("Error:", error));

