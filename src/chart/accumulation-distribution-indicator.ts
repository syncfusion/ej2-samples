import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart, CandleSeries, Category, Tooltip, ILoadedEventArgs, DateTime, Zoom, Logarithmic,
    Crosshair, LineSeries, AccumulationDistributionIndicator, IAxisLabelRenderEventArgs,
    StripLine, ChartTheme
} from '@syncfusion/ej2-charts';
import { chartValue } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';
Chart.Inject(
    CandleSeries, Category, Tooltip, StripLine, DateTime, Zoom, Logarithmic, Crosshair, LineSeries,
    AccumulationDistributionIndicator
);

/**
 * Sample for Accumulation Distribution Indicator
 */

(window as any).default = (): void => {
    loadCultureFiles();
        let chart: Chart = new Chart({
            // Initializing the axes
            primaryXAxis: {
                valueType: 'DateTime', intervalType: "Months",
                majorGridLines: { width: 0 },
                zoomFactor: 0.2, zoomPosition: 0.6,
                crosshairTooltip: { enable: true }
            },
            primaryYAxis: {
                title: 'Price',
                labelFormat: '${value}',
                minimum: 50, maximum: 170,
                plotOffset: 25,
                interval: 30, rowIndex: 1, opposedPosition: true, lineStyle: { width: 0 },
                majorTickLines: { width: 0 }
            },
            axes: [{
                name: 'secondary',
                opposedPosition: true, rowIndex: 0,
                majorGridLines: { width: 0 }, lineStyle: { width: 0 }, minimum: -7000000000, maximum: 5000000000,
                interval: 6000000000, majorTickLines: { width: 0 }, title: 'Accumulation Distribution (in Billion)',
                stripLines: [
                    {
                        start: -7000000000, end: 6000000000, text: '', color: '#6063ff', visible: true,
                        opacity: 0.1, zIndex: 'Behind'
                    }]
            }],
            // Initializing the rows
            rows: [
                {
                    height: '40%'
                }, {
                    height: '60%'
                }
            ],
            // Initializing the series
            series: [{
                dataSource: chartValue, width: 2,
                xName: 'period', yName: 'y', low: 'low', high: 'high', close: 'close', volume: 'volume', open: 'open',
                name: 'Apple Inc', bearFillColor: '#2ecd71', bullFillColor: '#e74c3d',
                type: 'Candle', animation: { enable: true }
            }],

            // Initializing the indicators
            indicators: [{
                type: 'AccumulationDistribution', field: 'Close', seriesName: 'Apple Inc', yAxisName: 'secondary', fill: '#6063ff',
                period: 3
            }],
            /**
             * Initializing the zooming, crosshair and tooltip
             */
            zoomSettings:
                {

                    enableSelectionZooming: true,
                    enablePinchZooming: true,
                    mode: 'X',
                    enablePan: true

                },
            tooltip: {
                enable: true, shared: true
            },
            crosshair: { enable: true, lineType: 'Vertical' },
            // Triggered label render to convert a billion
            axisLabelRender: (args: IAxisLabelRenderEventArgs) => {
                if (args.axis.name === 'secondary') {
                    let value: number = Number(args.text) / 1000000000;
                    args.text = String(value) + 'B';
                }
            },
            chartArea: { border: { width: 0 } },
            title: 'AAPL Stock Price 2012 - 2017',
            width: Browser.isDevice ? '100%' : '75%',
            load: (args: ILoadedEventArgs) => {
                let selectedTheme: string = location.hash.split('/')[1];
                selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
                args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
                    selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
            },
            legendSettings: {
                visible: false
            }
        });
        chart.appendTo('#container');
    };

