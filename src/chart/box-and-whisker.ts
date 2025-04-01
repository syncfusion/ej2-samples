import { loadCultureFiles } from '../common/culture-loader';
import {
    ChartTheme, Chart, Category, ILoadedEventArgs,
    BoxAndWhiskerSeries, Tooltip} from '@syncfusion/ej2-charts';
import { loadChartTheme, pointRender } from './theme-color';
Chart.Inject(Category, BoxAndWhiskerSeries, Tooltip);
import { Browser } from '@syncfusion/ej2/base';

/**
 * Sample for Box and Whisker series
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({
        //Initializing Primary X and Y Axis
        primaryXAxis: {
            valueType: 'Category', 
            majorGridLines: { width: 0 },
            labelIntersectAction: Browser.isDevice ? 'None' : 'Rotate45',
            labelRotation: Browser.isDevice ? -45 : 0,
            majorTickLines: { width: 0 },
        },
        chartArea: {
            border: {
                width: 0
            }
        },
        primaryYAxis:
        {
            minimum: 10, maximum: 60,
            interval: 10, title: 'Age',
            majorGridLines: { width: 1 },
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 }
        },
        pointRender: pointRender,
        //Initializing Chart Series
        series: [
            {
                type: 'BoxAndWhisker',
                dataSource: [
                    { x: 'Development', y: [22, 22, 23, 25, 25, 25, 26, 27, 27, 28, 28, 29, 30, 32, 34, 32, 34, 36, 35, 38] },
                    { x: 'Testing', y: [22, 33, 23, 25, 26, 28, 29, 30, 34, 33, 32, 31, 50] },
                    { x: 'Finance', y: [26, 27, 28, 30, 32, 34, 35, 37, 35, 37, 45] },
                    { x: 'R&D', y: [26, 27, 29, 32, 34, 35, 36, 37, 38, 39, 41, 43, 58] },
                    { x: 'Sales', y: [27, 26, 28, 29, 29, 29, 32, 35, 32, 38, 53] },
                    { x: 'Inventory', y: [21, 23, 24, 25, 26, 27, 28, 30, 34, 36, 38] },
                    { x: 'Graphics', y: [26, 28, 29, 30, 32, 33, 35, 36, 52] },
                    { x: 'Training', y: [28, 29, 30, 31, 32, 34, 35, 36] },
                    { x: 'HR', y: [22, 24, 25, 30, 32, 34, 36, 38, 39, 41, 35, 36, 40, 56] }
                ],
                xName: 'x',
                yName: 'y',
                marker: {
                    visible: true,
                    width: 7,
                    height: 7
                }, boxPlotMode: "Normal", showMean: true,
            }
        ],
        // Initializing the tooltip
        tooltip: {
            enable: true
        }, //Initializing Chart title
        width: Browser.isDevice ? '100%' : '70%',
        title: 'Employee Age Group in Various Department',
        load: (args: ILoadedEventArgs) => {
            loadChartTheme(args);
        },
        legendSettings: {
            visible: false
        }
    });
    chart.appendTo('#container');
};