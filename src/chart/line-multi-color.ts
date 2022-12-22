import { loadCultureFiles } from '../common/culture-loader';
import { ChartTheme, MultiColoredLineSeries } from '@syncfusion/ej2-charts';
import { Chart, DateTime, Tooltip, ILoadedEventArgs } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { rainFallData } from './financial-data';
Chart.Inject(DateTime, Tooltip, MultiColoredLineSeries);

/**
 * Sample for Line series
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let dataValues: Object[] = [];
    let colors: string[] = ['red', 'green', '#ff0097', 'crimson', 'blue', 'darkorange', 'deepskyblue',
        'mediumvioletred', 'violet', 'peru', 'gray', 'deeppink', 'navy'];
    rainFallData.map((value: number, index: number) => {
        dataValues.push({
            XValue: new Date(2017, -index, 1), YValue: value.toFixed(2),
            color: colors[Math.floor(index / 16)]
        });
    });
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'DateTime',labelFormat: 'y',intervalType: 'Years',edgeLabelPlacement: 'Shift',majorGridLines: { width: 0 } ,
        },

        //Initializing Primary Y Axis
        primaryYAxis:
            {
                rangePadding: 'None',minimum: 4,maximum: 10,title: 'Particulate Matter(PM)',lineStyle: { width: 0 },majorTickLines: { width: 0 },minorTickLines: { width: 0 }
            },
        chartArea: {
            border: {
                width: 0
            }
        },
        //Initializing Chart Series
        series: [
            {
                dataSource: dataValues,
                width: 1.5,
                name: 'Rainfall', xName: 'XValue', yName: 'YValue', pointColorMapping: 'color',
                type: 'MultiColoredLine'
            }
        ],
        legendSettings: { visible: false },

        //Initializing Chart title
        title: 'Particulate Levels in Rainfall',
        //Initializing User Interaction Tooltip
        tooltip: {
            enable: true, shared: true, enableAnimation: false, header:'<b>Rainfall</b>', format: '${point.x} : <b>${point.y}'
        },
        width: Browser.isDevice ? '100%' : '75%',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
        }
    });
    chart.appendTo('#container');
};