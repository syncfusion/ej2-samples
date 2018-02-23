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
    let date1: Date = new Date(2017, 1, 1);
    let returnValue: any = chartData.filter(filterValue);
    function filterValue(value: { x: Date, high: number, low: number }): any {
        return value.x >= date1;
    }

    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'DateTime',
            crosshairTooltip: { enable: true },
            minimum: new Date(2016, 12, 31),
            maximum: new Date(2017, 9, 31),
            majorGridLines: { width: 0 }

        },
        //Initializing Primary Y Axis
        primaryYAxis: {
            title: 'Price',
            labelFormat: '${value}',
            minimum: 100, maximum: 180,
            interval: 20,
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
                dataSource: returnValue, animation: { enable: true },
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
        crosshair: {
            enable: true, lineType: 'Vertical', line: {
                width: 0,
            }
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
