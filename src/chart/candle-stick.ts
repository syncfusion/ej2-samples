import { loadCultureFiles } from '../common/culture-loader';
import {
    ChartTheme, Chart, CandleSeries, Category, Tooltip, ILoadedEventArgs, DateTime, Zoom, Logarithmic, ColumnSeries,
    Crosshair, StripLine, IAxisLabelRenderEventArgs, ISharedTooltipRenderEventArgs
} from '@syncfusion/ej2-charts';
import { IPointRenderEventArgs } from '@syncfusion/ej2-charts';
import { Browser, Ajax } from '@syncfusion/ej2-base';
import { chartValue } from './financial-data';
Chart.Inject(CandleSeries, StripLine, Category, Tooltip, DateTime, Zoom, ColumnSeries, Logarithmic, Crosshair);
let pointColors: string[] = [];

let getLabelText: Function = (value: number): string => {
    return (((value) / 10000000)) + 'M';
};

/**
 * Sample for Candle series
 */
(window as any).default = (): void => {
    loadCultureFiles();

        let chart: Chart = new Chart({
            // Initialize the axes
            primaryXAxis: {
                valueType: 'DateTime', crosshairTooltip: { enable: false }, majorGridLines: { width: 0 },
            },
            primaryYAxis: {
                title: 'Volume', opposedPosition: true, majorGridLines: { width: 1 }, lineStyle: { width: 0 },majorTickLines: { width: 0 }, 
                stripLines: [
                    {
                        end: 1300000000, startFromAxis: true, text: '', color: 'black', visible: true,
                        opacity: 0.03, zIndex: 'Behind'
                    }], 
            },
            axes: [{
                name: 'secondary', opposedPosition: true, rowIndex: 1, majorGridLines: { width: 1 },
                labelFormat: 'n0', title: 'Price', plotOffset: 20, lineStyle: { width: 0 }, rangePadding: 'None', maximum: 150
            }],
            // Initialize the chart rows
            rows: [{ height: '30%' }, { height: '70%' }],
            // Initialize the chart series
            series: [
                { type: 'Column', dataSource: chartValue, enableTooltip: false, xName: 'period', yName: 'volume', name: 'Volume' },
                {
                    type: 'Candle', yAxisName: 'secondary', bearFillColor: '#2ecd71', bullFillColor: '#e74c3d',
                    dataSource: chartValue, volume: 'volume',
                    xName: 'period', low: 'low', high: 'high', open: 'open', close: 'close', name: 'Apple Inc.(AAPL)',
                }
            ], tooltip: { enable: true, shared: true, header:'', format: '<b>Apple Inc.(AAPL)</b> <br> High : <b>${point.high}</b> <br> Low : <b>${point.low}</b> <br> Open : <b>${point.open}</b> <br> Close : <b>${point.close}</b> <br> Volume : <b>${point.volume}</b>' },
            sharedTooltipRender: (args: ISharedTooltipRenderEventArgs) => {
                if (!args.series[0].index) {
                    args.text[0] = 'Volume : <b>' + getLabelText(args.text[0].split('<b>')[1].split('</b>')[0]) + '</b>';
                }
            },
            axisLabelRender: (args: IAxisLabelRenderEventArgs) => {
                if (args.axis.name === 'primaryYAxis') { args.text = getLabelText(+args.text); }
            },
             // custom code start
            load: (args: ILoadedEventArgs) => {
                let selectedTheme: string = location.hash.split('/')[1];
                selectedTheme = selectedTheme ? selectedTheme : 'Material';
                args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
                    selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
            },
             // custom code end
            width: Browser.isDevice ? '100%' : '75%', chartArea: { border: { width: 0 } },
            crosshair: { enable: true, lineType: "None" }
        });
        chart.appendTo('#container');
    };

