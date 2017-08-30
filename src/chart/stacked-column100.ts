import { Chart, StackingColumnSeries, Category, Tooltip, ILoadedEventArgs } from '@syncfusion/ej2-charts';
Chart.Inject(StackingColumnSeries, Category, Tooltip);
let chartData: any[] = [
    { x: '2006', y: 900, y1: 190, y2: 250, y3: 150 },
    { x: '2007', y: 544, y1: 226, y2: 145, y3: 120 },
    { x: '2008', y: 880, y1: 194, y2: 190, y3: 115 },
    { x: '2009', y: 675, y1: 250, y2: 220, y3: 125 },
    { x: '2010', y: 765, y1: 222, y2: 225, y3: 132 },
    { x: '2011', y: 679, y1: 181, y2: 135, y3: 137 },
    { x: '2012', y: 770, y1: 128, y2: 152, y3: 110 },
];

/**
 * StackingColumn100
 */
this.default = (): void => {
    let chart: Chart = new Chart({
        primaryXAxis: {
            title: 'Years',
            valueType: 'Category',
            labelIntersectAction: 'Rotate45'
        },
        primaryYAxis:
        {
            title: 'GDP (%) Per Annum',
            rangePadding: 'None',
        },
        series: [
            {
                dataSource: chartData, xName: 'x', yName: 'y',
                type: 'StackingColumn100',
                name: 'UK',
            }, {
                dataSource: chartData, xName: 'x', yName: 'y1',
                type: 'StackingColumn100', name: 'Germany',
            }, {
                dataSource: chartData, xName: 'x', yName: 'y2',
                type: 'StackingColumn100', name: 'France',

            }, {
                dataSource: chartData, xName: 'x', yName: 'y3',
                type: 'StackingColumn100', name: 'Italy',

            }
        ],
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            args.chart.theme = selectedTheme.indexOf('fabric') > -1 ? 'Fabric' : 'Material';
        },
        title: 'Gross Domestic Product Growth',
        tooltip: { enable: true, format: '${point.x} <br>${series.name} : ${point.y} (${point.percent}%)' }
    });
    chart.appendTo('#container');
};