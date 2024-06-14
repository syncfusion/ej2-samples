import { loadCultureFiles } from '../common/culture-loader';
import {
    AccumulationChart, AccumulationLegend, PyramidSeries, AccumulationTooltip, AccumulationTheme, IAccLoadedEventArgs,
    AccumulationDataLabel, IAccTextRenderEventArgs, IAccResizeEventArgs
} from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2/base';
AccumulationChart.Inject(AccumulationLegend, PyramidSeries, AccumulationTooltip, AccumulationDataLabel);

/**
 * Sample for Pyramid Chart
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let data: object[] = [{ x: 'Milk, Youghnut, Cheese', y: 435, text: Browser.isDevice ? 'Milk, Youghnut,<br> Cheese:  435 cal' : 'Milk, Youghnut, Cheese: 435 cal' },
    { x: 'Vegetables', y: 470, text: 'Vegetables: 470 cal' },
    { x: 'Meat, Poultry, Fish', y: 475, text: Browser.isDevice ? 'Meat, Poultry,<br> Fish: 475 cal' : 'Meat, Poultry, Fish: 475 cal' },
    { x: 'Rice, Pasta', y: 930, text: Browser.isDevice ? 'Rice, Pasta:<br> 930 cal' : 'Rice, Pasta: 930 cal' },
    { x: 'Fruits', y: 520, text: Browser.isDevice ? 'Fruits: <br> 520 cal' : 'Fruits: 520 cal' },];

    let chart: AccumulationChart = new AccumulationChart({
        //Initializing Chart Series
        series: [{
            type: 'Pyramid', dataSource: data, xName: 'x', yName: 'y', width: '45%', height: '80%',
            neckWidth: '15%', gapRatio: 0.03, name: 'Food',
            dataLabel: {
                name: 'text', visible: true, position: 'Outside', connectorStyle: {length: '20px'}, font: {
                    fontWeight: '600'
                }
            }, explode: true, emptyPointSettings: { mode: 'Drop', fill: 'red' }
        }],
        legendSettings: {
            visible: false
        },
        //Initializing User Interaction Tooltip
        tooltip: { enable: true, format: '${point.x} : <b>${point.y} cal</b>',header:'' },
        textRender: (args: IAccTextRenderEventArgs) => {
            args.text = args.text;
        },
        load: (args: IAccLoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
        },
        //Initializing Chart Title
        title: 'Food Comparison Chart',
    });
    chart.appendTo('#container');
};