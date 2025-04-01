import { loadCultureFiles } from '../common/culture-loader';
import { Chart, DateTime, Tooltip, ChartAnnotation } from '@syncfusion/ej2-charts';
import { ILoadedEventArgs, ChartTheme, MultiColoredAreaSeries } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';
Chart.Inject(DateTime, Tooltip, ChartAnnotation, MultiColoredAreaSeries);

/**
 * Sample for Line series
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let dataValues: Object[] = [];
    [150, 71.5, 106.4, 100.25, 70.0, 106.0, 85.6, 78.5, 76.4, 86.1, 155.6, 160.4].map((value: number, index: number) => {
        dataValues.push({ XValue: new Date(2016, index, 1), YValue: value });
    });
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'DateTime',
            labelFormat: 'MMM',
            intervalType: 'Months',
            minorTickLines: {width : 0},majorTickLines: {width: 0},
            majorGridLines: { width: 0 },
            interval: 1,
            labelRotation: Browser.isDevice ? -45 : 0,
            labelIntersectAction: Browser.isDevice? 'None' : 'Trim' 
        },

        //Initializing Primary Y Axis
        primaryYAxis:
            {
                labelFormat: '${value}K',
                rangePadding: 'None',
                minimum: 0,
                maximum: 200,
                interval: 50,
                lineStyle: { width: 0 },
                majorTickLines: { width: 0 },
                minorTickLines: { width: 0 }
            },
        chartArea: {
            border: {
                width: 0
            }
        },
        annotations: [
            {
                content: "<div style='color:#4ca1af; font-weight:bold; font-size: 14px;'>Winter</div>",
                region: 'Series',
                x: '18%',
                y: '43%'
            },
            {
                content: "<div style='color:#ffa751; font-weight:bold; font-size: 14px;'>Summer</div>",
                region: 'Series',
                x: '46%',
                y: '43%'
            },
            {
                content: "<div style='color:#1d976c; font-weight:bold; font-size: 14px;'>Spring</div>",
                region: 'Series',
                x: '90%',
                y: '18%'
            },

        ],
        legendSettings: { visible: false },
        //Initializing Chart Series
        series: [
            {
                dataSource: dataValues,
                segmentAxis: 'X',
                segments: [{
                    value: new Date(2016, 4, 1),
                    color: 'url(#winter)'
                }, {
                    value: new Date(2016, 8, 1),
                    color: 'url(#summer)'
                }, {
                    color: 'url(#spring)'
                }],
                name: 'US', xName: 'XValue', yName: 'YValue', type: 'MultiColoredArea'
            }
        ],
        //Initializing Chart title
        title: 'US Season Retail Sales Growth',
        //Initializing User Interaction Tooltip
        tooltip: {
            enable: true, header: '<b>Revenue</b>', format: '${point.x} : <b>${point.y}</b>', showNearestTooltip: true
        },
        width: Browser.isDevice ? '100%' : '75%',
        load: (args: ILoadedEventArgs) => {
            loadChartTheme(args);
        }
    });
    chart.appendTo('#container');
};