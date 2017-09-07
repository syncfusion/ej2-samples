import { Chart, SplineSeries, Marker, Category, Legend, Tooltip, ILoadedEventArgs } from '@syncfusion/ej2-charts';
Chart.Inject(SplineSeries, Category, Marker, Legend, Tooltip);

/**
 * Spline Series
 */
this.default = (): void => {
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            title: 'Months',
            valueType: 'Category',
            interval: 1,
            labelIntersectAction : 'Rotate90'
        },

        //Initializing Primary Y Axis
        primaryYAxis:
        {
            title: 'Temperature (Celsius)',
            minimum: 0,
            maximum: 35,
            interval: 5,
            labelFormat: '{value}°C'
        },

        //Initializing Chart Series
        series: [
            {
                type: 'Spline',
                dataSource: [
                    { x: 'Jan', y: 7 }, { x: 'Feb', y: 10 },
                    { x: 'Mar', y: 19 }, { x: 'Apr', y: 22 },
                    { x: 'May', y: 25 }, { x: 'Jun', y: 32 },
                    { x: 'Jul', y: 33 }, { x: 'Aug', y: 31 },
                    { x: 'Sep', y: 29 }, { x: 'Oct', y: 24 },
                    { x: 'Nov', y: 18 }, { x: 'Dec', y: 10 }
                ],
                xName: 'x', width: 2, marker: {
                    visible: true,
                    width: 10,
                    height: 10,
                    opacity: 0.6
                },
                yName: 'y', name: 'Max Temp',
            },
            {
                type: 'Spline',
                dataSource: [
                    { x: 'Jan', y: 4 }, { x: 'Feb', y: 7 },
                    { x: 'Mar', y: 15 }, { x: 'Apr', y: 18 },
                    { x: 'May', y: 22 }, { x: 'Jun', y: 28 },
                    { x: 'Jul', y: 29 }, { x: 'Aug', y: 28 },
                    { x: 'Sep', y: 26 }, { x: 'Oct', y: 20 },
                    { x: 'Nov', y: 15 }, { x: 'Dec', y: 8 }
                ],
                xName: 'x', width: 2, marker: {
                    visible: true,
                    width: 10,
                    height: 10,
                    opacity: 0.6
                },
                yName: 'y', name: 'Avg Temp',
            },
            {
                type: 'Spline',
                dataSource: [
                    { x: 'Jan', y: 0 }, { x: 'Feb', y: 3 },
                    { x: 'Mar', y: 10 }, { x: 'Apr', y: 12 },
                    { x: 'May', y: 16 }, { x: 'Jun', y: 22 },
                    { x: 'Jul', y: 23 }, { x: 'Aug', y: 23 },
                    { x: 'Sep', y: 19 }, { x: 'Oct', y: 13 },
                    { x: 'Nov', y: 8 }, { x: 'Dec', y: 5 }
                ],
                xName: 'x', width: 2, marker: {
                    visible: true,
                    width: 10,
                    height: 10,
                    opacity: 0.6
                },
                yName: 'y', name: 'Min Temp',
            }
        ],

        //Initializing Chart title
        title: 'NC Weather Report - 2016',
        tooltip: { enable: true, format: '${series.name} (°c)<br>${point.x} : ${point.y}' },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            args.chart.theme = (selectedTheme && selectedTheme.indexOf('fabric') > -1) ? 'Fabric' : 'Material';
        }
    });
    chart.appendTo('#container');
};