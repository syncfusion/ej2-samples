import { Chart, StepLineSeries, Marker, DateTime, Legend, Tooltip, ILoadedEventArgs } from '@syncfusion/ej2-charts';
Chart.Inject(StepLineSeries, Marker, DateTime, Legend, Tooltip);

/**
 * StepLine Series
 */
this.default = (): void => {
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            title: 'Years',
            lineStyle: { width: 0 },
            labelFormat: 'y',
            intervalType: 'Years',
            valueType: 'DateTime',
            edgeLabelPlacement: 'Shift'
        },

        //Initializing Primary Y Axis
        primaryYAxis:
        {
            title: 'Percentage (%)',
            minimum: 0,
            maximum: 20,
            interval: 2,
            labelFormat: '{value}%'
        },

        //Initializing Chart Series
        series: [
            {
                type: 'StepLine',
                dataSource: [
                    { x: new Date(1975, 0, 1), y: 16 },
                    { x: new Date(1980, 0, 1), y: 12.5 },
                    { x: new Date(1985, 0, 1), y: 19 },
                    { x: new Date(1990, 0, 1), y: 14.4 },
                    { x: new Date(1995, 0, 1), y: 11.5 },
                    { x: new Date(2000, 0, 1), y: 14 },
                    { x: new Date(2005, 0, 1), y: 10 },
                    { x: new Date(2010, 0, 1), y: 16 }],
                xName: 'x', width: 2,
                yName: 'y', name: 'China',
                marker: {
                    visible: true,
                    width: 10,
                    height: 10
                },
            },
            {
                type: 'StepLine',
                dataSource: [
                    { x: new Date(1975, 0, 1), y: 10 },
                    { x: new Date(1980, 0, 1), y: 7.5 },
                    { x: new Date(1985, 0, 1), y: 11 },
                    { x: new Date(1990, 0, 1), y: 7 },
                    { x: new Date(1995, 0, 1), y: 8 },
                    { x: new Date(2000, 0, 1), y: 6 },
                    { x: new Date(2005, 0, 1), y: 3.5 },
                    { x: new Date(2010, 0, 1), y: 7 }],
                xName: 'x', width: 2,
                yName: 'y', name: 'Australia',
                marker: {
                    visible: true,
                    width: 10,
                    height: 10
                },
            },
            {
                type: 'StepLine',
                dataSource: [
                    { x: new Date(1975, 0, 1), y: 4.5 },
                    { x: new Date(1980, 0, 1), y: 5 },
                    { x: new Date(1985, 0, 1), y: 6.5 },
                    { x: new Date(1990, 0, 1), y: 4.4 },
                    { x: new Date(1995, 0, 1), y: 5 },
                    { x: new Date(2000, 0, 1), y: 1.5 },
                    { x: new Date(2005, 0, 1), y: 2.5 },
                    { x: new Date(2010, 0, 1), y: 3.7 }],
                xName: 'x', width: 2,
                yName: 'y', name: 'Japan',
                marker: {
                    visible: true,
                    width: 10,
                    height: 10
                },

            },
        ],

        //Initializing Chart title
        title: 'Unemployment Rates 1975-2010',
        tooltip: { enable: true, format: '${series.name}<br>${point.x} : ${point.y}'},
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            args.chart.theme = (selectedTheme && selectedTheme.indexOf('fabric') > -1) ? 'Fabric' : 'Material';
        }
    });
    chart.appendTo('#container');
};