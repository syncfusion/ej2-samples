import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart, WaterfallSeries, Category, Tooltip, ILoadedEventArgs, DateTime, Zoom, Logarithmic,
    Crosshair, Legend, DataLabel, IAxisLabelRenderEventArgs, ITextRenderEventArgs, ChartTheme
} from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
Chart.Inject(WaterfallSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, Crosshair, Legend, DataLabel);

/**
 * Sample for Waterfall series
 */
(window as any).default = (): void => {
    loadCultureFiles();

    let chartData: object[] = [
        { x: 'Income', y: 4711 }, { x: 'Sales', y: -1015 },
        { x: 'Development', y: -688 },
        { x: 'Revenue', y: 1030 }, { x: 'Balance' },
        { x: 'Expense', y: -361 }, { x: 'Tax', y: -695 },
        { x: 'Net Profit' }
    ];
    let chart: Chart = new Chart({
        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'Category',
            majorGridLines: { width: 0 },
            labelRotation: Browser.isDevice ? -45 : 0,
            labelIntersectAction: Browser.isDevice ? 'None' : 'Rotate45', majorTickLines: { width: 0 },
            minorTickLines: { width: 0 }
        },
        //Initializing Primary Y Axis
        primaryYAxis: {
            minimum: 0, maximum: 5000, interval: 1000,
            majorGridLines: { width: 1 }, lineStyle: { width: 0 }, majorTickLines: { width: 0 },
            minorTickLines: { width: 0 },
            title: 'Expenditure'
        },
        //Initializing Chart Series
        series: [{
            dataSource: chartData, width: 2, negativeFillColor: '#e56590',
            xName: 'x', yName: 'y', intermediateSumIndexes: [4], sumIndexes: [7],
            columnWidth: 0.9,border:{color:'black' , width: 1},
            type: 'Waterfall', animation: { enable: true },
            marker: {
                dataLabel: { visible: true }
            }, connector: { color: '#5F6A6A', width: 2 }
        }],
        chartArea: { border: { width: 0 } },
        //Initializing User Interaction Tooltip
        tooltip: {
            enable: true
        },
        //Initializing Chart Title
        title: 'Company Revenue and Profit',
        legendSettings: { visible: false },
        axisLabelRender: (args: IAxisLabelRenderEventArgs) => {
            if (args.axis.name === 'primaryYAxis') {
                args.text = '$' + Number(args.text) / 1000 + 'B';
            }
        },
        width: Browser.isDevice ? '100%' : '75%',
        textRender: (args: ITextRenderEventArgs) => {
            let value: number = Number(args.text) / 1000;
            value = Math.round((value * 100)) / 100;
            args.text = value.toString() + 'B';
        },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
        }

    });
    chart.appendTo('#container');
};
