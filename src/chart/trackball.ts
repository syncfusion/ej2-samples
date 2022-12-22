import { loadCultureFiles } from '../common/culture-loader';
import { Tooltip, Crosshair, DateTime, ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import { Chart, LineSeries, Legend } from '@syncfusion/ej2-charts';
import { john, andrew, thomas } from './trackball-data';
import { Browser } from '@syncfusion/ej2-base';
Chart.Inject(LineSeries, DateTime, Tooltip, Crosshair, Legend);

/**
 * Sample for TrackBall in chart
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            minimum: new Date(2000, 1, 1), maximum: new Date(2006, 2, 11),
            valueType: 'DateTime',
            skeleton: 'y',
            lineStyle: { width: 0 },
            majorGridLines: { width: 0 },
            edgeLabelPlacement: 'Shift'
        },

        //Initializing Primary Y Axis
        primaryYAxis:
        {
            title: 'Revenue',
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
                marker: { visible: true }
            },
            {
                type: 'Line',
                dataSource: andrew,
                name: 'Andrew',
                xName: 'x', width: 2,
                yName: 'y',
                marker: { visible: true }
            },
            {
                type: 'Line',
                dataSource: thomas,
                name: 'Thomas',
                xName: 'x', width: 2,
                yName: 'y',
                marker: { visible: true }
            }
        ],
        //Initializing User Interaction Tooltip and Crosshair
        tooltip: { enable: true, shared: true },
        crosshair: { enable: true, lineType: 'Vertical' },
        //Initializing Chart title
        title: 'Average Sales per Person',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
            args.chart.width = Browser.isDevice ? '100%' : '75%';
        }
    });
    chart.appendTo('#container');
};