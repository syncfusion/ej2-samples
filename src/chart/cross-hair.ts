import { Chart, LineSeries, Crosshair, DateTime, Legend, ILoadedEventArgs } from '@syncfusion/ej2-charts';
Chart.Inject(LineSeries, DateTime, Crosshair, Legend);

/**
 * Crosshair
 */

let series1: Object[] = [];
let series2: Object[] = [];
let point1: Object;
let point2: Object;
let value: number = 60;
let value1: number = 50;
let i: number;
for (i = 1; i < 250; i++) {

    if (Math.random() > .5) {
        value += Math.random();
        value1 += Math.random();
    } else {
        value -= Math.random();
        value1 -= Math.random();
    }
    point1 = { x: new Date(2000, i, 1), y: value };
    point2 = { x: new Date(2000, i, 1), y: value1 };
    series1.push(point1);
    series2.push(point2);
}

this.default = (): void => {
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            majorGridLines: { width: 0 },
            valueType: 'DateTime',
            crosshairTooltip: { enable: true },
            labelFormat: 'yMMM'
        },

        //Initializing Primary Y Axis	
        primaryYAxis:
        {
            minimum: 10, maximum: 90, interval: 10,
            title: 'Temperature (°F)',
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
                minimum: 0, maximum: 160, interval: 20,
                name: 'yAxis',
                title: 'Rainfall (MM)',
                crosshairTooltip: { enable: true }
            }
        ],
        series: [
            {
                type: 'Line',
                dataSource: series1,
                border: { width: 1.5 },
                xName: 'x', width: 2,
                yName: 'y', name: 'Temperature',
            },
            {
                type: 'Line',
                dataSource: series2,
                name: 'Rainfall',
                yAxisName: 'yAxis',
                border: { width: 1.5 },
                xName: 'x', width: 2,
                yName: 'y',
            }
        ],
        crosshair: { enable: true },
        legendSettings: { visible: true },
        //Initializing Chart title
        title: 'Weather Condition',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            args.chart.theme = selectedTheme.indexOf('fabric') > -1 ? 'Fabric' : 'Material';
        }
    });
    chart.appendTo('#container');
};