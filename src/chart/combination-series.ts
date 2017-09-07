import { Chart, StackingColumnSeries, LineSeries, Legend, Tooltip, ILoadedEventArgs } from '@syncfusion/ej2-charts';
import { Marker, ColumnSeries, Category } from '@syncfusion/ej2-charts';
Chart.Inject(StackingColumnSeries, LineSeries, Category, Marker, ColumnSeries, Legend, Tooltip);

/**
 * Combination Series
 */
this.default = (): void => {
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            title: 'Years',
            interval: 1,
            labelIntersectAction: 'Rotate45',
            valueType: 'Category'
        },

        //Initializing Primary Y Axis
        primaryYAxis:
        {
            title: 'Growth',
            minimum: -3,
            maximum: 3,
            interval: 1
        },

        //Initializing Chart Series
        series: [
            {
                type: 'StackingColumn',
                dataSource: [
                    { x: '2005', y: 1.2 }, { x: '2006', y: 1 },
                    { x: '2007', y: 1 }, { x: '2008', y: 0.25 },
                    { x: '2009', y: 0.1 }, { x: '2010', y: 1 },
                    { x: '2011', y: 0.1 }, { x: '2012', y: -0.25 },
                    { x: '2013', y: 0.25 }, { x: '2014', y: 0.6 },
                    { x: '2015', y: 0.9 }
                ],
                xName: 'x', yName: 'y', name: 'Private Consumption',
            }, {
                type: 'StackingColumn',
                dataSource: [
                    { x: '2005', y: 0.5 }, { x: '2006', y: 0.5 },
                    { x: '2007', y: 0.5 }, { x: '2008', y: 0.35 },
                    { x: '2009', y: 0.9 }, { x: '2010', y: 0.5 },
                    { x: '2011', y: 0.25 }, { x: '2012', y: -0.5 },
                    { x: '2013', y: 0.5 }, { x: '2014', y: 0.6 },
                    { x: '2015', y: 0.5 }
                ],
                xName: 'x', yName: 'y', name: 'Government Consumption',
            }, {
                type: 'StackingColumn',
                dataSource: [
                    { x: '2005', y: 0.7 }, { x: '2006', y: 1.4 },
                    { x: '2007', y: 1.5 }, { x: '2008', y: 0.35 },
                    { x: '2009', y: -2.7 }, { x: '2010', y: 0.5 },
                    { x: '2011', y: 0.25 }, { x: '2012', y: -0.1 },
                    { x: '2013', y: -0.3 }, { x: '2014', y: -0.6 },
                    { x: '2015', y: 0 }
                ],
                xName: 'x', yName: 'y', name: 'Investment',
            }, {
                type: 'StackingColumn',
                dataSource: [
                    { x: '2005', y: -0.8 }, { x: '2006', y: 0 },
                    { x: '2007', y: -1 }, { x: '2008', y: -.35 },
                    { x: '2009', y: -0.3 }, { x: '2010', y: -0.5 },
                    { x: '2011', y: 0 }, { x: '2012', y: -0.4 },
                    { x: '2013', y: 0 }, { x: '2014', y: -0.6 },
                    { x: '2015', y: -0.3 }
                ],
                xName: 'x', yName: 'y', name: 'Net Foreign Trade',

            }, {
                type: 'Line',
                dataSource: [
                    { x: '2005', y: 1.5 }, { x: '2006', y: 2.3 },
                    { x: '2007', y: 2 }, { x: '2008', y: 0.1 },
                    { x: '2009', y: -2.7 }, { x: '2010', y: 1.8 },
                    { x: '2011', y: 2 }, { x: '2012', y: 0.4 },
                    { x: '2013', y: 0.9 }, { x: '2014', y: 0.4 },
                    { x: '2015', y: 1.3 }
                ],
                xName: 'x', yName: 'y', name: 'GDP',
                width: 2, opacity: 0.6,
                marker: {
                    visible: true,
                    width: 10, opacity: 0.6,
                    height: 10
                },
            }
        ],

        //Initializing Chart title
        title: 'Annual Growth GDP in France',
        legendSettings: { visible: false },
        tooltip: { enable: true, format: '${series.name}<br>${point.x} : ${point.y}' },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            args.chart.theme = (selectedTheme && selectedTheme.indexOf('fabric') > -1) ? 'Fabric' : 'Material';
        }
    });
    chart.appendTo('#container');
};