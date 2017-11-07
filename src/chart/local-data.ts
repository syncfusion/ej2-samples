import { Chart, LineSeries, DateTime, Legend, ILoadedEventArgs, ChartTheme, Tooltip, Crosshair } from '@syncfusion/ej2-charts';
Chart.Inject(LineSeries, DateTime, Legend, Tooltip, Crosshair);
import { Browser } from '@syncfusion/ej2-base';

/**
 * Local data Sample
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

this.default = (): void => {
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            title: 'Years',
            skeleton: 'y',
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
                xName: 'x', yName: 'y',
                width: 2, name: 'Product X',
                animation: { enable: true }
            },
            {
                type: 'Line',
                dataSource: series2,
                xName: 'x', yName: 'y',
                width: 2, name: 'Product Y',
                animation: { enable: true }
            }
        ],

        //Initializing Chart title
        title: 'Stock Price Analysis',
        //Initializing User Interaction Tooltip and Crosshair
        tooltip: {
            enable: true, shared: true
        },
        crosshair: {
            enable: true,
            lineType: 'Vertical'
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