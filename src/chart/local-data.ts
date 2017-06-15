import { Chart, LineSeries, DateTime, Legend } from '@syncfusion/ej2-charts';
Chart.Inject(LineSeries, DateTime, Legend);

/**
 * Local data 
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
            majorGridLines: { width: 0 },
            valueType: 'DateTime',
            edgeLabelPlacement: 'Shift'
        },

        //Initializing Primary Y Axis	
        primaryYAxis:
        {
            title: 'Price ($)',
            labelFormat: '${value}',
            rangePadding: 'None'
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
        title: 'Stock Price Analysis'
    });
    chart.appendTo('#container');
};