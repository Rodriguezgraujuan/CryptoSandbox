let myChart = echarts.init(document.getElementById('chart-container'), null, {
  renderer: 'canvas',
  useDirtyRect: false
});

// Función para obtener datos y actualizar el gráfico
function cogersymobolo(symbolo) {
  $.get(`/registro/${symbolo}`)
      .done((data) => {
        console.log("Datos recibidos:", data);
        actualizarGrafico(data);
      })
      .fail((error) => {
        alert("Error al obtener datos: " + error.responseText);
      });
}

// Función para procesar datos y actualizar el gráfico
function actualizarGrafico(datos) {
  if (!Array.isArray(datos) || datos.length === 0) {
    console.warn("No hay datos para mostrar en el gráfico.");
    return;
  }

  // Agrupar datos por fecha y calcular valores de candlestick
  let datosPorFecha = {};

  datos.forEach((item) => {
    let fecha = item.date.split("T")[0]; // Obtener solo la fecha (YYYY-MM-DD)

    if (!datosPorFecha[fecha]) {
      datosPorFecha[fecha] = {
        open: item.value,  // Se toma el primer valor del día como apertura
        close: item.value, // Se actualizará al último valor del día
        low: item.crypto.low_24h,  // Mínimo del día
        high: item.crypto.high_24h // Máximo del día
      };
    } else {
      datosPorFecha[fecha].close = item.value; // Último valor registrado como cierre
    }
  });

  // Extraer fechas y valores para el gráfico
  const fechas = Object.keys(datosPorFecha);
  const valores = fechas.map(fecha => [
    datosPorFecha[fecha].open,  // Apertura
    datosPorFecha[fecha].close, // Cierre
    datosPorFecha[fecha].low,   // Mínimo
    datosPorFecha[fecha].high   // Máximo
  ]);

  // Configuración del gráfico
  const opciones = {
    xAxis: {
      type: 'category',
      data: fechas,
      boundaryGap: false,
      axisLine: { onZero: false },
      splitLine: { show: false },
      min: 'dataMin',
      max: 'dataMax'
    },
    yAxis: {
      scale: true,
      splitArea: {
        show: true
      }
    },
    series: [{
      type: 'candlestick',
      data: valores,
      itemStyle: {
        color: '#00ff00',  // Color velas alcistas
        color0: '#ff0000', // Color velas bajistas
        borderColor: '#000'
      }
    }]
  };

  myChart.setOption(opciones, true); // 'true' para reemplazar la configuración anterior
}

// Configuración inicial del gráfico vacío
actualizarGrafico([]);
window.addEventListener('resize', myChart.resize);
