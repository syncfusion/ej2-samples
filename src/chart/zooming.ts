import { Marker, DateTime, ILoadedEventArgs } from '@syncfusion/ej2-charts';
import { Chart, AreaSeries, Legend, Zoom } from '@syncfusion/ej2-charts';
Chart.Inject(AreaSeries, DateTime, Marker, Legend, Zoom);

/**
 * Zooming Sample
 */
this.default = (): void => {
    let series1: Object[] = [];
    let point1: Object;
    let value: number = 80;
    let i: number;
    for (i = 1; i < 500; i++) {
        if (Math.random() > .5) {
            value += Math.random();
        } else {
            value -= Math.random();
        }
        point1 = { x: new Date(1950, i + 2, i), y: value.toFixed(1) };
        series1.push(point1);
    }
    let chart: Chart = new Chart({
         chartArea : {border : {width : 0}},

        //Initializing Primary X Axis
        primaryXAxis: {
            title: 'Years',
            valueType: 'DateTime',
            labelFormat: 'yMMM',
            edgeLabelPlacement: 'Shift',
            majorGridLines : { width : 0 }
        },

        //Initializing Primary Y Axis
        primaryYAxis:
        {
            title: 'Profit ($)',
            rangePadding: 'None',
            lineStyle : { width: 0 },
            majorTickLines : {width : 0}
        },

        //Initializing Chart Series
        series: [
            {
                type: 'Area',
                dataSource: series1,
                name: 'Product X',
                xName: 'x',
                yName: 'y',
                fill: 'url(#gradient-chart)',
                border: { width: 0.5, color: '#00bdae' },
                animation: { enable: false }
            },
        ],
        //Initializing Zooming
        zoomSettings:
        {
            enableMouseWheelZooming: true,
            enablePinchZooming: true,
            enableSelectionZooming: true,
            mode: 'X'
        },
        //Initializing Chart title
        title: 'Sales History of Product X',
        legendSettings: { visible: false },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            args.chart.theme = selectedTheme.indexOf('fabric') > -1 ? 'Fabric' : 'Material';
        }
    });
    chart.appendTo('#container');
};