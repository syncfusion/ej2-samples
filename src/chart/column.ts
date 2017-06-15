import { Chart, ColumnSeries, Category, Legend, Tooltip } from '@syncfusion/ej2-charts';
Chart.Inject(ColumnSeries, Category, Legend, Tooltip);

/**
 * Column Series
 */
this.default = (): void => {
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            title: 'Countries',
            valueType: 'Category',
            interval: 1
        },

        //Initializing Primary Y Axis	
        primaryYAxis:
        {
            title: 'Medals',
            minimum: 0,
            maximum: 50,
            interval: 5
        },

        //Initializing Chart Series
        series: [
            {
                type: 'Column',
                dataSource: [
                    { x: 'USA', y: 46 }, { x: 'GBR', y: 27 }, { x: 'CHN', y: 26 }, { x: 'RUS', y: 19 },
                    { x: 'GER', y: 17 }, { x: 'JAP', y: 12 }, { x: 'FRA', y: 10 }
                ],
                xName: 'x', width: 2,
                yName: 'y', name: 'Gold',
            },
            {
                type: 'Column',
                dataSource: [
                    { x: 'USA', y: 37 }, { x: 'GBR', y: 23 }, { x: 'CHN', y: 18 }, { x: 'RUS', y: 17 },
                    { x: 'GER', y: 10 }, { x: 'JAP', y: 8 }, { x: 'FRA', y: 18 }
                ],
                xName: 'x', width: 2,
                yName: 'y', name: 'Silver',
            },
            {
                type: 'Column',
                dataSource: [
                    { x: 'USA', y: 38 }, { x: 'GBR', y: 17 }, { x: 'CHN', y: 26 }, { x: 'RUS', y: 19 },
                    { x: 'GER', y: 15 }, { x: 'JAP', y: 21 }, { x: 'FRA', y: 14 }
                ],
                xName: 'x', width: 2,
                yName: 'y', name: 'Bronze',
            }
        ],

        //Initializing Chart title
        title: 'Olympic Medals - RIO',
        tooltip: { enable: true, format: '${series.name}<br>${point.x} : ${point.y}' }
    });
    chart.appendTo('#container');
};