import { Chart, StackingBarSeries, Category, Legend, Tooltip, ILoadedEventArgs } from '@syncfusion/ej2-charts';
Chart.Inject(StackingBarSeries, Category, Legend, Tooltip);

/**
 * Stacked-Bar Series
 */
this.default = (): void => {
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'Category',
            title: 'Months'
        },

        //Initializing Primary Y Axis
        primaryYAxis:
        {
            title: 'Percentage (%)',
            minimum: -20,
            maximum: 100,
            labelFormat: '{value}%',
            edgeLabelPlacement: 'Shift'
        },

        //Initializing Chart Series
        series: [
            {
                type: 'StackingBar',
                dataSource: [{ x: 'Jan', y: 6 }, { x: 'Feb', y: 8 }, { x: 'Mar', y: 12 }, { x: 'Apr', y: 15.5 },
                { x: 'May', y: 20 }, { x: 'Jun', y: 24 }, { x: 'Jul', y: 28 }, { x: 'Aug', y: 32 },
                { x: 'Sep', y: 33 }, { x: 'Oct', y: 35 }, { x: 'Nov', y: 40 }, { x: 'Dec', y: 42 }],
                name: 'Apple',
                xName: 'x', width: 2,
                yName: 'y'
            },
            {
                type: 'StackingBar',
                dataSource: [{ x: 'Jan', y: 6 }, { x: 'Feb', y: 8 }, { x: 'Mar', y: 11 }, { x: 'Apr', y: 16 },
                { x: 'May', y: 21 }, { x: 'Jun', y: 25 }, { x: 'Jul', y: 27 }, { x: 'Aug', y: 31 },
                { x: 'Sep', y: 34 }, { x: 'Oct', y: 34 }, { x: 'Nov', y: 41 }, { x: 'Dec', y: 42 }],
                name: 'Orange',
                xName: 'x', width: 2,
                yName: 'y'
            },
            {
                type: 'StackingBar',
                dataSource: [{ x: 'Jan', y: -1 }, { x: 'Feb', y: -1.5 }, { x: 'Mar', y: -2 }, { x: 'Apr', y: -2.5 },
                { x: 'May', y: -3 }, { x: 'Jun', y: -3.5 }, { x: 'Jul', y: -4 }, { x: 'Aug', y: -4.5 },
                { x: 'Sep', y: -5 }, { x: 'Oct', y: -5.5 }, { x: 'Nov', y: -6 }, { x: 'Dec', y: -6.5 }],
                name: 'Wastage', width: 2,
                xName: 'x',
                yName: 'y'

            }
        ],

        //Initializing Chart title
        title: 'Sales Comparison',
        tooltip: { enable: true, format: '${series.name}<br>${point.x} : ${point.y}'},
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            args.chart.theme = (selectedTheme && selectedTheme.indexOf('fabric') > -1) ? 'Fabric' : 'Material';
        }
    });
    chart.appendTo('#container');
};