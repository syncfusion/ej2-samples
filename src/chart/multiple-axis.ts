import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart, LineSeries, ChartAnnotation, ColumnSeries,
    Category, Tooltip, ILoadedEventArgs, ChartTheme, SplineSeries
} from '@syncfusion/ej2-charts';
Chart.Inject(LineSeries, ColumnSeries, Category, Tooltip, ChartAnnotation, SplineSeries);
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';

/**
 * Sample for Multiple Axes
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'Category',
            interval: 1,
            labelIntersectAction: 'Rotate90',
            lineStyle: { width: 0 },
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 }
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
            content: '<div id="chart_cloud"><img src="src/chart/images/cloud.png" alt="Cloud Picture" style="width: 41px; height: 41px"/></div>',
            x: 'Sun', y: 35, coordinateUnits: 'Point', verticalAlignment: 'Top'
        }, {
            content: '<div id="chart_cloud"><img src="src/chart/images/sunny.png" alt="Sunny Picture" style="width: 41px; height: 41px"/></div>',
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
                name: 'Germany', marker: { visible: true, height: 7, width: 7}
            },
            {
                type: 'Spline',
                dataSource: [
                    { x: 'Sun', y: 30 }, { x: 'Mon', y: 28 },
                    { x: 'Tue', y: 29 }, { x: 'Wed', y: 30 }, { x: 'Thu', y: 33 }, { x: 'Fri', y: 32 },
                    { x: 'Sat', y: 34 }
                ],
                xName: 'x', yName: 'y',
                width: 2, yAxisName: 'yAxis',
                name: 'Japan',
                marker: { visible: true, width: 7, height: 7, isFilled: true }
            }
        ],

        //Initializing Chart title
        //Initializing User Interaction Tooltip
        title: 'Weather Data',
        tooltip: { enable: true, enableHighlight: true },
        legendSettings: {
            visible: false
        },
        width: Browser.isDevice ? '100%' : '75%',
        // custom code start
        load: (args: ILoadedEventArgs) => {
            loadChartTheme(args);
        }
        // custom code end
    });
    chart.appendTo('#container');
};