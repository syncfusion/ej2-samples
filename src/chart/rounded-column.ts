import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart, ColumnSeries, Category, DataLabel,
    Tooltip, IPointRenderEventArgs,
    ILoadedEventArgs, ChartTheme
} from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { fabricColors, materialColors, bootstrapColors, highContrastColors } from './theme-color';
Chart.Inject(ColumnSeries, DataLabel, Category, Tooltip);
import { EmitType } from '@syncfusion/ej2-base';

/**
 * Sample for Column series with rounded corner
 */
let labelRender: EmitType<IPointRenderEventArgs> = (args: IPointRenderEventArgs): void => {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
        args.fill = fabricColors[args.point.index % 10];
    } else if (selectedTheme === 'material') {
        args.fill = materialColors[args.point.index % 10];
    } else if (selectedTheme === 'highcontrast') {
        args.fill = highContrastColors[args.point.index % 10];
    } else {
        args.fill = bootstrapColors[args.point.index % 10];
    }
};
(window as any).default = (): void => {
    loadCultureFiles();
    let count: number = 0;
    let chart: Chart = new Chart({
        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'Category', interval: 1, majorGridLines: { width: 0 },
            tickPosition: 'Inside',
            labelPosition: 'Inside', labelStyle: { color: '#ffffff' }
        },
        chartArea: { border: { width: 0 } },
        //Initializing Primary Y Axis
        primaryYAxis:
            {
                minimum: 0, maximum: 300, interval: 50, majorGridLines: { width: 0 },
                majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' }
            },

        //Initializing Chart Series
        series: [
            {
                type: 'Column', xName: 'x', width: 2, yName: 'y',
                dataSource: [
                    { x: 'Egg', y: 106 },
                    { x: 'Fish', y: 103 },
                    { x: 'Misc', y: 198 },
                    { x: 'Tea', y: 189 },
                    { x: 'Fruits', y: 250 }
                ], name: 'Tiger',
                cornerRadius: {
                    bottomLeft: 10, bottomRight: 10, topLeft: 10, topRight: 10
                },
                marker: { dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }
            }
        ],
        legendSettings: { visible: false },
        //Initializing Chart title
        title: 'Trade in Food Groups', tooltip: { enable: false },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
        },
        loaded: (args: ILoadedEventArgs) => {
            chart.loaded = null;
            let columninterval: number = setInterval(
                () => {
                    if (document.getElementById('column-container')) {
                        if (count === 0) {
                            chart.series[0].dataSource = [
                                { x: 'Egg', y: 206 },
                                { x: 'Fish', y: 123 },
                                { x: 'Misc', y: 48 },
                                { x: 'Tea', y: 240 },
                                { x: 'Fruits', y: 170 }
                            ];
                            chart.animate();
                            count++;
                        } else if (count === 1) {
                            chart.series[0].dataSource = [
                                { x: 'Egg', y: 86 },
                                { x: 'Fish', y: 173 },
                                { x: 'Misc', y: 188 },
                                { x: 'Tea', y: 109 },
                                { x: 'Fruits', y: 100 }
                            ];
                            chart.animate();
                            count++;
                        }  else if (count === 2) {
                            chart.series[0].dataSource = [
                                { x: 'Egg', y: 156 },
                                { x: 'Fish', y: 33 },
                                { x: 'Misc', y: 260 },
                                { x: 'Tea', y: 200 },
                                { x: 'Fruits', y: 30 }
                            ];
                            chart.animate();
                            count = 0;
                        }
                    } else {
                        clearInterval(columninterval);
                    }
                },
                2000
            );
        },
        pointRender: labelRender,
        width: Browser.isDevice ? '100%' : '60%',
    });
    chart.appendTo('#column-container');
};