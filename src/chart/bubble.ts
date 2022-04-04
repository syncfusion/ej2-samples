import { loadCultureFiles } from '../common/culture-loader';
import { Chart, BubbleSeries, Tooltip, IPointRenderEventArgs } from '@syncfusion/ej2-charts';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import { EmitType } from '@syncfusion/ej2-base';
import { Browser } from '@syncfusion/ej2-base';
import { fabricColors, materialColors, bootstrapColors, highContrastColors, fluentColors, fluentDarkColors } from './theme-color';
Chart.Inject(BubbleSeries, Tooltip);

let pointRender: EmitType<IPointRenderEventArgs> = (args: IPointRenderEventArgs): void => {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
        args.fill = fabricColors[args.point.index % 10];
    } else if (selectedTheme === 'material') {
        args.fill = materialColors[args.point.index % 10];
    } else if (selectedTheme === 'highcontrast') {
        args.fill = highContrastColors[args.point.index % 10];
    } else if (selectedTheme === 'fluent') {
        args.fill = fluentColors[args.point.index % 10];
    } else if (selectedTheme === 'fluent-dark') {
        args.fill = fluentDarkColors[args.point.index % 10];
    } else {
        args.fill = bootstrapColors[args.point.index % 10];
    }
};

/**
 * Sample for Bubble series
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({
        // Initializing the Primary X and Y Axis
        primaryXAxis: {
            title: 'Literacy Rate',
            minimum: 60,
            maximum: 100,
            interval: 5
        },
        primaryYAxis: {
            title: 'GDP Growth Rate',
            minimum: 0,
            maximum: 10,
            interval: 2.5
        },
        width: Browser.isDevice ? '100%' : '60%',
        // Initializing the chart series
        series: [
            {
                type: 'Bubble',
                dataSource: [
                    { x: 92.2, y: 7.8, size: 1.347, text: 'China' },
                    { x: 74, y: 6.5, size: 1.241, text: 'India' },
                    { x: 90.4, y: 6.0, size: 0.238, text: 'Indonesia' },
                    { x: 99.4, y: 2.2, size: 0.312, text: 'US' },
                    { x: 88.6, y: 1.3, size: 0.197, text: 'Brazil' },
                    { x: 99, y: 0.7, size: 0.0818, text: 'Germany' },
                    { x: 72, y: 2.0, size: 0.0826, text: 'Egypt' },
                    { x: 99.6, y: 3.4, size: 0.143, text: 'Russia' },
                    { x: 99, y: 0.2, size: 0.128, text: 'Japan' },
                    { x: 86.1, y: 4.0, size: 0.115, text: 'Mexico' },
                    { x: 92.6, y: 6.6, size: 0.096, text: 'Philippines' },
                    { x: 61.3, y: 1.45, size: 0.162, text: 'Nigeria' },
                    { x: 82.2, y: 3.97, size: 0.7, text: 'Hong Kong' },
                    { x: 79.2, y: 3.9, size: 0.162, text: 'Netherland' },
                    { x: 72.5, y: 4.5, size: 0.7, text: 'Jordan' },
                    { x: 81, y: 3.5, size: 0.21, text: 'Australia' },
                    { x: 66.8, y: 3.9, size: 0.028, text: 'Mongolia' },
                    { x: 78.4, y: 2.9, size: 0.231, text: 'Taiwan' }
                ],
                minRadius: 3,
                maxRadius: Browser.isDevice ? 6 : 8,
                xName: 'x', yName: 'y', size: 'size', name: 'Pound',
                marker: { dataLabel: { name: 'text' } }
            },
        ],
        // Initiazlize the point render event
        pointRender: pointRender,
         // custom code start
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
        },
         // custom code end
        title: 'World Countries Details',
        // Initializing the tooltip with format
        tooltip: {
            enable: true,
            format: '${point.text}<br/>Literacy Rate : <b>${point.x}%</b>' +
                '<br/>GDP Annual Growth Rate : <b>${point.y}</b><br/>Population : <b>${point.size} Billion</b>'
        },
        legendSettings: { visible: false }
    });
    chart.appendTo('#container');
};