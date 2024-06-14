import { loadCultureFiles } from '../common/culture-loader';
import { Chart, LineSeries, DateTime, Legend, ILoadedEventArgs, ChartTheme, Tooltip, Crosshair, Highlight } from '@syncfusion/ej2-charts';
Chart.Inject(LineSeries, DateTime, Legend, Tooltip, Crosshair, Highlight);
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for local data bind
 */

let series1: Object[] = [];
let series2: Object[] = [];
let point1: Object;
let point2: Object;
let value: number = 80;
let value1: number = 90;
let i: number;
for (i = 1; i < 500; i++) {

    if (Math.random() > .5) {
        value += Math.random();
        value1 += Math.random();
    } else {
        value -= Math.random();
        value1 -= Math.random();
    }
    point1 = { x: new Date(1960, (i + 1), i), y: Math.round(value) };
    point2 = { x: new Date(1960, (i + 1), i), y: Math.round(value1) };
    series1.push(point1);
    series2.push(point2);
}

(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            majorGridLines: { width: 0 },
            valueType: 'DateTime',
            edgeLabelPlacement: 'Shift'
        },

        //Initializing Primary Y Axis
        primaryYAxis:
        {
            title: 'Price',
            labelFormat: '${value}',
            rangePadding: 'None',
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 }
        },
        chartArea: {
            border: {
                width: 0
            }
        },

        //Initializing Chart Series
        series: [
            {
                type: 'Line',
                dataSource: series1,
                xName: 'x', yName: 'y', marker: { visible: false },
                width: 2, name: 'Product X',
            },
            {
                type: 'Line',
                dataSource: series2, marker: { visible: false },
                xName: 'x', yName: 'y',
                width: 2, name: 'Product Y'
            }
        ],
        // Initializing the crosshair
        crosshair: {
            enable: true,
            line: {
                color: 'rgba(204,214,235,0.25)',
                width: Browser.isDevice ? 50 : 20,
            },
            lineType: 'Vertical'
        },
        //Initializing Chart title
        title: 'Stock Price Analysis',
        //Initializing User Interaction Tooltip and Crosshair
        tooltip: {
            enable: true, shared: true
        }, legendSettings: { enableHighlight: true },
        width: Browser.isDevice ? '100%' : '75%',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
        }
    });
    chart.appendTo('#container');
};