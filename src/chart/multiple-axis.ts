import {
    Chart, LineSeries, ChartAnnotation, ColumnSeries,
    Category, Tooltip, ILoadedEventArgs, ChartTheme
} from '@syncfusion/ej2-charts';
Chart.Inject(LineSeries, ColumnSeries, Category, Tooltip, ChartAnnotation);
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Multiple Axes
 */
this.default = (): void => {
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'Category',
            interval: 1,
            labelIntersectAction: 'Rotate90',
            majorGridLines: { width: 0 },
        },

        //Initializing Primary Y Axis
        primaryYAxis:
        {
            minimum: 0, maximum: 100, interval: 20,
            lineStyle: { width: 0 },
            labelFormat: '{value}°F'
        },
        chartArea: {
            border: {
                width: 0
            }
        },
        // Initializing axes
        axes:
        [
            {
                majorGridLines: { width: 0 },
                rowIndex: 0, opposedPosition: true,
                lineStyle: { width: 0 }, majorTickLines: { width: 0 },
                minimum: 24, maximum: 36, interval: 2,
                name: 'yAxis', minorTickLines: { width: 0 },
                labelFormat: '{value}°C'
            }
        ],
        annotations: [{
            content: '<div id="chart_cloud"><img src="src/chart/images/cloud.png"  style="width: 41px; height: 41px"/></div>',
            x: 'Sun', y: 35, coordinateUnits: 'Point', verticalAlignment: 'Top'
        }, {
            content: '<div id="chart_cloud"><img src="src/chart/images/sunny.png"  style="width: 41px; height: 41px"/></div>',
            x: 'Sat', y: 34, coordinateUnits: 'Point', yAxisName: 'yAxis'
        }],
        //Initializing Chart Series
        series: [
            {
                type: 'Column',
                dataSource: [
                    { x: 'Sun', y: 35 }, { x: 'Mon', y: 40 },
                    { x: 'Tue', y: 80 }, { x: 'Wed', y: 70 }, { x: 'Thu', y: 65 }, { x: 'Fri', y: 55 },
                    { x: 'Sat', y: 50 }
                ],
                width: 2,
                xName: 'x', yName: 'y',
                name: 'Germany',
            },
            {
                type: 'Line',
                dataSource: [
                    { x: 'Sun', y: 30 }, { x: 'Mon', y: 28 },
                    { x: 'Tue', y: 29 }, { x: 'Wed', y: 30 }, { x: 'Thu', y: 33 }, { x: 'Fri', y: 32 },
                    { x: 'Sat', y: 34 }
                ],
                xName: 'x', yName: 'y',
                width: 2, yAxisName: 'yAxis',
                name: 'Japan',
                marker: { visible: true, width: 10, height: 10, border: { width: 2, color: '#F8AB1D' } }
            }
        ],

        //Initializing Chart title
        title: 'Weather Condition JPN vs DEU',
        //Initializing User Interaction Tooltip
        tooltip: { enable: true },
        legendSettings: {
            visible: false
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