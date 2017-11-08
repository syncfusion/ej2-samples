import { ChartTheme, Chart, StackingColumnSeries, LineSeries, Legend, Tooltip, ILoadedEventArgs } from '@syncfusion/ej2-charts';
import { ColumnSeries, Category } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
Chart.Inject(StackingColumnSeries, LineSeries, Category, ColumnSeries, Legend, Tooltip);

/**
 * Sample for Pareto chart
 */
this.default = (): void => {
    let chart: Chart = new Chart({
        //Initializing Primary X Axis
        primaryXAxis: {
            title: 'Defects',
            interval: 1,
            valueType: 'Category',
            majorGridLines: { width: 0 }, minorGridLines: { width: 0 },
            majorTickLines: { width: 0 }, minorTickLines: { width: 0 },
            lineStyle: { width: 0 },
        },
        //Initializing Primary Y Axis
        primaryYAxis:
        {
            title: 'Frequency',
            minimum: 0,
            maximum: 150,
            interval: 30,
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 }, majorGridLines: { width: 1 },
            minorGridLines: { width: 1 }, minorTickLines: { width: 0 }
        },
        //Initializing Axes
        axes: [
            {
                title: 'Cumulative Frequency',
                minimum: 0,
                opposedPosition: true,
                name: 'secondary',
                maximum: 100,
                interval: 20,
                lineStyle: { width: 0 },
                majorTickLines: { width: 0 }, majorGridLines: { width: 1 },
                minorGridLines: { width: 1 }, minorTickLines: { width: 0 },
                labelFormat: '{value}%',
            }
        ],
        chartArea: {
            border: {
                width: 0
            }
        },

        //Initializing Chart Series
        series: [
            {
                type: 'Column',
                dataSource: [
                    { x: 'Traffic', y: 56 }, { x: 'Child Care', y: 44.8 },
                    { x: 'Transport', y: 27.2 }, { x: 'Weather', y: 19.6 },
                    { x: 'Emergency', y: 6.6 }
                ],
                xName: 'x', yName: 'y', name: 'Defect',
            }, {
                type: 'Line',
                dataSource: [
                    { x: 'Traffic', y: 33.8 }, { x: 'Child Care', y: 60.9 },
                    { x: 'Transport', y: 77.3 }, { x: 'Weather', y: 89.1 },
                    { x: 'Emergency', y: 100 }
                ],
                xName: 'x', yName: 'y', name: 'Cumulative', yAxisName: 'secondary',
                width: 2,
                marker: {
                    visible: true,
                    width: 10,
                    height: 10
                },
            }
        ],
        width: Browser.isDevice ? '100%' : '60%',
        //Initializing Chart title
        title: 'Defect vs Frequency',
        legendSettings: { visible: false },
        //Initializing User Interaction
        tooltip: {
            enable: true,
            shared: true
        },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        }
    });
    chart.appendTo('#container');
};