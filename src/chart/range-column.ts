import { loadCultureFiles } from '../common/culture-loader';
import { Chart, RangeColumnSeries, Category, Tooltip, Legend, ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
Chart.Inject(RangeColumnSeries, Category, Tooltip, Legend);
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for RangeColumn series
 */
(window as any).default = (): void => {
    loadCultureFiles();

    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'Category',
            majorGridLines: { width: 0 }
        },

        //Initializing Primary Y Axis
        primaryYAxis: {
            labelFormat: '{value}˚C',
            maximum: 20,
            edgeLabelPlacement: 'Shift',
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 }
        },
        chartArea: {
            border: {
                width: 0
            }
        },
        //Initializing Chart Series
        series: [
            {
                type: 'RangeColumn', name: 'India', xName: 'x', high: 'high', low: 'low',
                dataSource: [
                    { x: 'Sun', low: 3.1, high: 10.8 },
                    { x: 'Mon', low: 5.7, high: 14.4 }, { x: 'Tue', low: 8.4, high: 16.9 },
                    { x: 'Wed', low: 10.6, high: 19.2 },
                    { x: 'Thu', low: 8.5, high: 16.1 }, { x: 'Fri', low: 6.0, high: 12.5 },
                    { x: 'Sat', low: 1.5, high: 6.9 }
                ],
            }, {
                type: 'RangeColumn', name: 'Germany', xName: 'x', high: 'high', low: 'low',
                dataSource: [
                    { x: 'Sun', low: 2.5, high: 9.8 },
                    { x: 'Mon', low: 4.7, high: 11.4 }, { x: 'Tue', low: 6.4, high: 14.4 },
                    { x: 'Wed', low: 9.6, high: 17.2 },
                    { x: 'Thu', low: 7.5, high: 15.1 }, { x: 'Fri', low: 3.0, high: 10.5 },
                    { x: 'Sat', low: 1.2, high: 7.9 }
                ]
            }
        ],
        tooltip: {
            enable: true
        },
        width: Browser.isDevice ? '100%' : '60%',
        //Initializing Chart Title
        title: 'Temperature Variation',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
        }
    });
    chart.appendTo('#container');
};
