import { loadCultureFiles } from '../common/culture-loader';
import { ChartTheme, Chart, StackingColumnSeries, LineSeries, Tooltip, ILoadedEventArgs } from '@syncfusion/ej2-charts';
import { ColumnSeries, Category, Legend } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
Chart.Inject(StackingColumnSeries, LineSeries, Category, ColumnSeries, Tooltip, Legend);

/**
 * Sample for Combination Series
 */
//tslint:disable:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({
        //Initializing Primary X and Y Axis
        primaryXAxis: {
            title: 'Years',
            interval: Browser.isDevice ? 2 : 1,
            labelIntersectAction: 'Rotate45',
            valueType: 'Category',
            majorGridLines: { width: 0 }, minorGridLines: { width: 0 },
            majorTickLines: { width: 0 }, minorTickLines: { width: 0 },
            lineStyle: { width: 0 },
        },
        primaryYAxis:
        {
            title: 'Growth',
            minimum: -3,
            maximum: 3,
            interval: 1,
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 }, majorGridLines: { width: 1 },
            minorGridLines: { width: 1 }, minorTickLines: { width: 0 },
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
                    { x: '2007', y: 1 }, { x: '2008', y: 0.25 },
                    { x: '2009', y: 0.1 }, { x: '2010', y: 1 },
                    { x: '2011', y: 0.1 }, { x: '2012', y: -0.25 },
                    { x: '2013', y: 0.25 }, { x: '2014', y: 0.6 }
                ],
                xName: 'x', yName: 'y', name: 'Private Consumption',
            }, {
                type: 'StackingColumn',
                dataSource: [
                    { x: '2007', y: 0.5 }, { x: '2008', y: 0.35 },
                    { x: '2009', y: 0.9 }, { x: '2010', y: 0.5 },
                    { x: '2011', y: 0.25 }, { x: '2012', y: -0.5 },
                    { x: '2013', y: 0.5 }, { x: '2014', y: 0.6 }
                ],
                xName: 'x', yName: 'y', name: 'Government Consumption',
            }, {
                type: 'StackingColumn',
                dataSource: [
                    { x: '2007', y: 1.5 }, { x: '2008', y: 0.35 },
                    { x: '2009', y: -2.7 }, { x: '2010', y: 0.5 },
                    { x: '2011', y: 0.25 }, { x: '2012', y: -0.1 },
                    { x: '2013', y: -0.3 }, { x: '2014', y: -0.6 }
                ],
                xName: 'x', yName: 'y', name: 'Investment',
            }, {
                type: 'StackingColumn',
                dataSource: [
                    { x: '2007', y: -1 }, { x: '2008', y: -.35 },
                    { x: '2009', y: -0.3 }, { x: '2010', y: -0.5 },
                    { x: '2011', y: 0 }, { x: '2012', y: -0.4 },
                    { x: '2013', y: 0 }, { x: '2014', y: -0.6 }
                ],
                xName: 'x', yName: 'y', name: 'Net Foreign Trade'
            }, {
                type: 'Line',
                dataSource: [
                    { x: '2007', y: 2 }, { x: '2008', y: 0.1 },
                    { x: '2009', y: -2.7 }, { x: '2010', y: 1.8 },
                    { x: '2011', y: 2 }, { x: '2012', y: 0.4 },
                    { x: '2013', y: 0.9 }, { x: '2014', y: 0.4 }
                ],
                xName: 'x', yName: 'y', name: 'GDP',
                width: 2,
                marker: {
                    visible: true,
                    width: 10,
                    height: 10
                },
            }
        ],
        width: Browser.isDevice ? '100%' : '75%',
        //Initializing Chart title
        title: 'Annual Growth GDP in France',
        // Enable Legend
        legendSettings: {
            visible: true
        },
        tooltip: {
            enable: true
        },
         // custom code start
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
        }
         // custom code end
    });
    chart.appendTo('#container');
};