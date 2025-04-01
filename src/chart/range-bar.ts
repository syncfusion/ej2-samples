import { loadCultureFiles } from '../common/culture-loader';
import { Chart, RangeColumnSeries, Category, Tooltip, Legend, ILoadedEventArgs, DataLabel } from '@syncfusion/ej2-charts';
Chart.Inject(RangeColumnSeries, Category, Tooltip, Legend, DataLabel);
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';

/**
 * Sample fpr Range Bar
 */
let rangeBarData: Object[] = [
    { country: 'Solomon Islands', low: 44, high: 134 },
    { country: 'Tonga', low: 52, high: 131 },
    { country: 'Trinidad and Tobago', low: 36, high: 151 },
    { country: 'Samoa', low: 49, high: 131 },
    { country: 'Saint Lucia', low: 39, high: 148 },
    { country: 'Georgia', low: 68, high: 122 },
    { country: 'Peru', low: 56, high: 141 },
    { country: 'Grenada', low: 41, high: 147 },
    { country: 'Dominica', low: 46, high: 143 },
    { country: 'Ukraine', low: 64, high: 148 },
    { country: 'Colombia', low: 64, high: 134 }
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
            labelFormat: '{value}',
            minimum: 0,
            maximum: 200,
            interval: 20,
            edgeLabelPlacement: 'Shift',
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 },
            title: 'Growth in Visa-Free Destinations',
            labelRotation: Browser.isDevice ? -45 : 0
        },
        chartArea: {
            border: {
                width: 0
            }
        },
        //Initializing Chart Series
        series: [
            {
                type: 'RangeColumn', xName: 'country', high: 'high', low: 'low', columnSpacing: 0.4,
                marker: { dataLabel: { visible: true, position: 'Outer' } },
                dataSource: rangeBarData, cornerRadius: { topLeft: 4, topRight: 4, bottomLeft: 4, bottomRight: 4 }
            }
        ],
        isTransposed: true,
        tooltip: {
            enable: true,
            format: '${point.x}: <b>${point.low} - ${point.high}</b>'
        },
        width: Browser.isDevice ? '100%' : '75%',
        legendSettings: { visible: false },
        //Initializing Chart Title
        title: 'Global Passport Rankings: Growth in Visa-Free Access (2006–2024)',
        subTitle: 'Source: wikipedia.org',
        load: (args: ILoadedEventArgs) => {
            loadChartTheme(args);
        }
    });
    chart.appendTo('#container');
};
