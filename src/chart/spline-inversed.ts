import { loadCultureFiles } from '../common/culture-loader';
import { Chart, SplineSeries, Category, Legend, Tooltip, ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
Chart.Inject(SplineSeries, Category, Legend, Tooltip);

/**
 * Sample for Inversed Spline Series
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            interval: 4, title: 'Years', minimum: 2000, maximum: 2016, labelIntersectAction: 'Rotate90', majorTickLines: { width: 0 }
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
            labelFormat: '{value}M', minimum: 0, title: 'Sales (In Millions)', maximum: 25, interval: 5,edgeLabelPlacement: 'Shift'
        },

        //Initializing Chart Series
        series: [
            {
                type: 'Spline',
                dataSource: [
                    { Month: 2000, LDN_Temperature: -1, FR_Temperature: 10 }, { Month: 2002, LDN_Temperature: -1, FR_Temperature: 7 }, { Month: 2004, LDN_Temperature: 25, FR_Temperature: 13 },
                    { Month: 2005, LDN_Temperature: 31, FR_Temperature: 16 }, { Month: 2007, LDN_Temperature: 14, FR_Temperature: 11 }, { Month: 2010, LDN_Temperature: 8, FR_Temperature: 10 },
                    { Month: 2011, LDN_Temperature: 8, FR_Temperature: 15 }, { Month: 2013, LDN_Temperature: 8, FR_Temperature: 20 }, { Month: 2014, LDN_Temperature: 8, FR_Temperature: 17 },
                    { Month: 2015, LDN_Temperature: 8, FR_Temperature: 5 }
                ],
                width:2,
                marker:{ visible: true, width: 7, height: 7, isFilled: true },
                xName: 'Month',
                yName: 'FR_Temperature',
                name: 'Rate'
            },
        ],

        //Initializing Chart title
        title: 'Music Album Sales',
        //Initializing User Interaction Tooltip
        tooltip: {
            enable: true , shared:true, header:'<b>Album Sale</b>', format:'${point.x}: <b>${point.y}</b>'
        },
        legendSettings:{visible:false},
        width: Browser.isDevice ? '100%' : '75%',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        }
    });
    chart.appendTo('#container');
};