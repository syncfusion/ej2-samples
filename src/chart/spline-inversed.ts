import { Chart, SplineSeries, Category, Legend, Tooltip, ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
Chart.Inject(SplineSeries, Category, Legend, Tooltip);

/**
 * Sample for Inversed Spline Series
 */
this.default = (): void => {
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'Category',
            interval: 1,
            labelIntersectAction: 'Rotate90',
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 }
        },
        chartArea: {
            border: {
                width: 0
            }
        },
        isTransposed: true,
        //Initializing Primary Y Axis
        primaryYAxis:
        {
            minimum: -5,
            maximum: 35,
            interval: 10,
            labelFormat: '{value}°C',
            majorGridLines: { width: 0 }
        },

        //Initializing Chart Series
        series: [
            {
                type: 'Spline',
                dataSource: [
                    { x: 'Jan', y: -1 }, { x: 'Mar', y: 12 },
                    { x: 'Apr', y: 25 },
                    { x: 'Jun', y: 31 },
                    { x: 'Aug', y: 26 }, { x: 'Oct', y: 14 },
                    { x: 'Dec', y: 8 },
                ],
                xName: 'x', width: 2, marker: {
                    visible: true,
                    width: 10,
                    height: 10
                },
                yName: 'y', name: 'London',
            },
            {
                type: 'Spline',
                dataSource: [
                    { x: 'Jan', y: 7 }, { x: 'Mar', y: 2 },
                    { x: 'Apr', y: 13 },
                    { x: 'Jun', y: 21 },
                    { x: 'Aug', y: 26 }, { x: 'Oct', y: 10 },
                    { x: 'Dec', y: 0 },
                ],
                xName: 'x', width: 2, marker: {
                    visible: true,
                    width: 10,
                    height: 10
                },
                yName: 'y', name: 'France',
            }
        ],

        //Initializing Chart title
        title: 'Climate Graph - 2012',
        //Initializing User Interaction Tooltip
        tooltip: {
            enable: true
        },
        width: Browser.isDevice ? '100%' : '60%',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        }
    });
    chart.appendTo('#container');
};