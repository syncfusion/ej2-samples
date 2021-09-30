import { loadCultureFiles } from '../common/culture-loader';
import { Chart, LineSeries, ColumnSeries, Category, DataEditing, Legend, Tooltip,
    ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
Chart.Inject(LineSeries, ColumnSeries, Category, Legend, Tooltip, DataEditing);
/**
 * Sample for Data Editing
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({
        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'Category',
            minimum: -0.5,
            maximum: 6.5,
            labelPlacement: 'OnTicks',
            majorGridLines: { width: 0 },
        },
        //Initializing Primary Y Axis
        primaryYAxis:
        {
            rangePadding: 'None',
            minimum: 0,
            title : 'Sales',
            labelFormat: '{value}%',
            maximum: 100,
            interval: 20,
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
                dragSettings: { enable: true },
                type: 'Column',
                dataSource: [
                    { x: '2005', y: 21 }, { x: '2006', y: 60 },
                    { x: '2007', y: 45 }, { x: '2008', y: 50 },
                    { x: '2009', y: 74 }, { x: '2010', y: 65 },
                    { x: '2011', y: 85 }
                ],
                xName: 'x', width: 2, marker: {
                    visible: true,
                    width: 10,
                    height: 10
                },
                yName: 'y', name: 'Product A'
            },
            {
                type: 'Line',
                dataSource: [
                    { x: '2005', y: 21 }, { x: '2006', y: 22 },
                    { x: '2007', y: 36 }, { x: '2008', y: 34 },
                    { x: '2009', y: 54 }, { x: '2010', y: 55 },
                    { x: '2011', y: 60 }
                ],
                dragSettings: { enable: true },
                xName: 'x', width: 2, marker: {
                    visible: true,
                    width: 10,
                    height: 10
                },
                yName: 'y', name: 'Product B'
            },

        ],
        //Initializing Chart title
        title: 'Sales Prediction of Products',
        //Initializing User Interaction Tooltip
        tooltip: {
            enable: true
        },
        width: Browser.isDevice ? '100%' : '80%',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
        }
    });
    chart.appendTo('#dataediting');
};
