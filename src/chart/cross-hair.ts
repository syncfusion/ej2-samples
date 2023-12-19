import { loadCultureFiles } from '../common/culture-loader';
import { ChartTheme, Chart, LineSeries, HiloOpenCloseSeries, Zoom, Crosshair, DateTime, ILoadedEventArgs } from '@syncfusion/ej2-charts';
Chart.Inject(LineSeries, DateTime, Crosshair, HiloOpenCloseSeries, Zoom);
import { axesData } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Crosshair
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({
        //Initializing Chart Axes
        primaryXAxis: {
            majorGridLines: { width: 0 },
            valueType: 'DateTime',
            crosshairTooltip: { enable: true },
            labelFormat: 'MMM'
        },
        primaryYAxis:
        {
            minimum: 83, maximum: 87, interval: 1,
            title: 'Millions in USD',
            labelFormat: '{value} M',
            rowIndex: 0,
            crosshairTooltip: {
                enable: true
            }
        },
        axes: [
            {
                majorGridLines: { width: 0 },
                rowIndex: 0,
                opposedPosition: true,
                minimum: 82, maximum: 88, interval: 2,
                name: 'yAxis',
                title: 'Millions in USD (Stock)',
                crosshairTooltip: { enable: true }
            }
        ],
        // Initialize the chart series
        series: [
            {
                type: 'Line',
                dataSource: axesData,
                border: { width: 1.5 },
                xName: 'xDate', width: 2,
                yName: 'High',
                marker: {
                    visible: true
                }
            },
            {
                type: 'HiloOpenClose',
                dataSource: axesData,
                yAxisName: 'yAxis',
                border: { width: 1.5 },
                bearFillColor: '#2ecd71', bullFillColor: '#e74c3d',
                xName: 'xDate', width: 2,
                high: 'High', low: 'Low', open: 'Open', close: 'Close'
            }
        ],
        /**
         * Initialize the crosshair
         */
        crosshair: { enable: true },
        zoomSettings: {
            enablePinchZooming: true,
            enableSelectionZooming: true,
            mode: 'X'
        },
        legendSettings: { visible: false },
        width: Browser.isDevice ? '100%' : '75%',
        //Initializing Chart title
        title: 'Conns, Inc Stock Details',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
        }
    });
    chart.appendTo('#container');
};