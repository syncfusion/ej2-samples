import { Chart, BarSeries, Category, Legend, Tooltip, ILoadedEventArgs } from '@syncfusion/ej2-charts';
Chart.Inject(BarSeries, Category, Legend, Tooltip);

/**
 * Bar Series
 */
this.default = (): void => {
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'Category',
            title: 'Food',
            interval: 1
        },

        //Initializing Primary Y Axis
        primaryYAxis:
        {
            title: 'In Billions',
            minimum: 0,
            maximum: 10,
            labelFormat: '{value}B',
            edgeLabelPlacement: 'Shift'
        },

        //Initializing Chart Series
        series: [
            {
                type: 'Bar',
                dataSource: [
                    { x: 'Fruit', y: 9.1 }, { x: 'Meat', y: 5.8 },
                    { x: 'Cereals', y: 3.2 },
                    { x: 'Egg', y: 2.2 }, { x: 'Fish', y: 2.4 },
                    { x: 'Misc', y: 3 }, { x: 'Tea', y: 3.1 },
                    { x: 'Feed', y: 2.9 }, { x: 'Oils', y: 1.7 },
                    { x: 'Sugar', y: 1.3 }
                ],
                xName: 'x', width: 2,
                yName: 'y', name: 'Imports',
            },
            {
                type: 'Bar',
                dataSource: [
                    { x: 'Fruit', y: 0.9 }, { x: 'Meat', y: 1.5 },
                    { x: 'Cereals', y: 2.1 },
                    { x: 'Egg', y: 1.2 }, { x: 'Fish', y: 1.3 },
                    { x: 'Misc', y: 1.5 }, { x: 'Tea', y: 2.2 },
                    { x: 'Feed', y: 0.9 }, { x: 'Oils', y: 0.7 },
                    { x: 'Sugar', y: 0.4 }
                ],
                xName: 'x', width: 2,
                yName: 'y', name: 'Exports',
            }
        ],

        //Initializing Chart title
        title: 'UK Trade in Food Groups - 2015',
        tooltip: { enable: true, format: '${series.name}<br> ${point.x} : ${point.y}' },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            args.chart.theme = (selectedTheme && selectedTheme.indexOf('fabric') > -1) ? 'Fabric' : 'Material';
        }
    });
    chart.appendTo('#container');
};