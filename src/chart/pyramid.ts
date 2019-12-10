import { loadCultureFiles } from '../common/culture-loader';
import {
    AccumulationChart, AccumulationLegend, PyramidSeries, AccumulationTooltip, AccumulationTheme, IAccLoadedEventArgs,
    AccumulationDataLabel, IAccTextRenderEventArgs, IAccResizeEventArgs
} from '@syncfusion/ej2-charts';
AccumulationChart.Inject(AccumulationLegend, PyramidSeries, AccumulationTooltip, AccumulationDataLabel);

/**
 * Sample for Pyramid Chart
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let data: object[] = [{ x: 'Sweet Treats', y: 120, text: '120 cal' },
    { x: 'Milk, Youghnut, Cheese', y: 435, text: '435 cal' },
    { x: 'Vegetables', y: 470, text: '470 cal' },
    { x: 'Meat, Poultry, Fish', y: 475, text: '475 cal' },
    { x: 'Fruits', y: 520, text: '520 cal' },
    { x: 'Bread, Rice, Pasta', y: 930, text: '930 cal' }];

    let chart: AccumulationChart = new AccumulationChart({
        //Initializing Chart Series
        series: [{
            type: 'Pyramid', dataSource: data, xName: 'x', yName: 'y', width: '45%', height: '80%',
            neckWidth: '15%', gapRatio: 0.03, name: 'Food',
            dataLabel: {
                name: 'text', visible: true, position: 'Inside', font: {
                    fontWeight: '600'
                }
            }, explode: true, emptyPointSettings: { mode: 'Drop', fill: 'red' }
        }],
        legendSettings: {
            visible: false
        },
        //Initializing User Interaction Tooltip
        tooltip: { enable: true, format: '${point.x} : <b>${point.y} cal</b>' },
        textRender: (args: IAccTextRenderEventArgs) => {
            args.text = args.text;
        },
        load: (args: IAccLoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
            if (args.accumulation.availableSize.width < args.accumulation.availableSize.height) {
                args.accumulation.series[0].width = '80%';
                args.accumulation.series[0].height = '60%';
            }
        },
        resized: (args: IAccResizeEventArgs) => {
            let bounds: ClientRect = document.getElementById('container').getBoundingClientRect();
            if (bounds.width < bounds.height) {
                args.accumulation.series[0].width = '80%';
                args.accumulation.series[0].height = '60%';
            } else {
                args.accumulation.series[0].width = '45%';
                args.accumulation.series[0].height = '80%';
            }
        },
        //Initializing Chart Title
        title: 'Food Comparison Chart',
    });
    chart.appendTo('#container');
};