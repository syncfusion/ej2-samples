import { loadCultureFiles } from '../common/culture-loader';
import { DateTime, ILoadedEventArgs, ChartTheme, ScrollBar } from '@syncfusion/ej2-charts';
import { Chart, SplineAreaSeries, Legend, Zoom } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
Chart.Inject(SplineAreaSeries, DateTime, Legend, Zoom, ScrollBar);

/**
 * Sample for Zooming in chart
 */
 let selectedTheme: string = location.hash.split('/')[1];
 selectedTheme = selectedTheme ? selectedTheme : 'material';
 let theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
 selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
 let themes : string[] = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'materialdark', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast', 'fluent', 'fluentdark', 'material3', 'material3dark'];
 let borderColor : string[] = ['#6355C7', '#8F80F4', '#5A61F6', '#8B5CF6', '#00bdae', '#9ECB08', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4', '#1AC9E6', '#1AC9E6', '#6355C7', '#4EAAFF'];
 let fill : string = 'url(#' + selectedTheme + '-gradient-chart)';
(window as any).default = (): void => {
    loadCultureFiles();
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
        point1 = { x: new Date(1960, i + 2, i), y: Math.round(value) };
        series1.push(point1);
    }   
    let chart: Chart = new Chart({
         chartArea : {border : {width : 0}},
        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'DateTime',
            edgeLabelPlacement: 'Shift',
            majorGridLines: { width: 0 }
        },

        //Initializing Primary Y Axis
        primaryYAxis:
        {
            title: 'Profit ($)', labelFormat: '${value}k',
            rangePadding: 'None',
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 }
        },

        //Initializing Chart Series
        series: [
            {
                type: 'SplineArea',
                dataSource: series1,
                name: 'Product X',
                xName: 'x',
                yName: 'y',
                fill: fill,
                animation: { enable: false },
                border: { width: 2, color: borderColor[themes.indexOf(theme)] }
            },
        ],
        //Initializing Zooming
        zoomSettings:
        {
            enableMouseWheelZooming: true,
            enablePinchZooming: true,
            enableSelectionZooming: true,
            mode: 'X',
            showToolbar: true
        },
        //Initializing Chart title
        title: 'Sales History of Product X',
        legendSettings: { visible: false },
        width: Browser.isDevice ? '100%' : '75%',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
        }
    });
    chart.appendTo('#container');
};