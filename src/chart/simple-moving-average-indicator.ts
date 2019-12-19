import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart, CandleSeries, Category, Tooltip, ILoadedEventArgs, DateTime, Zoom, Logarithmic, ChartTheme,
    Crosshair, LineSeries, SmaIndicator
} from '@syncfusion/ej2-charts';
import { Browser, Ajax } from '@syncfusion/ej2-base';
Chart.Inject(
    CandleSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, Crosshair, LineSeries,
    SmaIndicator
);

/**
 * Sample for SMA Indicator
 */
this.renderChart = (chartData: Object[]): void => {
            let chart: Chart = new Chart({

                //Initializing Primary X Axis
                primaryXAxis: {
                    valueType: 'DateTime',
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
                    title: 'Price',
                    labelFormat: '${value}M',
                    minimum: 50, maximum: 170, interval: 30,
                    majorGridLines: { width: 1 },
                    lineStyle: { width: 0 }
                },
                //Initializing Chart Series
                series: [{
                    dataSource: chartData, width: 2,
                    xName: 'x', yName: 'y', low: 'low', high: 'high', close: 'close', volume: 'volume', open: 'open',
                    name: 'Apple Inc', bearFillColor: '#2ecd71', bullFillColor: '#e74c3d',
                    type: 'Candle', animation: { enable: false }
                }],
                //Initializing Technical Indicator
                indicators: [{
                    type: 'Sma', field: 'Close', seriesName: 'Apple Inc', fill: '#6063ff',
                    period: 14, animation: { enable: true }
                }],
                //Initializing User Interaction Tooltip, Crosshair and Zoom
                tooltip: {
                    enable: true, shared: true
                },
                crosshair: { enable: true, lineType: 'Vertical' },
                zoomSettings: {

                    enableSelectionZooming: true,
                    enablePinchZooming: true,
                    mode: 'XY',
                    enablePan: true
                },
                //Initializing Chart Title
                title: 'AAPL - 2012-2017',
                width: Browser.isDevice ? '100%' : '80%',
                // custom code start
                load: (args: ILoadedEventArgs) => {
                    let selectedTheme: string = location.hash.split('/')[1];
                    selectedTheme = selectedTheme ? selectedTheme : 'Material';
                    args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
                    selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
                },
                // custom code end
                legendSettings: { visible: false }
            });
            chart.appendTo('#container');
        };
  (window as any).default = (): void => {
    loadCultureFiles();
    let chartData: Object[];
    let ajax: Ajax = new Ajax('./src/chart/data-source/financial-data.json', 'GET', true);
    ajax.send().then();
    // Rendering Dialog on AJAX success
    ajax.onSuccess = (data: string): void => {
        chartData = JSON.parse(data);
        chartData.map((data: Object) => {
            // tslint:disable-next-line:no-string-literal
            data['x'] = new Date(data['x']);
        });
        this.renderChart(chartData);
    };
};