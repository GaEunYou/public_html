// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
    // *     example: number_format(1234.56, 2, ',', ' ');
    // *     return: '1 234,56'
    number = (number + '').replace(',', '').replace(' ', '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

// Area Chart Example
var ctx = document.getElementById("myAreaChart");
var myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
        datasets: [{
            label: "기온",
            lineTension: 0.3,
            backgroundColor: "rgba(78, 115, 223, 0.05)",
            borderColor: "rgba(78, 115, 223, 1)",
            pointRadius: 3,
            pointBackgroundColor: "rgba(78, 115, 223, 1)",
            pointBorderColor: "rgba(78, 115, 223, 1)",
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
            pointHoverBorderColor: "rgba(78, 115, 223, 1)",
            pointHitRadius: 10,
            pointBorderWidth: 2,
            data: [0.3, 2.6, 9.1, 14.4, 18.1, 21.7, 27.1, 27.5, 21.3, 15.1, 10.1, 3.2],
        }],
    },
    options: {
        maintainAspectRatio: false,
        layout: {
            padding: {
                left: 10,
                right: 25,
                top: 25,
                bottom: 0
            }
        },
        scales: {
            xAxes: [{
                time: {
                    unit: 'date'
                },
                gridLines: {
                    display: false,
                    drawBorder: false
                },
                ticks: {
                    maxTicksLimit: 12
                }
            }],
            yAxes: [{
                ticks: {
                    maxTicksLimit: 5,
                    padding: 10,
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                        return number_format(value) + '℃';
                    }
                },
                gridLines: {
                    color: "rgb(234, 236, 244)",
                    zeroLineColor: "rgb(234, 236, 244)",
                    drawBorder: false,
                    borderDash: [2],
                    zeroLineBorderDash: [2]
                }
            }],
        },
        legend: {
            display: false
        },
        tooltips: {
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#858796",
            titleMarginBottom: 10,
            titleFontColor: '#6e707e',
            titleFontSize: 14,
            borderColor: '#dddfeb',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            intersect: false,
            mode: 'index',
            caretPadding: 10,
            callbacks: {
                label: function (tooltipItem, chart) {
                    var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                    return datasetLabel  + ' : ' + number_format(tooltipItem.yLabel,1) +  '℃';
                }
            }
        }
    }
});


$('input[name="analItem"]').change(function () {
    var radioValue = $('input[name=analItem]:checked').val();
    console.log(radioValue);
    let unit = returnUnit(radioValue);
    myLineChart.options.scales.yAxes[0].ticks.callback = unit.callback;
    myLineChart.data.datasets[0].label = unit.datasetsLabel;
    myLineChart.options.tooltips.callbacks.label = unit.label;
    myLineChart.update();

    updateDataChart(myLineChart, radioValue);
});


function returnUnit(value) {
    let config = {};

    switch (value) {
        case "temperature" :
            config = {
                callback: function (value, index, values) {
                    return number_format(value) + '℃';
                },
                datasetsLabel:"기온"
            };
            break;
        case "wind" :
            config = {
                callback: function (value, index, values) {
                    return number_format(value) + 'm/s';
                },
                datasetsLabel:"바람",
                label: function (tooltipItem, chart) {
                    var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                    return datasetLabel  + ' : ' + number_format(tooltipItem.yLabel,1) +  'm/s';
                }
            };
            break;
        case "relhumidity" :
            config = {
                callback: function (value, index, values) {
                    return number_format(value) + '%';
                },
                datasetsLabel: "습도",
                label: function (tooltipItem, chart) {
                    var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                    return datasetLabel  + ' : ' + number_format(tooltipItem.yLabel,1) +  '%';
                }
            };
            break;
        case "visibility" :
            config = {
                callback: function (value, index, values) {
                    return number_format(value) + 'km';
                },
                datasetsLabel: "시정",
                label: function (tooltipItem, chart) {
                    var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                    return datasetLabel  + ' : ' + number_format(tooltipItem.yLabel,1) +  'km';
                }
            };
            break;
        case "downward_SW_flux" :
            config = {
                callback: function (value, index, values) {
                    return number_format(value) + 'W/㎡';
                },
                datasetsLabel: "태양광",
                label: function (tooltipItem, chart) {
                    var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                    return datasetLabel  + ' : ' + number_format(tooltipItem.yLabel,2) +  'W/㎡';
                }
            };
            break;
    }
    return config;
}

function updateDataChart(chart, value) {
    switch (value) {
        case "temperature" :
            chart.data.datasets[0].data=[0.3, 2.6, 9.1, 14.4, 18.1, 21.7, 27.1, 27.5, 21.3, 15.1, 10.1, 3.2];
            break;
        case "wind" :
            chart.data.datasets[0].data=[1.7,1.8,1.9,1.8,1.8,1.6,1.5,1.7,1.3,1.5,1.2,1.8];
            break;
        case "relhumidity" :
            chart.data.datasets[0].data=[46,38,67,67,76,80,84,83,82,69,65,51];
            break;
        case "visibility" :
            chart.data.datasets[0].data=[32,78,44,65,36,22,35,38,45,36,27,54];
            break;
        case "downward_SW_flux" :
            chart.data.datasets[0].data=[2.45,3.42,4.58,5.28,4.46,4.37,3.04,3.42,3.53,3.89,2.93,2.64];
            break;
    }

    /*let label = "Jan";
    let data = [10000000];
    console.log(chart.data.labels[0]);
    chart.data.labels[0] = "1월";*/

    /*chart.data.datasets[0].data[0] = 10000000;*/
    chart.update();

}
