import { Chart, LineSeries, DateTime, Legend, Tooltip, ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
Chart.Inject(LineSeries, DateTime, Legend, Tooltip);

/**
 * Sample for Line series
 */
this.default = (): void => {
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
                valueType: 'DateTime',
                labelFormat: 'y',
                intervalType: 'Years',
                edgeLabelPlacement: 'Shift',
                majorGridLines: { width: 0 }
        },

        //Initializing Primary Y Axis
        primaryYAxis:
        {
            labelFormat: '{value}%',
            rangePadding: 'None',
            minimum: 0,
            maximum: 100,
            interval: 20,
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 }
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
                dataSource: [
                    { x: new Date(2005, 0, 1), y: 21 }, { x: new Date(2006, 0, 1), y: 24 },
                    { x: new Date(2007, 0, 1), y: 36 }, { x: new Date(2008, 0, 1), y: 38 },
                    { x: new Date(2009, 0, 1), y: 54 }, { x: new Date(2010, 0, 1), y: 57 },
                    { x: new Date(2011, 0, 1), y: 70 }
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
                    { x: new Date(2005, 0, 1), y: 28 }, { x: new Date(2006, 0, 1), y: 44 },
                    { x: new Date(2007, 0, 1), y: 48 }, { x: new Date(2008, 0, 1), y: 50 },
                    { x: new Date(2009, 0, 1), y: 66 }, { x: new Date(2010, 0, 1), y: 78 }, { x: new Date(2011, 0, 1), y: 84 }
                ],
                xName: 'x', width: 2, marker: {
                    visible: true,
                    width: 10,
                    height: 10
                },
                yName: 'y', name: 'England',
            }
        ],

        //Initializing Chart title
        title: 'Inflation - Consumer Price',
        //Initializing User Interaction Tooltip
        tooltip: {
            enable: true
        },
        width : Browser.isDevice ? '100%' : '60%',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        }
    });
    chart.appendTo('#container');
};