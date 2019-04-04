import { loadCultureFiles } from '../common/culture-loader';
import { Chart, DateTime, Tooltip, ChartAnnotation } from '@syncfusion/ej2-charts';
import { ILoadedEventArgs, ChartTheme, MultiColoredAreaSeries } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
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
            edgeLabelPlacement: 'Shift',
            majorGridLines: { width: 0 }
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
                content: '#templateWrap',
                region: 'Series',
                x: '90%',
                y: '12%'
            }
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
        title: 'Organic Revenue in US - 2016',
        //Initializing User Interaction Tooltip
        tooltip: {
            enable: true
        },
        width: Browser.isDevice ? '100%' : '60%',
        // custom code start
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/dark/i, 'Dark').replace(/light/i, 'Light');
        }
        // custom code end
    });
    chart.appendTo('#container');
};