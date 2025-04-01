import { loadCultureFiles } from '../common/culture-loader';
import { Chart, RangeColumnSeries, Category, Tooltip, ILoadedEventArgs, DataLabel } from '@syncfusion/ej2-charts';
Chart.Inject(RangeColumnSeries, Category, Tooltip, DataLabel);
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';

/**
 * Sample for RangeColumn series 
 */
let rangeColumnData: Object[] = [
    { month: 'Jan', min: 22.75, max: 41.02, text: 'January' },
    { month: 'Feb', min: 29.71, max: 51.93, text: 'February' },
    { month: 'Mar', min: 33.53, max: 56.39, text: 'March' },
    { month: 'Apr', min: 41.22, max: 66.06, text: 'April' },
    { month: 'May', min: 49.87, max: 74.64, text: 'May' },
    { month: 'Jun', min: 59.02, max: 84.58, text: 'June' },
    { month: 'Jul', min: 62.94, max: 88.43, text: 'July' },
    { month: 'Aug', min: 61.27, max: 86.72, text: 'August' },
    { month: 'Sep', min: 55.36, max: 81.86, text: 'September' },
    { month: 'Oct', min: 44.76, max: 73.13, text: 'October' },
    { month: 'Nov', min: 34.79, max: 55.54, text: 'November' },
    { month: 'Dec', min: 28.04, max: 48.36, text: 'December' }
];
(window as any).default = (): void => {
    loadCultureFiles();

    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'Category',
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 }
        },
        //Initializing Primary Y Axis
        primaryYAxis: {
            labelFormat: '{value}°F',
            minimum: 0,
            maximum: 100,
            interval: 20,
            edgeLabelPlacement: 'Shift',
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 },
            title: 'Monthly Temperature Variation (°F)'
        },
        chartArea: {
            border: {
                width: 0
            }
        },
        //Initializing Chart Series
        series: [
            {
                type: 'RangeColumn', xName: 'month', high: 'max', low: 'min', columnSpacing: 0.4,
                marker: { dataLabel: { visible: true, position: 'Outer' } }, tooltipMappingName: 'text',
                dataSource: rangeColumnData, cornerRadius: { topLeft: 4, topRight: 4, bottomLeft: 4, bottomRight: 4 }
            }
        ],
        tooltip: {
            enable: true,
            header: '<b>${point.tooltip}</b>',
            format: 'Temperature : <b>${point.low} - ${point.high}</b>'
        },
        width: Browser.isDevice ? '100%' : '75%',
        //Initializing Chart Title
        title: 'Contiguous U.S. Average Temperature in 2024',
        subTitle: 'Source: ncei.noaa.gov',
        legendSettings: { visible: false },
        load: (args: ILoadedEventArgs) => {
            loadChartTheme(args);
        }
    });
    chart.appendTo('#container');
};
