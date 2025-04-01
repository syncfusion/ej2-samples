import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart, ColumnSeries, Category, Legend, 
    Tooltip, DataLabel, ILoadedEventArgs, ChartTheme
} from '@syncfusion/ej2-charts';
Chart.Inject(ColumnSeries, Category, Legend, Tooltip, DataLabel);
import { loadChartTheme, pointRender } from './theme-color';
import { Browser } from '@syncfusion/ej2-base';
/**
 * Sample for invesed axis
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({
        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'Category',
            opposedPosition: true,
            isInversed: true,
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 }
        },

        //Initializing Primary Y Axis   
        primaryYAxis:
        {
            edgeLabelPlacement: 'Shift',
            labelIntersectAction: 'Rotate45',
            isInversed: true,
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 },
            labelStyle: {
                color: 'transparent'
            }
        },
        pointRender: pointRender,
        chartArea: {
            border: {
                width: 0
            }
        },
        //Initializing Chart Series
        series: [
            {
                type: 'Column',
                dataSource: [
                    { x: '2008', y: 1.5 }, { x: '2009', y: 7.6 }, { x: '2010', y: 11 },
                    { x: '2011', y: 16.2 }, { x: '2012', y: 18 }, { x: '2013', y: 21.4 },
                    { x: '2014', y: 16 }, { x: '2015', y: 17.1 }
                ],
                marker: { dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } },
                xName: 'x',
                yName: 'y',
                width: 2,
                name: 'Rate'
            },
        ],
        //Initializing User Interaction Tooltip
        tooltip: {
            enable: true
        },
        legendSettings: { visible: false },
        //Initializing Chart Title
        title: 'Exchange Rate (INR per USD)',
        width: Browser.isDevice ? '100%' : '75%',
        load: (args: ILoadedEventArgs) => {
            loadChartTheme(args);
        }
    });
    chart.appendTo('#container');
};