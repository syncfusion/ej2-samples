import { loadCultureFiles } from '../common/culture-loader';
import { Chart, RangeColumnSeries, Category, Tooltip, Legend, ILoadedEventArgs, ChartTheme, DataLabel } from '@syncfusion/ej2-charts';
Chart.Inject(RangeColumnSeries, Category, Tooltip, Legend, DataLabel);
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample fpr Range Bar
 */
(window as any).default = (): void => {
    loadCultureFiles();

    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'Category',
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 },
        },

        //Initializing Primary Y Axis
        primaryYAxis: {
            labelFormat: '{value}˚F',title: 'Temperature (In Fahrenheit)',
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
                type: 'RangeColumn', name: 'California', xName: 'x', high: 'high',columnSpacing:0.1 ,tooltipMappingName:'text', low: 'low',marker:{
                    dataLabel: {
                       visible: true,
                       position: 'Outer',
                   }
               },
                dataSource: [
                    { x: 'Jan', low: 28, high: 72, text: 'January' },
                    { x: 'Feb', low: 25, high: 75, text: 'February' },
                    { x: 'Mar', low: 18, high: 65, text: 'March' },
                    { x: 'Apr', low: 22, high: 69, text: 'April' },
                    { x: 'May', low: 56, high: 87, text: 'May' },
                    { x: 'Jun', low: 48, high: 75, text: 'June' },
                    { x: 'Jul', low: 40, high: 78, text: 'July' },
                    { x: 'Aug', low: 35, high: 73, text: 'August' },
                    { x: 'Sep', low: 43, high: 64, text: 'September' },
                    { x: 'Oct', low: 38, high: 77, text: 'October' },
                    { x: 'Nov', low: 28, high: 54, text: 'November' },
                    { x: 'Dec', low: 29, high: 56, text: 'December' }
                ]
            }
        ],
        isTransposed: true,
        tooltip: {
            enable: true,
            header : "<b>${point.tooltip}</b>", format :"Temperature : <b>${point.low} - ${point.high}</b>"
        },
        width: Browser.isDevice ? '100%' : '75%',
        legendSettings: {visible:false},
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
