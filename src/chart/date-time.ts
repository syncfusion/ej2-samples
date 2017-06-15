import { Chart, LineSeries, DateTime, Legend, Marker, DataLabel } from '@syncfusion/ej2-charts';
Chart.Inject(LineSeries, DateTime, Legend, Marker, DataLabel);

/**
 * DateTime Axis
 */
this.default = (): void => {
    let chart: Chart = new Chart({
        //Initializing Primary X Axis
        primaryXAxis: {
            title: 'Months',
            valueType: 'DateTime',
            labelFormat: 'yMMM',
            edgeLabelPlacement: 'Shift'
        },

        //Initializing Primary Y Axis
        primaryYAxis:
        {
            title: 'Temperature (Celsius)',
            minimum: -20,
            maximum: 25,
            interval: 5,
            edgeLabelPlacement: 'Shift',
            labelFormat: '{value}°C'
        },

        //Initializing Chart Series
        series: [
            {
                type: 'Line',
                dataSource: [
                    { x: new Date(2016, 0, 1), y: -7.1 }, { x: new Date(2016, 1, 1), y: -3.7 },
                    { x: new Date(2016, 2, 1), y: 0.8 }, { x: new Date(2016, 3, 1), y: 6.3 },
                    { x: new Date(2016, 4, 1), y: 13.3 }, { x: new Date(2016, 5, 1), y: 18.0 },
                    { x: new Date(2016, 6, 1), y: 19.8 }, { x: new Date(2016, 7, 1), y: 18.1 },
                    { x: new Date(2016, 8, 1), y: 13.1 }, { x: new Date(2016, 9, 1), y: 4.1 },
                    { x: new Date(2016, 10, 1), y: -3.8 }, { x: new Date(2016, 11, 1), y: -6.8 },
                ],
                xName: 'x', width: 2,
                yName: 'y', name: 'Warmest',
                marker: {
                    visible: true,
                    height: 10, width: 10,
                    shape: 'Pentagon',
                    dataLabel: { visible: true, position: 'Top' }
                }
            }, {
                type: 'Line',
                dataSource: [
                    { x: new Date(2016, 0, 1), y: -17.4 }, { x: new Date(2016, 1, 1), y: -15.6 },
                    { x: new Date(2016, 2, 1), y: -12.3 }, { x: new Date(2016, 3, 1), y: -5.3 },
                    { x: new Date(2016, 4, 1), y: 1.0 }, { x: new Date(2016, 5, 1), y: 6.9 },
                    { x: new Date(2016, 6, 1), y: 9.4 }, { x: new Date(2016, 7, 1), y: 7.6 },
                    { x: new Date(2016, 8, 1), y: 2.6 }, { x: new Date(2016, 9, 1), y: -4.9 },
                    { x: new Date(2016, 10, 1), y: -13.4 }, { x: new Date(2016, 11, 1), y: -16.4 },
                ],
                xName: 'x', width: 2,
                yName: 'y', name: 'Coldest',
                marker: {
                    visible: true, height: 10, width: 10, shape: 'Diamond',
                    dataLabel: { visible: true, position: 'Bottom' }
                }
            }
        ],

        //Initializing Chart title
        title: 'Alaska Weather Statistics - 2016'
    });
    chart.appendTo('#container');
};