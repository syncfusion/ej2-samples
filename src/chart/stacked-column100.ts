import { Chart, StackingColumnSeries, Category, Tooltip, Legend, ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
Chart.Inject(StackingColumnSeries, Category, Tooltip, Legend);
import { Browser } from '@syncfusion/ej2-base';
let chartData: any[] = [
    { x: '2006', y: 900, y1: 190, y2: 250, y3: 150 },
    { x: '2007', y: 544, y1: 226, y2: 145, y3: 120 },
    { x: '2008', y: 880, y1: 194, y2: 190, y3: 115 },
    { x: '2009', y: 675, y1: 250, y2: 220, y3: 125 }
];

/**
 * Sample for StackingColumn100 Series Sample
 */
this.default = (): void => {
    let chart: Chart = new Chart({
        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'Category',
            labelIntersectAction: 'Rotate45',
            majorGridLines: { width: 0 },
            minorGridLines: { width: 0 },
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 }
        },
        //Initializing Primary Y Axis
        primaryYAxis:
        {
            title: 'GDP (%) per Annum',
            rangePadding: 'None',
            interval: 20,
            majorTickLines: { width: 0 },
            majorGridLines: { width: 1 },
            minorGridLines: { width: 1 },
            minorTickLines: { width: 0 },
            lineStyle: {
                width: 0
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
                dataSource: chartData, xName: 'x', yName: 'y',
                type: 'StackingColumn100',
                name: 'UK'
            }, {
                dataSource: chartData, xName: 'x', yName: 'y1',
                type: 'StackingColumn100', name: 'Germany'
            }, {
                dataSource: chartData, xName: 'x', yName: 'y2',
                type: 'StackingColumn100', name: 'France'

            }, {
                dataSource: chartData, xName: 'x', yName: 'y3',
                type: 'StackingColumn100', name: 'Italy'

            }
        ],
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        },
        width : Browser.isDevice ? '100%' : '60%',
        //Initializing Chart Title
        title: 'Gross Domestic Product Growth',
        //Initializing User Interaction Tooltip
        tooltip: {
            enable: true
        }
    });
    chart.appendTo('#container');
};