import { loadCultureFiles } from '../common/culture-loader';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import {
    ChartTheme, Chart, ErrorBar, ColumnSeries, Tooltip, Category,
    ILoadedEventArgs, ErrorBarMode, ErrorBarType, ErrorBarDirection,
} from '@syncfusion/ej2-charts';
import { Browser, EmitType } from '@syncfusion/ej2-base';
import { fabricColors, materialColors, bootstrapColors, highContrastColors, fluentColors, fluentDarkColors, loadChartTheme } from './theme-color';
Chart.Inject(ColumnSeries, Category, ErrorBar, Tooltip);
/**
 * Sample for error bar
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({
        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'Category', interval: 1, majorTickLines: { width: 0 },
            labelIntersectAction: Browser.isDevice ? "None" : "Rotate45",
            labelRotation: Browser.isDevice ? -45 : 0,
            majorGridLines: { width: 0 }
        },
        chartArea: {
            border: { width: 0 }
        },
        //Initializing Primary Y Axis
        primaryYAxis:
            {
                minimum: 0, 
                maximum: 1250, 
                interval: 250,
                lineStyle: { width: 0 },
                title: "Quantity",
                majorTickLines: { width:0 }
            },
        //Initializing Chart Series
        series: [
            {
                type: 'Column',
                dataSource: [
                    { x: "Printer", y: 750, error: 50 },
                    { x: "Desktop", y: 500, error: 70 },
                    { x: "Charger", y: 550, error: 60 },
                    { x: "Mobile", y: 575, error: 80 },
                    { x: "Keyboard", y: 400, error: 20 },
                    { x: "Power Bank", y: 450, error: 90 },
                    { x: "Laptop", y: 650, error: 40 },
                    { x: "Battery", y: 525, error: 84 }
                ],
                xName: 'x', yName: 'y', marker: { height: 7, width: 7 },
                errorBar: { visible: true, verticalError: 'error'}
            },
        ],
        //Initializing Chart title
        title: 'Quantity vs Items',
        width: Browser.isDevice ? '100%' : '75%',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = loadChartTheme(args);
            if (selectedTheme === 'bootstrap5' || selectedTheme === 'fluent') {
                chart.series[0].fill = '#81CCBB';
                chart.highlightColor = '#C7E9B6';
            }
        },
        tooltipRender: (args) => {
            args.text =  '<b>'+args.data.pointX + ' Count'  + ': ' + args.data.pointY  + '</b> (error range: ' + (args.data.pointY - args.series.visiblePoints[args.data.pointIndex].verticalError / 2 ) + '-' + (args.data.pointY + args.series.visiblePoints[args.data.pointIndex].verticalError / 2 ) + ')';
        },
        //Initializing tooltip
        tooltip: { enable: true, enableMarker: false },
        legendSettings: {
            visible: false
        }
    });
    chart.appendTo('#container');
};