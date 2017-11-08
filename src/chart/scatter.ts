import { Chart, ScatterSeries, Legend, Tooltip, ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
Chart.Inject(ScatterSeries, Legend, Tooltip);

/**
 * Sample for Scatter Series
 */
this.default = (): void => {
    let series1: Object[] = [];
    let series2: Object[] = [];
    let point1: Object;
    let value: number = 80;
    let value1: number = 70;
    let i: number;
    for (i = 1; i < 120; i++) {
        if (Math.random() > 0.5) {
            value += Math.random();
        } else {
            value -= Math.random();
        }
        value = value < 60 ? 60 : value > 90 ? 90 : value;
        point1 = { x: (145 + (i / 3)).toFixed(1), y: value.toFixed(1) };
        series1.push(point1);
    }
    for (i = 1; i < 120; i++) {
        if (Math.random() > 0.5) {
            value1 += Math.random();
        } else {
            value1 -= Math.random();
        }
        value1 = value1 < 60 ? 60 : value1 > 90 ? 90 : value1;
        point1 = { x: (145 + (i / 3)).toFixed(1), y: value1.toFixed(1) };
        series2.push(point1);
    }
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            title: 'Height (cm)',
            minimum: 145,
            maximum: 185,
            majorGridLines: { width: 0 },
            edgeLabelPlacement: 'Shift',
            labelFormat: '{value}cm'
        },
        chartArea: {
            border: {
                width: 0
            }
        },
        //Initializing Primary Y Axis
        primaryYAxis:
        {
            title: 'Weight (kg)',
            minimum: 60,
            maximum: 90,
            labelFormat: '{value}kg',
            rangePadding: 'None'
        },

        //Initializing Chart Series
        series: [
            {
                type: 'Scatter',
                dataSource: series1,
                xName: 'x', width: 2, marker: {
                    visible: false,
                    width: 8,
                    height: 8
                },
                yName: 'y', name: 'Male', opacity: 0.7
            },
            {
                type: 'Scatter',
                dataSource: series2,
                xName: 'x', width: 2, marker: {
                    visible: false,
                    width: 8,
                    height: 8
                },
                yName: 'y', name: 'Female', opacity: 0.7
            },
        ],

        //Initializing Chart title
        title: 'Height Vs Weight',
        //Initializing User Interaction Tooltip
        tooltip: {
            enable: true
        },
        width : Browser.isDevice ? '100%' : '60%',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        }

    });
    chart.appendTo('#container');
};