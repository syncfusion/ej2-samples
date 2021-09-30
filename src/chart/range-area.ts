import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart, RangeAreaSeries, Category, ILoadedEventArgs, DateTime, Zoom,
    ChartTheme, ISeriesRenderEventArgs,
} from '@syncfusion/ej2-charts';
Chart.Inject(RangeAreaSeries, Category, DateTime, Zoom);
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for RangeArea series
 */
(window as any).default = (): void => {
    loadCultureFiles();

    let series1: Object[] = [];
    let value: number = 35;
    let point1: Object;

    for (let i: number = 1; i < 360; i++) {
        if (Math.random() > .5) {
            value += Math.random();
        } else {
            value -= Math.random();
        }
        point1 = {
            x: new Date(2015, 0, i),
            high: value, low: value - 10
        };
        series1.push(point1);
    }

    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'DateTime',
            edgeLabelPlacement: 'Shift',
            majorGridLines: { width: 0 }
        },
        chartArea: {
            border: {
                width: 0
            }
        },
        //Initializing Primary Y Axis
        primaryYAxis:
        {
            labelFormat: '{value}˚C',
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 }
        },
        zoomSettings:
        {
            enableSelectionZooming: true,
            mode: 'X'
        },
        //Initializing Chart Series
        series: [
            {
                type: 'RangeArea',
                name: 'India',
                dataSource: series1,
                xName: 'x', high: 'high', low: 'low', opacity: 0.4,
                border: {
                    width: 2
                }
            }
        ],
        width: Browser.isDevice ? '100%' : '80%',
        //Initializing Chart Title
        title: 'Temperature Variation',
        seriesRender: (args: ISeriesRenderEventArgs) => {
            let areathemes: string[] = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast'];
            let borderColor: string[] = ['#262E0B', '#5ECB9B', '#5A61F6', '#8B5CF6', '#00bdae', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4'];
            args.series.border.color = borderColor[areathemes.indexOf(args.series.chart.theme.toLowerCase())];
        },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
        },
        legendSettings: {
            visible: false
        }
    });
    chart.appendTo('#container');
};
