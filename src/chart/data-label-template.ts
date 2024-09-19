import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart, ColumnSeries, DataLabel, Legend, ILoadedEventArgs,
    ChartTheme, Category, ITextRenderEventArgs
} from '@syncfusion/ej2-charts';
Chart.Inject(ColumnSeries, DataLabel, Category, Legend);
import { Browser } from '@syncfusion/ej2-base';
/**
 * Sample for DataLabel template
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let theme: ChartTheme;
    let chart: Chart = new Chart({
        title: 'Athletes in Popular School',
        subTitleStyle: {
            textAlignment: 'Far'
        },
        titleStyle: {
            fontStyle: 'medium', size: '14px'
        },
        chartArea: { border: { width: 0 } },
        // Initialize the chart axes
        primaryXAxis: {
            valueType: 'Category',
            edgeLabelPlacement: 'Shift',
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 },
        },
        primaryYAxis: {
            minimum: 0,
            maximum: 70,
            lineStyle:{width:0},
            majorGridLines:{ color:'#eaeaea', width:1}
        },
        
        // Initialize the chart series
        series: [
            {
                name: 'Boys',type:'Column',
                dataSource: [
                    { sports : "Tennis", boys : 50, girls : 38 },
                    { sports : "Badminton", boys : 30, girls : 40 },
                    { sports : "Cycling", boys : 37, girls : 20 },
                    { sports : "Football", boys : 60, girls : 21 },
                    { sports : "Hockey", boys : 15, girls : 8 },
                ], xName: 'sports', yName: 'boys',columnSpacing:0.5 , columnWidth:0.75,
                marker: {
                    visible: false,
                    shape: 'Circle',
                    dataLabel: {
                        visible: true,
                        position: 'Outer',
                        margin: { top: 70 },
                        template: '#Boys-Material'
                    }
                }, width: 2
            }, {
                name: 'Girls', type:'Column',
                dataSource: [
                    { sports : "Tennis", boys : 50, girls : 38 },
                    { sports : "Badminton", boys : 30, girls : 40 },
                    { sports : "Cycling", boys : 37, girls : 20 },
                    { sports : "Football", boys : 60, girls : 21 },
                    { sports : "Hockey", boys : 15, girls : 8 },
                ], xName: 'sports', yName: 'girls',columnSpacing:0.5 , columnWidth:0.75,
                marker: {
                    visible: false,
                    shape: 'Rectangle',
                    dataLabel: {
                        visible: true,
                        position: 'Outer',
                        margin: { top: 70 },
                        template: '#Girls-Material'
                    }
                }, width: 2
            }
        ],
        // Triggered text render and load event in chart
        textRender: (args: ITextRenderEventArgs) => {
            args.template = '#' + args.series.name + '-' + theme;
        },
        legendSettings: { visible: true },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
            theme = args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
            args.chart.theme = theme;
        },
        width: Browser.isDevice ? '100%' : '75%'
    });
    chart.appendTo('#container');
};