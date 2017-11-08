import {
    Chart, WaterfallSeries, Category, Tooltip, ILoadedEventArgs, DateTime, Zoom, Logarithmic,
    Crosshair, Legend, DataLabel, IAxisLabelRenderEventArgs, ITextRenderEventArgs, ChartTheme
} from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
Chart.Inject(WaterfallSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, Crosshair, Legend, DataLabel);

/**
 * Sample for Waterfall series
 */
this.default = (): void => {

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
            plotOffset: 20
        },
        //Initializing Primary Y Axis
        primaryYAxis: {
            minimum: 0, maximum: 5000, interval: 1000,
            majorGridLines: { width: 0 },
            title: 'Expenditure'
        },
        //Initializing Chart Series
        series: [{
            dataSource: chartData, width: 2, negativeFillColor: '#e56590',
            xName: 'x', yName: 'y', intermediateSumIndexes: [4], sumIndexes: [7],
            name: 'USA', columnWidth: 0.9,
            type: 'Waterfall', animation: { enable: true },
            marker: {
                dataLabel: { visible: true, font: { color: '#ffffff' } }
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
        width: Browser.isDevice ? '100%' : '80%',
        textRender: (args: ITextRenderEventArgs) => {
            let value: number = Number(args.text) / 1000;
            value = Math.round((value * 100)) / 100;
            args.text = value.toString();
        },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        }

    });
    chart.appendTo('#container');
};
