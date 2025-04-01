import { loadCultureFiles } from '../common/culture-loader';
import { RangeNavigator, Chart, IChangedEventArgs, LineSeries, AreaSeries, DateTime, Crosshair } from '@syncfusion/ej2-charts';
import { ChartTheme, ChartAnnotation, PeriodSelector, CandleSeries, MomentumIndicator, Tooltip } from '@syncfusion/ej2-charts';
import { RangeTooltip, IRangeLoadedEventArgs } from '@syncfusion/ej2-charts';
Chart.Inject(AreaSeries, DateTime, LineSeries, Crosshair, ChartAnnotation, CandleSeries, MomentumIndicator, Tooltip);
RangeNavigator.Inject(AreaSeries, DateTime, PeriodSelector, RangeTooltip);
import { chartData } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';
import { loadRangeNavigatorTheme } from './theme-colors';

/**
 * Sample for Area Series
 */

let theme: ChartTheme = loadRangeNavigatorTheme();

(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'DateTime',
            majorGridLines: { width: 0 },
            crosshairTooltip: { enable: true }
        },
        //Initializing Primary Y Axis
        primaryYAxis: {
            title: 'Price',
            labelFormat: '${value}',
            plotOffset: 25,
            minimum: 50, maximum: 170, rangePadding: 'None',
            interval: 30, rowIndex: 1, opposedPosition: true, lineStyle: { width: 0 },
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
            majorGridLines: { width: 0 }, lineStyle: { width: 0 }, minimum: 80, maximum: 120, interval: 20,
            majorTickLines: { width: 0 }, title: 'Momentum', stripLines: [
                {
                    start: 80, end: 120, text: '', color: 'black', visible: true,
                    opacity: 0.03, zIndex: 'Behind'
                }]
        }],
        //Initializing Chart Series
        series: [{
            dataSource: chartData, width: 2,
            xName: 'x', yName: 'y', low: 'low', high: 'high', close: 'close', volume: 'volume', open: 'open',
            name: 'Apple Inc', bearFillColor: '#2ecd71', bullFillColor: '#e74c3d',
            type: 'Candle', animation: { enable: true }
        }],
        indicators: [{
            type: 'Momentum', field: 'Close', seriesName: 'Apple Inc', yAxisName: 'secondary', fill: '#6063ff',
            period: 3, animation: { enable: true }, upperLine: { color: '#e74c3d' }
        }],
        margin: { top: -50 },
        tooltip: { enable: true, shared: true },
        width: Browser.isDevice ? '100%' : '80%',
        crosshair: { enable: true, lineType: 'Vertical' },
        chartArea: { border: { width: 0 } },
        title: 'AAPL 2012-2017',
        theme: theme, legendSettings: { visible: false }
    });
    chart.appendTo('#chart');

    let range: RangeNavigator = new RangeNavigator(
        {
            labelPosition: 'Outside', valueType: 'DateTime', height: '150',
            value: [new Date(2014, 0), new Date(2015, 0)],
            series: [{ dataSource: chartData, xName: 'x', yName: 'high', type: 'Line', width: 1}],
            changed : (args: IChangedEventArgs) => {
                chart.primaryXAxis.zoomFactor = args.zoomFactor;
                chart.primaryXAxis.zoomPosition = args.zoomPosition;
                chart.dataBind();
            },
            width: Browser.isDevice ? '100%' : '80%',
            margin: { right: 0, left: 0, top: 0, bottom: 0},
            theme: theme,
            loaded: (args: IRangeLoadedEventArgs) => {
                if (!Browser.isDevice) {
                    document.getElementById('container_Secondary_Element').style.transform = 'translate(13%)';
                }
            },
            load: (args: IRangeLoadedEventArgs) => {
                args.rangeNavigator.periodSelectorSettings.height =
                document.body.className.indexOf('e-bigger') > -1 ? 56 : 42;
            },
            periodSelectorSettings: {
                position: 'Top',
                periods: [
                    { text: '1M', interval: 1, intervalType: 'Months'},
                    { text: '2M', interval: 2, intervalType: 'Months'},
                    { text: '6M', interval: 6, intervalType: 'Months'},
                    { text: 'YTD'},
                    { text: '1Y', interval: 1, intervalType: 'Years'},
                    { text: '2Y', interval: 2, intervalType: 'Years'},
                    { text: 'ALL'}
                ]
            }

        }
    );
    range.appendTo('#container');
};