import { Chart, ColumnSeries, Category, Legend, Tooltip, DataLabel, ILoadedEventArgs } from '@syncfusion/ej2-charts';
Chart.Inject(ColumnSeries, Category, Legend, Tooltip, DataLabel);
/**
 * inversed axis sample
 */
this.default = (): void => {
    let chart: Chart = new Chart({
        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'Category',
            title: 'Years',
            opposedPosition: true,
            isInversed: true
        },

        //Initializing Primary Y Axis
        primaryYAxis:
        {
            title: 'Exchange rate (INR per USD)',
            edgeLabelPlacement: 'Shift',
            labelIntersectAction: 'Rotate45',
            isInversed: true
        },
        series: [
            {
                type: 'Column',
                dataSource: [
                    { x: 2008, y: 15.1 }, { x: 2009, y: 16 }, { x: 2010, y: 21.4 },
                    { x: 2011, y: 18 }, { x: 2012, y: 16.2 }, { x: 2013, y: 11 },
                    { x: 2014, y: 7.6 }, { x: 2015, y: 1.5 }
                ],
                marker: { dataLabel: { visible: true }},
                xName: 'x',
                yName: 'y', name: 'Years',
            },
        ],
        tooltip: {enable: true, format: 'INR per USD<br>Year ${point.x} : ${point.y}'},
        title: 'Exchange rate',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            args.chart.theme = (selectedTheme && selectedTheme.indexOf('fabric') > -1) ? 'Fabric' : 'Material';
        }
    });
    chart.appendTo('#container');
};