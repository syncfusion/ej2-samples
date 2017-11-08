import { Chart, StackingColumnSeries, Category, Legend, Tooltip, ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
Chart.Inject(StackingColumnSeries, Category, Legend, Tooltip);

/**
 * Sample for StackedColumn Series
 */
this.default = (): void => {
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            majorGridLines: { width: 0 },
            minorGridLines: { width: 0 },
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 },
            interval: 1,
            lineStyle: { width: 0 },
            labelIntersectAction: 'Rotate45',
            valueType: 'Category'
        },
        //Initializing Primary Y Axis
        primaryYAxis:
        {
            title: 'Sales',
            minimum: 0,
            maximum: 500,
            interval: 100,
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 },
            majorGridLines: { width: 1 },
            minorGridLines: { width: 1 },
            minorTickLines: { width: 0 },
            labelFormat: '{value}B',
        },
        chartArea: {
            border: {
                width: 0
            }
        },
        //Initializing Chart Series
        series: [
            {
                type: 'StackingColumn',
                dataSource: [
                    { x: '2014', y: 111.1 },
                    { x: '2015', y: 127.3 },
                    { x: '2016', y: 143.4 },
                    { x: '2017', y: 159.9 }],
                xName: 'x', width: 2,
                yName: 'y', name: 'UK'
            },
            {
                type: 'StackingColumn',
                dataSource: [
                    { x: '2014', y: 76.9 },
                    { x: '2015', y: 99.5 },
                    { x: '2016', y: 121.7 },
                    { x: '2017', y: 142.5 }],
                xName: 'x', width: 2,
                yName: 'y', name: 'Germany'
            },
            {
                type: 'StackingColumn',
                dataSource: [
                    { x: '2014', y: 66.1 },
                    { x: '2015', y: 79.3 },
                    { x: '2016', y: 91.3 },
                    { x: '2017', y: 102.4 }],
                xName: 'x', width: 2,
                yName: 'y', name: 'France'

            },
            {
                type: 'StackingColumn',
                dataSource: [
                    { x: '2014', y: 34.1 },
                    { x: '2015', y: 38.2 },
                    { x: '2016', y: 44.0 },
                    { x: '2017', y: 51.6 }],
                xName: 'x', width: 2,
                yName: 'y', name: 'Italy'

            }
        ],

        //Initializing Chart title
        title: 'Mobile Game Market by Country',
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