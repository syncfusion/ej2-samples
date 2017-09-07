import { Chart, LineSeries, Marker, DateTime, Legend, Tooltip, ILoadedEventArgs } from '@syncfusion/ej2-charts';
Chart.Inject(LineSeries, DateTime, Marker, Legend, Tooltip);

/**
 * Line Series
 */
this.default = (): void => {
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            title: 'Years',
            valueType: 'DateTime',
            labelFormat: 'y',
            intervalType: 'Years',
            edgeLabelPlacement: 'Shift'
        },

        //Initializing Primary Y Axis
        primaryYAxis:
        {
            title: 'Percentage (%)',
            labelFormat: '{value}%',
            rangePadding: 'None'
        },

        //Initializing Chart Series
        series: [
            {
                type: 'Line',
                dataSource: [
                    { x: new Date(2005, 0, 1), y: 28 }, { x: new Date(2006, 0, 1), y: 25 },
                    { x: new Date(2007, 0, 1), y: 26 }, { x: new Date(2008, 0, 1), y: 27 },
                    { x: new Date(2009, 0, 1), y: 32 }, { x: new Date(2010, 0, 1), y: 35 },
                    { x: new Date(2011, 0, 1), y: 30 }
                ],
                xName: 'x', width: 2, marker: {
                    visible: true,
                    width: 10,
                    height: 10
                },
                yName: 'y', name: 'Japan',
            },
            {
                type: 'Line',
                dataSource: [
                    { x: new Date(2005, 0, 1), y: 31 }, { x: new Date(2006, 0, 1), y: 28 },
                    { x: new Date(2007, 0, 1), y: 30 }, { x: new Date(2008, 0, 1), y: 36 },
                    { x: new Date(2009, 0, 1), y: 36 }, { x: new Date(2010, 0, 1), y: 39 },
                    { x: new Date(2011, 0, 1), y: 37 }
                ],
                xName: 'x', width: 2, marker: {
                    visible: true,
                    width: 10,
                    height: 10
                },
                yName: 'y', name: 'Germany',
            },
            {
                type: 'Line',
                dataSource: [
                    { x: new Date(2005, 0, 1), y: 36 }, { x: new Date(2006, 0, 1), y: 32 },
                    { x: new Date(2007, 0, 1), y: 34 }, { x: new Date(2008, 0, 1), y: 41 },
                    { x: new Date(2009, 0, 1), y: 42 }, { x: new Date(2010, 0, 1), y: 42 }, { x: new Date(2011, 0, 1), y: 43 }
                ],
                xName: 'x', width: 2, marker: {
                    visible: true,
                    width: 10,
                    height: 10
                },
                yName: 'y', name: 'England',
            },
            {
                type: 'Line',
                dataSource: [
                    { x: new Date(2005, 0, 1), y: 39 }, { x: new Date(2006, 0, 1), y: 36 },
                    { x: new Date(2007, 0, 1), y: 40 }, { x: new Date(2008, 0, 1), y: 44 },
                    { x: new Date(2009, 0, 1), y: 45 }, { x: new Date(2010, 0, 1), y: 50 },
                    { x: new Date(2011, 0, 1), y: 46 }
                ],
                xName: 'x', width: 2, marker: {
                    visible: true,
                    width: 10,
                    height: 10
                },
                yName: 'y', name: 'France',
            }
        ],

        //Initializing Chart title
        title: 'Inflation - Consumer Price',
        tooltip: { enable: true, format: '${series.name}<br>${point.x} : ${point.y}' },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            args.chart.theme = (selectedTheme && selectedTheme.indexOf('fabric') > -1) ? 'Fabric' : 'Material';
        }
    });
    chart.appendTo('#container');
};