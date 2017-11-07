import {
    ChartTheme, Chart, CandleSeries, Category, Tooltip, ILoadedEventArgs, DateTime, Zoom, Logarithmic, ColumnSeries,
    Crosshair, StripLine, IAxisLabelRenderEventArgs, ITooltipRenderEventArgs
} from '@syncfusion/ej2-charts';
import { chartData } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';
Chart.Inject(CandleSeries, StripLine, Category, Tooltip, DateTime, Zoom, ColumnSeries, Logarithmic, Crosshair);

/**
 * Candle series
 */
this.default = (): void => {
    let getLabelText: Function = (value: number): string => {
        return (((value) / 1000000000)).toFixed(1) + 'bn';
    };
    let chart: Chart = new Chart({
        // Initialize the axes
        primaryXAxis: {
            valueType: 'DateTime',
            skeleton: 'yMd', zoomFactor: 0.2, zoomPosition: 0.6,
            crosshairTooltip: { enable: true },
            majorGridLines: { width: 0 },
        },
        primaryYAxis: {
            title: 'Volume',
            labelFormat: '{value}',
            valueType: 'Logarithmic',
            minimum: 500000000, maximum: 130000000, opposedPosition: true,
            majorGridLines: { width: 1 },
            lineStyle: { width: 0 },
            stripLines: [
                {
                    end: 1300000000, startFromAxis: true, text: '', color: 'black', visible: true,
                    opacity: 0.03, zIndex: 'Behind'
                }]
        },
        axes: [{
            name: 'secondary', minimum: 50, maximum: 180, interval: 40, opposedPosition: true, rowIndex: 1, majorGridLines: { width: 1 },
            labelFormat: '${value}', title: 'Price', plotOffset: 30, lineStyle: { width: 0 }
        }],
        // Initialize the chart rows
        rows: [
            {
                height: '30%'
            }, {
                height: '70%'
            }
        ],
        // Initialize the chart series
        series: [
            {
                type: 'Column',
                dataSource: chartData, animation: { enable: true }, xName: 'x', yName: 'volume',
                name: 'Volume'
            },
            {
                type: 'Candle', yAxisName: 'secondary', bearFillColor: '#2ecd71', bullFillColor: '#e74c3d',
                dataSource: chartData, animation: { enable: true },
                xName: 'x', low: 'low', high: 'high', open: 'open', close: 'close', name: 'Apple Inc',
                volume: 'volume'
            }
        ],
        /**
         * Initialize the user interactions zooming, tooltip and crosshair
         */
        zoomSettings:
        {
            enableMouseWheelZooming: true,
            enablePinchZooming: true,
            enableSelectionZooming: true,
            mode: 'X'
        },
        title: 'AAPL Historical',
        tooltip: {
            enable: true, shared: true
        },
        /**
         * Triggered tooltip, load and axis label render event
         */
        tooltipRender: (args: ITooltipRenderEventArgs) => {
            if (!args.series.index) {
                args.textCollections = 'Volume : <b>' +
                    getLabelText(args.textCollections.split('<b>')[1].split('</b>')[0]) + '</b>';
            }
        },
        axisLabelRender: (args: IAxisLabelRenderEventArgs) => {
            if (args.axis.name === 'primaryYAxis') {
                args.text = getLabelText(+args.text);
            }
        },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        },
        width: Browser.isDevice ? '100%' : '80%',
        chartArea: { border: { width: 0 } },
        crosshair: { enable: true, lineType: 'Vertical' }

    });
    chart.appendTo('#container');
};
