import { Chart, DateTime, AreaSeries, Legend, ILoadedEventArgs } from '@syncfusion/ej2-charts';
Chart.Inject(AreaSeries, DateTime, Legend);

/**
 * Area Series
 */
this.default = (): void => {
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            title: 'Years',
            valueType: 'DateTime',
            labelFormat: 'y',
            lineStyle: { width: 0 },
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 },
            intervalType: 'Years',
            edgeLabelPlacement: 'Shift'
        },

        //Initializing Primary Y Axis	
        primaryYAxis:
        {
            title: 'Revenue in Millions',
            minimum: 2,
            maximum: 5,
            interval: 1,
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 },
            labelFormat: '{value}M'
        },

        //Initializing Chart Series
        series: [
            {
                type: 'Area',
                dataSource: [{ x: new Date(2000, 0, 1), y: 4 }, { x: new Date(2001, 0, 1), y: 3.0 },
                { x: new Date(2002, 0, 1), y: 3.8 }, { x: new Date(2003, 0, 1), y: 3.4 },
                { x: new Date(2004, 0, 1), y: 3.2 }, { x: new Date(2005, 0, 1), y: 3.9 }],
                xName: 'x', width: 2,
                yName: 'y', name: 'Product A',
                border: { color: 'transparent' },
                opacity: 0.5,
            },
            {
                type: 'Area',
                dataSource: [{ x: new Date(2000, 0, 1), y: 2.6 }, { x: new Date(2001, 0, 1), y: 2.8 },
                { x: new Date(2002, 0, 1), y: 2.6 }, { x: new Date(2003, 0, 1), y: 3 },
                { x: new Date(2004, 0, 1), y: 3.6 }, { x: new Date(2005, 0, 1), y: 3 }],
                xName: 'x', width: 2,
                yName: 'y', name: 'Product B',
                opacity: 0.5,
                border: { color: 'transparent' },
            },
            {
                type: 'Area',
                dataSource: [{ x: new Date(2000, 0, 1), y: 2.8 }, { x: new Date(2001, 0, 1), y: 2.5 },
                { x: new Date(2002, 0, 1), y: 2.8 }, { x: new Date(2003, 0, 1), y: 3.2 },
                { x: new Date(2004, 0, 1), y: 2.9 }, { x: new Date(2005, 0, 1), y: 2 }],
                xName: 'x', width: 2,
                yName: 'y', name: 'Product C',
                opacity: 0.5,
                border: { color: 'transparent' },

            }
        ],
        //Initializing Chart title
        title: 'Average Sales Comparison',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            args.chart.theme = selectedTheme.indexOf('fabric') > -1 ? 'Fabric' : 'Material';
        }
    });
    chart.appendTo('#container');
};