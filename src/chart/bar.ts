import { Chart, DataLabel, BarSeries, Category, Legend, Tooltip, ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
Chart.Inject(BarSeries, DataLabel, Category, Legend, Tooltip);

/**
 * Sample for bar series
 */
this.default = (): void => {
    let chart: Chart = new Chart({

        //Initializing Primary X and Y Axis
        primaryXAxis: {
            valueType: 'Category',
            title: 'Food',
            interval: 1,
            majorGridLines: { width: 0 }
        },
        primaryYAxis:
        {
            minimum: 0,
            maximum: 3.2,
            labelFormat: '{value}B',
            edgeLabelPlacement: 'Shift',
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 },
            labelStyle: {
                color: 'transparent'
            }
        },
        chartArea: {
            border: {
                width: 0
            }
        },
        //Initializing Chart Series
        series: [
            {
                type: 'Bar',
                dataSource: [
                    { x: 'Egg', y: 2.2 }, { x: 'Fish', y: 2.4 },
                    { x: 'Misc', y: 3 }, { x: 'Tea', y: 3.1 }
                ],
                xName: 'x', width: 2,
                yName: 'y', name: 'Imports', marker: {
                    dataLabel: {
                        visible: true,
                        position: 'Top',
                        font: {
                            fontWeight: '600', color: '#ffffff'
                        }
                    }
                }
            },
            {
                type: 'Bar',
                dataSource: [
                    { x: 'Egg', y: 1.2 }, { x: 'Fish', y: 1.3 },
                    { x: 'Misc', y: 1.5 }, { x: 'Tea', y: 2.2 }
                ],
                xName: 'x', width: 2,
                yName: 'y', name: 'Exports', marker: {
                    dataLabel: {
                        visible: true,
                        position: 'Top',
                        font: {
                            fontWeight: '600', color: '#ffffff'
                        }
                    }
                }
            }
        ],
        // Initializing the tooltip
        tooltip: {
            enable: true
        },
        width: Browser.isDevice ? '100%' : '60%',
        //Initializing Chart title
        title: 'UK Trade in Food Groups - 2015',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        }
    });
    chart.appendTo('#container');
};