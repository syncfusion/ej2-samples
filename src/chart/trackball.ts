import { Marker, Tooltip, Crosshair, DateTime, ILoadedEventArgs } from '@syncfusion/ej2-charts';
import { Chart, LineSeries, Legend } from '@syncfusion/ej2-charts';
import { john, andrew, thomas, mark, william } from './trackball-data';
Chart.Inject(LineSeries, DateTime, Tooltip, Crosshair, Marker, Legend);

/**
 * TrackBall Sample
 */
this.default = (): void => {
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            title: 'Years',
            minimum: new Date(2000, 1, 1), maximum: new Date(2006, 2, 11),
            intervalType: 'Years',
            valueType: 'DateTime',
            lineStyle: { width: 0 },
            majorGridLines: { width: 0 },
            edgeLabelPlacement: 'Shift'
        },

        //Initializing Primary Y Axis
        primaryYAxis:
        {
            title: 'Revenue in Millions',
            labelFormat: '{value}M',
            majorTickLines: { width: 0 },
            minimum: 10, maximum: 90,
            lineStyle: { width: 0 }
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
            },
            {
                type: 'Line',
                dataSource: mark,
                name: 'Mark',
                xName: 'x', width: 2,
                yName: 'y',
                marker: { visible: true }
            },
            {
                type: 'Line',
                dataSource: william,
                name: 'William',
                xName: 'x', width: 2,
                yName: 'y',
                marker: { visible: true }
            }
        ],
        tooltip: { enable: true, shared: true, format: '${series.name} : ${point.x} : ${point.y}' },
        crosshair: { enable: true, lineType: 'Vertical' },
        //Initializing Chart title
        title: 'Average Sales per Person',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            args.chart.theme = (selectedTheme && selectedTheme.indexOf('fabric') > -1) ? 'Fabric' : 'Material';
        }
    });
    chart.appendTo('#container');
};