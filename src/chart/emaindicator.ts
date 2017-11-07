import {
    Chart, CandleSeries, Category, Tooltip, ILoadedEventArgs, DateTime, Zoom, Logarithmic, ChartTheme,
    Crosshair, LineSeries, EmaIndicator
} from '@syncfusion/ej2-charts';
import { chartData } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';
Chart.Inject(
    CandleSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, Crosshair, LineSeries,
    EmaIndicator
);

/**
 * EMA Indicator
 */
this.default = (): void => {

    let chart: Chart = new Chart({
        // Initialize the chart axes
        primaryXAxis: {
            valueType: 'DateTime',
            intervalType: 'Months',
            majorGridLines: { width: 0 },
            zoomFactor: 0.4, zoomPosition: 0.4,
            skeleton: 'yMd',
            crosshairTooltip: { enable: true },
        }, chartArea: {
            border: {
                width: 0
            }
        },
        primaryYAxis: {
            title: 'Price',
            labelFormat: '${value}M',
            minimum: 50, maximum: 170, interval: 30,
            majorGridLines: { width: 1 },
            lineStyle: { width: 0 }
        },
        // Initialize the chart series
        series: [{
            dataSource: chartData, width: 2,
            xName: 'x', yName: 'y', low: 'low', high: 'high', close: 'close', volume: 'volume', open: 'open',
            name: 'Apple Inc', bearFillColor: '#2ecd71', bullFillColor: '#e74c3d',
            type: 'Candle', animation: { enable: false }
        }],
        // Initialize the indicators
        indicators: [{
            type: 'Ema', field: 'Close', seriesName: 'Apple Inc', fill: '#606eff',
            period: 14, animation: { enable: true }
        }],
        /**
         * Initialize user interaction features tooltip, crosshiar and zooming
         */
        tooltip: {
            enable: true, shared: true
        },
        crosshair: { enable: true, lineType: 'Vertical' },
        zoomSettings: {
            enableMouseWheelZooming: true,
            enableSelectionZooming: true,
            enableDeferredZooming: true,
            enablePinchZooming: true,
            mode: 'X'
        },
        title: 'AAPL - 2012-2017',
        width: Browser.isDevice ? '100%' : '80%',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        },
        legendSettings: { visible: false }
    });
    chart.appendTo('#container');
};
