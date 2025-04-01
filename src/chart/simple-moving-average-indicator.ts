import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart, CandleSeries, Tooltip, ILoadedEventArgs, DateTime, Zoom, Logarithmic, ChartTheme,
    Crosshair, LineSeries, SmaIndicator
} from '@syncfusion/ej2-charts';
import { chartValue } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';
Chart.Inject(
    CandleSeries, Tooltip, DateTime, Zoom, Logarithmic, Crosshair, LineSeries,
    SmaIndicator
);

/**
 * Sample for SMA Indicator
 */
(window as any).default = (): void => {
    loadCultureFiles();
        let chart: Chart = new Chart({
            //Initializing Primary X Axis
            primaryXAxis: {
                valueType: 'DateTime', intervalType: 'Months',
                majorGridLines: { width: 0 },
                zoomFactor: 0.2, zoomPosition: 0.6,
                crosshairTooltip: { enable: true },
            },
            chartArea: {
                border: {
                    width: 0
                }
            },
            //Initializing Primary Y Axis
            primaryYAxis: {
                title: 'Price (in Million)',
                labelFormat: '${value}M',
                minimum: 50, maximum: 170, interval: 30,
                majorGridLines: { width: 1 },
                lineStyle: { width: 0 }
            },
            //Initializing Chart Series
            series: [{
                dataSource: chartValue, width: 2,
                xName: 'period', low: 'low', high: 'high', close: 'close', volume: 'volume', open: 'open',
                name: 'Apple Inc', bearFillColor: '#2ecd71', bullFillColor: '#e74c3d',
                type: 'Candle', animation: { enable: false }
            }],
            //Initializing Technical Indicator
            indicators: [{
                type: 'Sma', field: 'Close', seriesName: 'Apple Inc', fill: '#6063ff', xName: 'period',
                period: 14
            }],
            //Initializing User Interaction Tooltip, Crosshair and Zoom
            tooltip: {
                enable: true, shared: true
            },
            crosshair: { enable: true, lineType: 'Vertical' },
            zoomSettings: {

                enableSelectionZooming: true,
                enablePinchZooming: true,
                mode: 'X',
                enablePan: true
            },
            //Initializing Chart Title
            title: 'AAPL - 2012-2017',
            width: Browser.isDevice ? '100%' : '75%',
            // custom code start
            load: (args: ILoadedEventArgs) => {
                loadChartTheme(args);
            },
            // custom code end
            legendSettings: { visible: false }
        });
        chart.appendTo('#container');
    };