import { Chart, LineSeries, ColumnSeries, Marker, Category, Legend, Tooltip, ILoadedEventArgs } from '@syncfusion/ej2-charts';
Chart.Inject(LineSeries, ColumnSeries, Category, Marker, Legend, Tooltip);

/**
 * Multiple Axes
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
            minimum: 0, maximum: 90, interval: 10,
            lineStyle: { width: 0 },
            title: 'Temperature (Fahrenheit)',
            labelFormat: '{value}°F'
        },

        // Initializing axes
        axes:
        [
            {
                majorGridLines: { width: 0 },
                rowIndex: 0, opposedPosition: true,
                lineStyle: { width: 0 },
                minimum: 24, maximum: 36, interval: 2,
                name: 'yAxis',
                title: 'Temperature (Celsius)',
                labelFormat: '{value}°C'
            }
        ],

        //Initializing Chart Series
        series: [
            {
                type: 'Column',
                dataSource: [
                    { x: 'Jan', y: 15 }, { x: 'Feb', y: 20 }, { x: 'Mar', y: 35 }, { x: 'Apr', y: 40 },
                    { x: 'May', y: 80 }, { x: 'Jun', y: 70 }, { x: 'Jul', y: 65 }, { x: 'Aug', y: 55 },
                    { x: 'Sep', y: 50 }, { x: 'Oct', y: 30 }, { x: 'Nov', y: 35 }, { x: 'Dec', y: 35 }
                ],
                width: 2,
                xName: 'x', yName: 'y',
                name: 'Germany',
            },
            {
                type: 'Line',
                dataSource: [
                    { x: 'Jan', y: 33 }, { x: 'Feb', y: 31 }, { x: 'Mar', y: 30 }, { x: 'Apr', y: 28 },
                    { x: 'May', y: 29 }, { x: 'Jun', y: 30 }, { x: 'Jul', y: 33 }, { x: 'Aug', y: 32 },
                    { x: 'Sep', y: 34 }, { x: 'Oct', y: 32 }, { x: 'Nov', y: 32 }, { x: 'Dec', y: 31 }
                ],
                xName: 'x', yName: 'y',
                width: 2, yAxisName: 'yAxis',
                name: 'Japan',
                marker: { visible: true, width: 10, height: 10, border: { width: 2, color: '#F8AB1D' } }
            }
        ],

        //Initializing Chart title
        title: 'Weather Condition',
        tooltip: { enable: true, format: '${series.name}<br>${point.x} : ${point.y}'},
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            args.chart.theme = selectedTheme.indexOf('fabric') > -1 ? 'Fabric' : 'Material';
        }
    });
    chart.appendTo('#container');
};