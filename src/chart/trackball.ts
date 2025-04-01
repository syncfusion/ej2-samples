import { loadCultureFiles } from '../common/culture-loader';
import { Tooltip, Crosshair, DateTime, ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import { Chart, LineSeries, Legend, Highlight } from '@syncfusion/ej2-charts';
import { john, andrew, thomas } from './trackball-data';
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';
Chart.Inject(LineSeries, DateTime, Tooltip, Crosshair, Legend ,Highlight);

/**
 * Sample for TrackBall in chart
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'DateTime',
            labelFormat: 'yyyy',
            intervalType: 'Years',
            majorGridLines: { width: 0 },
            edgeLabelPlacement: 'Shift'
        },

        //Initializing Primary Y Axis
        primaryYAxis:
        {
            title: 'Revenue (in Million)',
            rangePadding: 'None',
            edgeLabelPlacement: 'Shift',
            labelFormat: '{value}M',
            majorTickLines: { width: 0 },
            minimum: 10, maximum: 80,
            lineStyle: { width: 0 },
        },
        chartArea: {
            border: {
                width: 0
            }
        },
        //Initializing Chart Series
        series: [
            {
                type: 'Line',
                dataSource: john,
                name: 'John',
                xName: 'x', width: 2,
                yName: 'y',
                marker: { visible: true , height : 7, width: 7, isFilled: true}
            },
            {
                type: 'Line',
                dataSource: andrew,
                name: 'Andrew',
                xName: 'x', width: 2,
                yName: 'y',
                marker: { visible: true , height : 7, width: 7, isFilled: true}
            },
            {
                type: 'Line',
                dataSource: thomas,
                name: 'Thomas',
                xName: 'x', width: 2,
                yName: 'y',
                marker: { visible: true , height : 7, width: 7, isFilled: true}
            }
        ],
        //Initializing User Interaction Tooltip and Crosshair
        tooltip: { enable: true, shared: true },
        legendSettings: { enableHighlight: true },
        crosshair: { enable: true, lineType: 'Vertical' },
        //Initializing Chart title
        title: 'Average Sales per Person',
        load: (args: ILoadedEventArgs) => {
            loadChartTheme(args);
            args.chart.width = Browser.isDevice ? '100%' : '75%';
        }
    });
    chart.appendTo('#container');
};