import { Chart, BarSeries, Category, Legend, Tooltip, IPointRenderEventArgs } from '@syncfusion/ej2-charts';
import { EmitType } from '@syncfusion/ej2-base';
Chart.Inject(BarSeries, Category, Legend, Tooltip);

/**
 * Category Axis
 */
let materialColors: string[] = ['#00bdae', '#404041', '#357cd2', '#e56590', '#f8b883',
    '#70ad47', '#dd8abd', '#7f84e8', '#7bb4eb', '#ea7a57'];
let fabricColors: string[] = ['#4472c4', '#ed7d31', '#ffc000', '#70ad47', '#5b9bd5',
    '#c1c1c1', '#6f6fe2', '#e269ae', '#9e480e', '#997300'];
let labelRender: EmitType<IPointRenderEventArgs> = (args: IPointRenderEventArgs): void => {
    let selectedTheme: string = location.hash.split('/')[1];
    if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
        args.fill = fabricColors[args.point.index];
    } else {
        args.fill = materialColors[args.point.index];
    }
};
this.default = (): void => {
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            title: 'Country',
            valueType: 'Category'
        },

        //Initializing Primary Y Axis
        primaryYAxis:
        {
            title: 'Users in Millions',
            minimum: 0,
            maximum: 800,
            labelFormat: '{value}M',
            edgeLabelPlacement: 'Shift'
        },

        //Initializing Chart Series
        series: [
            {
                type: 'Bar',
                dataSource: [
                    { x: 'GER', y: 71.7 },
                    { x: 'RUS', y: 103.1 },
                    { x: 'BRZ', y: 139.1 },
                    { x: 'IND', y: 462.1 },
                    { x: 'CHN', y: 721.4 },
                    { x: 'USA', y: 286.9 },
                    { x: 'GBR', y: 60.2 },
                    { x: 'JPN', y: 115.1 },
                    { x: 'NGR', y: 97.2 },
                ],
                xName: 'x', width: 2,
                yName: 'y',
            }
        ],
        pointRender: labelRender,
        //Initializing Chart title
        title: 'Internet Users – 2016',
        tooltip: { enable: true, format: '${point.x} : ${point.y}' }
    });
    chart.appendTo('#container');
};