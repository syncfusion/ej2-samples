import {
    Chart, HiloOpenCloseSeries, Category, Tooltip, ILoadedEventArgs, DateTime, Zoom, Logarithmic, ChartTheme,
    Crosshair
} from '@syncfusion/ej2-charts';
import { chartData } from './financial-data';
Chart.Inject(HiloOpenCloseSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, Crosshair);
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Hilo Open Close series
 */
this.default = (): void => {

    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'DateTime',
            skeleton: 'yMd', zoomFactor: 0.2, zoomPosition: 0.6,
            crosshairTooltip: { enable: true },
            majorGridLines: { width: 0 }

        },
        //Initializing Primary Y Axis
        primaryYAxis: {
            title: 'Price',
            labelFormat: '${value}',
            minimum: 50, maximum: 170,
            interval: 40,
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 }
        },
        chartArea: {
            border: {
                width: 0
            }
        },
        //Initializing Chart Series
        series: [
            {
                type: 'HiloOpenClose',
                dataSource: chartData, animation: { enable: true },
                bearFillColor: '#2ecd71', bullFillColor: '#e74c3d',
                xName: 'x', low: 'low', high: 'high', open: 'open', close: 'close', name: 'Apple Inc'
            }
        ],
        //Initializing Chart title
        title: 'AAPL Historical',
        //Initializing User Interaction Tooltip, Crosshair and Zoom
        tooltip: {
            enable: true, shared: true
        },
        crosshair: { enable: true, lineType: 'Vertical' },
        zoomSettings:
        {
            enableMouseWheelZooming: true,
            enablePinchZooming: true,
            enableSelectionZooming: true,
            mode: 'X'
        },
        legendSettings: {
            visible: false
        },
        width: Browser.isDevice ? '100%' : '80%',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        }

    });
    chart.appendTo('#container');
};
