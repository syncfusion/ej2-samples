import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart, CandleSeries, Category, Tooltip, ILoadedEventArgs, DateTime, Zoom, Logarithmic,
    Crosshair, LineSeries, StochasticIndicator, StripLine, ChartTheme
} from '@syncfusion/ej2-charts';
import { chartValue } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';
Chart.Inject(
    CandleSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, Crosshair, LineSeries,
    StochasticIndicator, StripLine
);

/**
 * Sample for Stochastic Indicator
 */
(window as any).default = (): void => {
    loadCultureFiles();
        let chart: Chart = new Chart({
            //Initializing Primary X Axis
            primaryXAxis: {
                valueType: 'DateTime',
                majorGridLines: { width: 0 },
                zoomFactor: 0.2, zoomPosition: 0.6,
                crosshairTooltip: { enable: true },
            },
            //Initializing Primary Y Axis
            primaryYAxis: {
                title: 'Price (in Million)',
                labelFormat: '${value}M',
                minimum: 50, maximum: 170,
                plotOffset: 25, majorGridLines: { width: 0 },
                interval: 30, rowIndex: 1, opposedPosition: true, lineStyle: { width: 0 }
            },
            //Initializing Rows
            rows: [
                {
                    height: '40%'
                }, {
                    height: '60%'
                }
            ],
            //Initializing Axes
            axes: [{
                name: 'secondary',
                opposedPosition: true, rowIndex: 0,
                majorGridLines: { width: 0 }, lineStyle: { width: 0 }, minimum: 0, maximum: 120, interval: 60,
                majorTickLines: { width: 0 }, title: 'Stochastic', stripLines: [
                    {
                        start: 0, end: 120, text: '', color: '#000000', visible: true,
                        opacity: 0.03, zIndex: 'Behind'
                    }]
            }],
            //Initializing Chart Series
            series: [{
                dataSource: chartValue, width: 2,
                xName: 'period', low: 'low', high: 'high', close: 'close', volume: 'volume', open: 'open',
                name: 'Apple Inc', bearFillColor: '#2ecd71', bullFillColor: '#e74c3d',
                type: 'Candle'
            }],
            //Initializing Technical Indicator
            indicators: [{
                type: 'Stochastic', field: 'Close', seriesName: 'Apple Inc', yAxisName: 'secondary', fill: '#6063ff',
                showZones: true, periodLine: { color: '#f2ec2f' }, overBought: 70, overSold: 30,
                period: 3, upperLine: { color: '#ffb735' }, lowerLine: { color: '#f2ec2f' }
            }],
            //Initializing User Interaction Zoom, Tooltip and Crosshair
            zoomSettings:
                {
                    enablePan: true,
                    enableSelectionZooming: true,
                    enablePinchZooming: true,
                    mode: 'X',
                },
            tooltip: {
                enable: true, shared: true
            },
            crosshair: { enable: true, lineType: 'Vertical' },
            chartArea: { border: { width: 0 } },
            //Initializing Chart Title
            title: 'AAPL Stock Price 2012-2017',
            width: Browser.isDevice ? '100%' : '75%',
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
