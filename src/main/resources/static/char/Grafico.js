let myChart = echarts.init(document.getElementById('chart-container'), null, {
  renderer: 'canvas',
  useDirtyRect: false
});

function cogersymobolo(symbolo) {
  $.get(`/registro/${symbolo}`)
      .done((data) => {
        console.log("Datos recibidos:", data);
        actualizarGrafico(data);
      })
      .fail((error) => {
        console.error("Error al obtener datos:", error.responseText);
      });
}

function actualizarGrafico(datos) {
  if (!Array.isArray(datos) || datos.length === 0) {
    console.warn("No hay datos para mostrar en el gráfico.");
    return;
  }

  let datosPorFecha = {};
  datos.forEach((item) => {
    let fecha = item.date.split("T")[0];
    if (!datosPorFecha[fecha]) {
      datosPorFecha[fecha] = {
        open: item.value,
        close: item.value,
        low: item.crypto.low_24h,
        high: item.crypto.high_24h
      };
    } else {
      datosPorFecha[fecha].close = item.value;
    }
  });

  const fechas = Object.keys(datosPorFecha);
  const valores = fechas.map(fecha => [
    datosPorFecha[fecha].open,
    datosPorFecha[fecha].close,
    datosPorFecha[fecha].low,
    datosPorFecha[fecha].high
  ]);

  const opciones = {
    title: {
      text: 'Historial de Precios de la Criptomoneda',
      left: 'center',
      textStyle: { color: '#ffffff' }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' },
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      borderColor: '#777',
      borderWidth: 1,
      textStyle: { color: '#fff' }
    },
    xAxis: {
      type: 'category',
      data: fechas,
      axisLine: { lineStyle: { color: '#8392A5' } },
      splitLine: { show: false },
      min: 'dataMin',
      max: 'dataMax'
    },
    yAxis: {
      scale: true,
      splitArea: { show: true },
      axisLine: { lineStyle: { color: '#8392A5' } }
    },
    dataZoom: [
      { type: 'slider', xAxisIndex: 0, start: 0, end: 100 },
      { type: 'inside', xAxisIndex: 0 }
    ],
    series: [{
      type: 'candlestick',
      data: valores,
      itemStyle: {
        color: '#00ff00',
        color0: '#ff0000',
        borderColor: '#00ff00',
        borderColor0: '#ff0000'
      },
      animationDurationUpdate: 500,
      animationEasingUpdate: 'linear'
    }]
  };

  myChart.setOption(opciones, true);
}

actualizarGrafico([]);
window.addEventListener('resize', myChart.resize);

// Actualizar cada 15 segundos
setInterval(() => {
  cogersymobolo('btc');
}, 15000);
