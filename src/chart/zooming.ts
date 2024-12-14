import { loadCultureFiles } from '../common/culture-loader';
import { ChartTheme, DateTime, Chart, Zoom, LineSeries, ScrollBar, DataLabel, ILoadedEventArgs } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { data } from './financial-data';

Chart.Inject(DateTime, DataLabel, LineSeries, Zoom, ScrollBar);

/**
 * Sample for Zooming in chart
 */

(window as any).default = (): void => {
    loadCultureFiles();
    const seriesData: Object[] = [];
    let point: Object;
    let i: number;
    for (i = 0; i < data.length; i++) {
        point = { x: new Date(1941, i + 2, i), y: data[i as number] / 1000 - 0.5 };
        seriesData.push(point);
    }
    let chart: Chart = new Chart({
        //Initializing Primary X and Y Axis
        primaryXAxis: {
            valueType: 'DateTime',
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 },
            scrollbarSettings: {
                enableZoom: false
            }
        },
        primaryYAxis: {
            title: 'Temperature',
            intervalType: 'Months',
            labelFormat: '{value}°C',
            enableScrollbarOnZooming: false,
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 },
        },
        series: [
            {
                dataSource: seriesData,
                xName: 'x', yName: 'y',
                type: 'Line'
            }
        ],
        chartArea: { border: { width: 0 } },
        zoomSettings: {
            enableSelectionZooming: true,
            enableMouseWheelZooming: true,
            enableDeferredZooming: false,
            enableScrollbar: true,
            mode: 'X',
            enablePinchZooming: true,
            enableAnimation: true,
            showToolbar : true,
            toolbarPosition:{y: -60, draggable: true},
        },
        margin : {top: 20},
        width: Browser.isDevice ? '100%' : '80%',
        title: Browser.isDevice ? 'Monthly Temperature Anomalies' : 'Global Warming: Monthly Temperature Anomalies',
        titleStyle: { textAlignment: Browser.isDevice ? 'Near' : 'Center' },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'fluent2';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        }
    });
    chart.appendTo('#container');
};
