import { Chart, ColumnSeries, Marker, Tooltip, Legend } from '@syncfusion/ej2-charts';
Chart.Inject(ColumnSeries, Marker, Tooltip, Legend);

/**
 * Numeric Axis
 */
this.default = (): void => {
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            title: 'Overs',
            minimum: 0,
            maximum: 21
        },

        //Initializing Primary Y Axis	
        primaryYAxis:
        {
            title: 'Runs',
            minimum: 0,
            maximum: 25,
            interval: 5
        },

        //Initializing Chart Series
        series: [
            {
                type: 'Column',
                dataSource: [
                    { x: 1, y: 7 },
                    { x: 2, y: 1 }, { x: 3, y: 1 },
                    { x: 4, y: 14 }, { x: 5, y: 1 },
                    { x: 6, y: 10 }, { x: 7, y: 8 },
                    { x: 8, y: 6 }, { x: 9, y: 10 },
                    { x: 10, y: 10 }, { x: 11, y: 16 },
                    { x: 12, y: 6 }, { x: 13, y: 14 },
                    { x: 14, y: 7 }, { x: 15, y: 5 },
                    { x: 16, y: 2 }, { x: 17, y: 14 },
                    { x: 18, y: 7 }, { x: 19, y: 7 },
                    { x: 20, y: 10 }
                ],
                xName: 'x', width: 2,
                yName: 'y', name: 'England', fill: '#1e90ff',
            },
            {
                type: 'Column',
                dataSource: [
                    { x: 1, y: 1 },
                    { x: 2, y: 9 }, { x: 3, y: 3 },
                    { x: 4, y: 5 }, { x: 5, y: 3 },
                    { x: 6, y: 16 }, { x: 7, y: 2 },
                    { x: 8, y: 4 }, { x: 9, y: 7 },
                    { x: 10, y: 4 }, { x: 11, y: 8 },
                    { x: 12, y: 5 }, { x: 13, y: 9 },
                    { x: 14, y: 10 }, { x: 15, y: 18 },
                    { x: 16, y: 7 }, { x: 17, y: 7 },
                    { x: 18, y: 11 }, { x: 19, y: 8 },
                    { x: 20, y: 24 }
                ],
                xName: 'x', width: 2,
                yName: 'y', name: 'West Indies', fill: '#b22222',
            }
        ],
        //Initializing Chart title
        title: 'England vs West Indies', tooltip: { enable: true, format: '${series.name}<br>Over ${point.x} : ${point.y} Runs'}
    });
    chart.appendTo('#container');
};