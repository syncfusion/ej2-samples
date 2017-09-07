import { Chart, StackingColumnSeries, Category, Legend, Tooltip, ILoadedEventArgs } from '@syncfusion/ej2-charts';
Chart.Inject(StackingColumnSeries, Category, Legend, Tooltip);

/**
 * Stacked-Column Series
 */
this.default = (): void => {
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            title: 'Years',
            lineStyle: { width: 0 },
            majorGridLines: { width: 1 },
            minorGridLines: { width: 1 },
            minorTickLines: { width: 1 },
            interval: 1,
            labelIntersectAction : 'Rotate45',
            valueType: 'Category'
        },
        //Initializing Primary Y Axis
        primaryYAxis:
        {
            title: 'Sales in Billions',
            minimum: 0,
            maximum: 700,
            interval: 100,
            majorGridLines: { width: 1 },
            minorGridLines: { width: 1 },
            minorTickLines: { width: 1 },
            labelFormat: '{value}B',
        },
        //Initializing Chart Series
        series: [
            {
                type: 'StackingColumn',
                dataSource: [
                    { x: '2014', y: 111.1 },
                    { x: '2015', y: 127.3 },
                    { x: '2016', y: 143.4 },
                    { x: '2017', y: 159.9 },
                    { x: '2018', y: 175.4 },
                    { x: '2019', y: 189.0 },
                    { x: '2020', y: 202.7 }],
                xName: 'x', width: 2,
                yName: 'y', name: 'UK',
            },
            {
                type: 'StackingColumn',
                dataSource: [
                    { x: '2014', y: 76.9 },
                    { x: '2015', y: 99.5 },
                    { x: '2016', y: 121.7 },
                    { x: '2017', y: 142.5 },
                    { x: '2018', y: 166.7 },
                    { x: '2019', y: 182.9 },
                    { x: '2020', y: 197.3 }],
                xName: 'x', width: 2,
                yName: 'y', name: 'Germany',
            },
            {
                type: 'StackingColumn',
                dataSource: [
                    { x: '2014', y: 66.1 },
                    { x: '2015', y: 79.3 },
                    { x: '2016', y: 91.3 },
                    { x: '2017', y: 102.4 },
                    { x: '2018', y: 112.9 },
                    { x: '2019', y: 122.4 },
                    { x: '2020', y: 120.9 }],
                xName: 'x', width: 2,
                yName: 'y', name: 'France',

            },
            {
                type: 'StackingColumn',
                dataSource: [
                    { x: '2014', y: 34.1 },
                    { x: '2015', y: 38.2 },
                    { x: '2016', y: 44.0 },
                    { x: '2017', y: 51.6 },
                    { x: '2018', y: 61.9 },
                    { x: '2019', y: 71.5 },
                    { x: '2020', y: 82.0 }],
                xName: 'x', width: 2,
                yName: 'y', name: 'Italy',

            }
        ],

        //Initializing Chart title
        title: 'Mobile Game Market by Country',
        tooltip: { enable: true, format: '${series.name}<br>${point.x} : ${point.y}' },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            args.chart.theme = (selectedTheme && selectedTheme.indexOf('fabric') > -1) ? 'Fabric' : 'Material';
        }

    });
    chart.appendTo('#container');
};