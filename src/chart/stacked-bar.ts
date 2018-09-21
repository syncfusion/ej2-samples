import { Chart, StackingBarSeries, Category, Legend, Tooltip, ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
Chart.Inject(StackingBarSeries, Category, Legend, Tooltip);
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for StackedBar Series
 */
this.default = (): void => {
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'Category',
            majorGridLines: { width: 0 }
        },
        chartArea: {
            border: {
                width: 0
            }
        },
        //Initializing Primary Y Axis
        primaryYAxis:
        {
            lineStyle: { width: 0},
            majorTickLines: {width: 0},
            labelFormat: '{value}%',
            edgeLabelPlacement: 'Shift'
        },
        //Initializing Chart Series
        series: [
            {
                type: 'StackingBar',
                dataSource: [{ x: 'Jan', y: 6 }, { x: 'Feb', y: 8 }, { x: 'Mar', y: 12 }, { x: 'Apr', y: 15.5 },
                { x: 'May', y: 20 }, { x: 'Jun', y: 24 }],
                name: 'Apple',
                xName: 'x', width: 2,
                yName: 'y'
            },
            {
                type: 'StackingBar',
                dataSource: [{ x: 'Jan', y: 6 }, { x: 'Feb', y: 8 }, { x: 'Mar', y: 11 }, { x: 'Apr', y: 16 },
                { x: 'May', y: 21 }, { x: 'Jun', y: 25 }],
                name: 'Orange',
                xName: 'x', width: 2,
                yName: 'y'
            },
            {
                type: 'StackingBar',
                dataSource: [{ x: 'Jan', y: -1 }, { x: 'Feb', y: -1.5 }, { x: 'Mar', y: -2 }, { x: 'Apr', y: -2.5 },
                { x: 'May', y: -3 }, { x: 'Jun', y: -3.5 }],
                name: 'Wastage', width: 2,
                xName: 'x',
                yName: 'y'

            }
        ],

        //Initializing Chart title
        title: 'Sales Comparison',
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