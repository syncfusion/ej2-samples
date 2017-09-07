import { Chart, LineSeries, Marker, Category, Legend, Tooltip, ILoadedEventArgs } from '@syncfusion/ej2-charts';
Chart.Inject(LineSeries, Category, Marker, Legend, Tooltip);

/**
 * Chart Symbols Sample
 */
this.default = (): void => {
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            title: 'Countries', valueType: 'Category',
            interval: 1, labelIntersectAction: 'Rotate45'
        },

        //Initializing Primary Y Axis
        primaryYAxis:
        {
            title: 'Penetration (%)', rangePadding: 'None',
            labelFormat: '{value}%', minimum: 0,
            maximum: 90
        },
        //Initializing Chart Series
        series: [
            {
                type: 'Line',
                dataSource: [{ x: 'WW', y: 12, text: 'World Wide' },
                { x: 'EU', y: 9.9, text: 'Europe' },
                { x: 'APAC', y: 4.4, text: 'Asia Pacific' },
                { x: 'LATAM', y: 6.4, text: 'Latin America' },
                { x: 'MEA', y: 30, text: 'Middle East Africa' },
                { x: 'NA', y: 25.3, text: 'North America' }],
                name: 'December 2007',
                marker: {
                    visible: true, width: 10, height: 10,
                    shape: 'Diamond', dataLabel: { name: 'text' }
                },
                xName: 'x', width: 2,
                yName: 'y',
            },
            {
                type: 'Line',
                dataSource: [{ x: 'WW', y: 22, text: 'World Wide' },
                { x: 'EU', y: 26, text: 'Europe' },
                { x: 'APAC', y: 9.3, text: 'Asia Pacific' },
                { x: 'LATAM', y: 28, text: 'Latin America' },
                { x: 'MEA', y: 45.7, text: 'Middle East Africa' },
                { x: 'NA', y: 35.9, text: 'North America' }],
                xName: 'x', width: 2,
                marker: {
                    visible: true, width: 10, height: 10,
                    shape: 'Pentagon', dataLabel: { name: 'text' }
                },
                yName: 'y', name: 'December 2008',
            },
            {
                type: 'Line',
                dataSource: [{ x: 'WW', y: 38.3, text: 'World Wide' },
                { x: 'EU', y: 45.2, text: 'Europe' },
                { x: 'APAC', y: 18.2, text: 'Asia Pacific' },
                { x: 'LATAM', y: 46.7, text: 'Latin America' },
                { x: 'MEA', y: 61.5, text: 'Middle East Africa' },
                { x: 'NA', y: 64, text: 'North America' }],
                xName: 'x', width: 2,
                marker: {
                    visible: true,
                    width: 10, height: 10,
                    shape: 'Triangle',
                    dataLabel: { name: 'text' }
                },
                yName: 'y', name: 'December 2009',
            },
            {
                type: 'Line',
                dataSource: [{ x: 'WW', y: 50, text: 'World Wide' },
                { x: 'EU', y: 63.6, text: 'Europe' },
                { x: 'APAC', y: 20.9, text: 'Asia Pacific' },
                { x: 'LATAM', y: 65.1, text: 'Latin America' },
                { x: 'MEA', y: 73, text: 'Middle East Africa' },
                { x: 'NA', y: 81.4, text: 'North America' }],
                xName: 'x', width: 2,
                marker: {
                    visible: true,
                    width: 10, height: 10,
                    shape: 'Circle',
                    dataLabel: { name: 'text' }
                },
                yName: 'y', name: 'December 2010',
            }
        ],
        //Initializing Chart title
        title: 'FB Penetration of Internet Audience',
        legendSettings: { visible: false },
        tooltip: { enable: true, format: '${series.name}<br>${point.text} : ${point.y}' },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            args.chart.theme = (selectedTheme && selectedTheme.indexOf('fabric') > -1) ? 'Fabric' : 'Material';
        }
    });
    chart.appendTo('#container');
};