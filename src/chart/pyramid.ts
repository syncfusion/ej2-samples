import { loadCultureFiles } from '../common/culture-loader';
import {
    AccumulationChart, AccumulationLegend, PyramidSeries, AccumulationTooltip, AccumulationTheme, IAccLoadedEventArgs,
    AccumulationDataLabel, IAccTextRenderEventArgs, IAccResizeEventArgs
} from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2/base';
import { loadAccumulationChartTheme } from './theme-color';
AccumulationChart.Inject(AccumulationLegend, PyramidSeries, AccumulationTooltip, AccumulationDataLabel);

/**
 * Sample for Pyramid Chart
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let data: object[] = [{ x: 'Oils', y: 2, text: 'Oils: 2%' },
    { x: 'Protein', y: 10, text: 'Protein: 10%' },
    { x: 'Fruits', y: 15, text: 'Fruits: 15%' },
    { x: 'Dairy', y: 23, text: 'Dairy: 23%' },
    { x: 'Vegetables', y: 23, text: 'Vegetables: 23%' },
    { x: 'Grains', y: 27, text: 'Grains: 27%' }];

    let chart: AccumulationChart = new AccumulationChart({
        //Initializing Chart Series
        series: [{
            type: 'Pyramid', dataSource: data, xName: 'x', yName: 'y', width: '45%', height: '80%',
            neckWidth: '15%', gapRatio: 0.03, name: 'Food',
            dataLabel: {
                name: 'text', visible: true, position: 'Outside', connectorStyle: {length: Browser.isDevice ? '10px' : '20px'}, font: {
                    fontWeight: '600',  size: Browser.isDevice ? '7px' : '12px'
                }
            }, explode: false, emptyPointSettings: { mode: 'Drop', fill: 'red' }
        }],
        legendSettings: {
            visible: false
        },
        //Initializing User Interaction Tooltip
        tooltip: { enable: true, enableHighlight: true, format: '${point.x}: <b>${point.y}% of Daily Intake </b>',header:'' },
        textRender: (args: IAccTextRenderEventArgs) => {
            args.text = args.text;
        },
        load: (args: IAccLoadedEventArgs) => {
            loadAccumulationChartTheme(args);
        },
        //Initializing Chart Title
        title: 'Food Consumption Pyramid',
        subTitle: 'Source: wikipedia.org'
    });
    chart.appendTo('#container');
};