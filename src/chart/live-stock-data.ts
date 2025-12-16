import { loadCultureFiles } from '../common/culture-loader';
import { Chart, ChartTheme, CandleSeries, DateTime, Crosshair, ChartAnnotation, ILoadedEventArgs, IAxisRangeCalculatedEventArgs, Series } from '@syncfusion/ej2-charts';
import { LastValueLabel } from '@syncfusion/ej2-charts';
Chart.Inject(CandleSeries, DateTime, Crosshair, ChartAnnotation, LastValueLabel);
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';

/**
 * Sample of candle updates for a few seconds.
 */
let value: number = 180;
let intervalId: ReturnType<typeof setTimeout> | number;
let getData = (): { series: Candlestick[] } => {
    let series: Candlestick[] = [];
    let point: Candlestick;
    for (let i: number = 0; i < 30; i++) {
        value = 180 + (Math.random() * 25) * Math.sin(i * Math.PI / 8);
        value = Math.max(140, Math.min(260, value));
        if (value > 260) {
            value = 260;
        }
        if (value < 140) {
            value = 140;
        }
        value += Math.random() * 0.1;
        let open: number = value + Math.round(Math.random() * 18);
        let low: number = Math.min(value, open) - Math.round(Math.random() * 6);
        let high: number = Math.min(220, Math.max(value, open) + Math.round(Math.random() * 15));
        point = {
            x: new Date(2000, 5, 2, 2, 0, i),
            close: value,
            open: open,
            low: low,
            high: high
        };
        series.push(point);
    }
    return { series: series };
};

let data: Candlestick[] = getData().series;
let incVal: number = 0;
let updateVal: number = data.length;
let pointAdded: boolean = false;

(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({
        //Initializing Primary X and Y Axis
        primaryXAxis: {
            valueType: 'DateTime', interval: Browser.isDevice ? 8 : 4, crosshairTooltip: { enable: true }, edgeLabelPlacement: Browser.isDevice ? 'None' : 'Shift', majorGridLines: { width: 0 }, labelIntersectAction: 'Hide'
        },
        chartArea: { border: { width: 0 } },
        primaryYAxis:
        {
            interval: 20, opposedPosition: true, minimum: 120, crosshairTooltip: { enable: true }, lineStyle: { width: 0 },
            majorGridLines: { width: 1 }, majorTickLines: { width: 0 }
        },
        //Initializing Chart Series
        series: [
            {
                type: 'Candle', bearFillColor: '#2ecd71', bullFillColor: '#e74c3d', columnWidth: 0.4,
                dataSource: data, xName: 'x', low: 'low', high: 'high', open: 'open', close: 'close', lastValueLabel: { enable: true, background: 'red', dashArray: '3,2', lineWidth: 0.5, font: {size: '10px'} }
            }
        ],
        width: Browser.isDevice ? '100%' : '90%',
        title: 'AAPL Historical',
        crosshair: { enable: true, dashArray: '5,5' },
        pointRender: function (args) {
            args.series.lastValueLabel.background = args.fill;
        },
        load: (args: ILoadedEventArgs) => {
            loadChartTheme(args);
            stockClearInterval();
            intervalId = setInterval(function () {
                let container = document.getElementById('stock');
                if (container && container.id === args.chart.element.id) {
                    let newData1: Candlestick[] = [];
                    let value: number = 180;
                    pointAdded = true;
                    for (let i: number = 0; i < data.length; i++) {
                        newData1.push(Object.assign({}, data[i]));
                    }
                    if (newData1.length > 0) {
                        const lastIndex: number = newData1.length - 1;
                        const previousClose: number = newData1[lastIndex].close;
                        newData1[lastIndex].close += (Math.random() < 0.5 ? 1 : -1) * Math.random() * 25;
                        newData1[lastIndex].close = Math.min(Math.min(Math.max(newData1[lastIndex].close, newData1[lastIndex].low + 5), newData1[lastIndex].high - 5), newData1[lastIndex].open - 2);
                        if (previousClose === newData1[lastIndex].close) {
                            newData1[lastIndex].close -= 5;
                        }
                    }
                    if (incVal < 10) {
                        if (chart.series.length > 0) {
                            chart.series[0].setData(newData1);
                            incVal++;
                        }
                    }
                    else {
                        let change: number = (Math.random() < 0.49 ? 1 : -1) * Math.random() * 10;
                        value += change;
                        if (value > 260) {
                            value = 260;
                        }
                        if (value < 140) {
                            value = 140;
                        }
                        value += Math.random() * 0.1;
                        let open: number = value + Math.round(Math.random() * 12);
                        let low: number = Math.min(value, open) - Math.round(Math.random() * 8);
                        let high: number = Math.max(value, open) + Math.round(Math.random() * 15);
                        if (chart.series.length > 0) {
                            let lastDataPointIndex = data.length - 1;
                            if (lastDataPointIndex >= 0) {
                                let timestamp = chart.series[0].dataSource[lastDataPointIndex].x;
                                let lastTimestamp = new Date(timestamp).getTime();
                                chart.series[0].addPoint({ x: new Date(lastTimestamp + 1000), high: high, low: low, open: open, close: value });
                            }
                        }
                        incVal = 0;
                        updateVal++;
                    }
                }
                else {
                    stockClearInterval();
                }
            }, 1000);
        },
        axisRangeCalculated: (args: IAxisRangeCalculatedEventArgs) => {
            if (args.axis.name === 'primaryXAxis') {
                let lastPoint: Object = args.axis.series[0].points[args.axis.series[0].points.length - 1].x;
                args.maximum = new Date(Number(lastPoint)).getTime() + 2500;
                let firstPoint: Object = args.axis.series[0].points[0].x;
                args.minimum = new Date(Number(firstPoint)).getTime() + 500;
            }
        }
    });
    chart.appendTo('#stock');
    function stockClearInterval() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }
};
interface Candlestick {
    open: number;
    close: number;
    high: number;
    low: number;
    x: Date;
}