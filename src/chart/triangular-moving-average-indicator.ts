import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart, CandleSeries, Category, Tooltip, ILoadedEventArgs, DateTime, Zoom, Logarithmic,
    Crosshair, LineSeries, TmaIndicator, ChartTheme
} from '@syncfusion/ej2-charts';
import { chartValue } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';
Chart.Inject(
    CandleSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, Crosshair, LineSeries,
    TmaIndicator
);

/**
 * Sample for TMA Indicator
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
                majorTickLines: { width: 0 }, lineStyle: { width: 0 }
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
                type: 'Tma', field: 'Close', seriesName: 'Apple Inc', fill: '#6063ff', xName: 'period',
                period: 14, animation: { enable: true }
            }],
            //Initializing User Interaction Tooltip, Crosshair and Zoom
            tooltip: {
                enable: true, shared: true
            },
            crosshair: { enable: true, lineType: 'Vertical' },
            zoomSettings: {
                enablePan: true,
                enableSelectionZooming: true,
                mode: 'X',
            },
            //Initializing Chart Title
            title: 'AAPL Stock Price 2012-2017',
            width: Browser.isDevice ? '100%' : '75%',
            // custom code start
            load: (args: ILoadedEventArgs) => {
                let selectedTheme: string = location.hash.split('/')[1];
                selectedTheme = selectedTheme ? selectedTheme : 'Material';
                args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
            },
            // custom code end
            legendSettings: { visible: false }
        });
        chart.appendTo('#container');
    };
