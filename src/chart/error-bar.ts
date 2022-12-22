import { loadCultureFiles } from '../common/culture-loader';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import {
    ChartTheme, Chart, ErrorBar, ScatterSeries, Tooltip, Category,
    ILoadedEventArgs, ErrorBarMode, ErrorBarType, ErrorBarDirection,
    IPointRenderEventArgs
} from '@syncfusion/ej2-charts';
import { EmitType } from '@syncfusion/ej2-base';
import { fabricColors, materialColors, bootstrapColors, highContrastColors, fluentColors, fluentDarkColors } from './theme-color';
Chart.Inject(ScatterSeries, Category, ErrorBar, Tooltip);
/**
 * Sample for error bar
 */
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
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({
        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'Category', interval: 1, majorTickLines: { width: 0 },
            minorTickLines: { width: 0 },
            majorGridLines: { width: 0 }
        },
        chartArea: {
            border: { width: 0 }
        },
        //Initializing Primary Y Axis
        primaryYAxis:
            {
                labelFormat: '{value}%', minimum: 15, maximum: 45, lineStyle: { width: 0 }
            },
        pointRender: pointRender,
        //Initializing Chart Series
        series: [
            {
                type: 'Scatter',
                dataSource: [
                    { x: 'IND', y: 24 }, { x: 'AUS', y: 20 }, { x: 'USA', y: 35 },
                    { x: 'DEU', y: 27 }, { x: 'ITA', y: 30 },
                    { x: 'UK', y: 41 }, { x: 'RUS', y: 26 }
                ],
                xName: 'x', width: 2, yName: 'y', marker: { height: 10, width: 10 },
                errorBar: { visible: true, verticalError: 3, horizontalError: 3 }
            },
        ],
        //Initializing Chart title
        title: 'Sales Distribution of Car by Region',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
        },
        //Initializing tooltip
        tooltip: { enable: true },
        legendSettings: {
            visible: false
        }
    });
    chart.appendTo('#container');
    let selmode: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select Range Bar Color',
        width: 120,
        change: () => {
            chart.series[0].errorBar.type = <ErrorBarType>selmode.value;
            chart.series[0].animation.enable = false;
            chart.refresh();
        }
    });
    selmode.appendTo('#selmode');
    let drawmode: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select Range Bar Color',
        width: 120,
        change: () => {
            chart.series[0].errorBar.mode = <ErrorBarMode>drawmode.value;
            chart.series[0].animation.enable = false;
            chart.refresh();
        }
    });
    drawmode.appendTo('#drawmode');
    let direction: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select Range Bar Color',
        width: 120,
        change: () => {
            chart.series[0].animation.enable = false;
            chart.series[0].errorBar.direction = <ErrorBarDirection>direction.value; chart.refresh();
        }
    });
    direction.appendTo('#direction');
    let verticalerrror: NumericTextBox = new NumericTextBox({
        value: 3,
        min: 1,
        max: 20,
        width: 120,
        step: 1,
        change: () => {
            chart.series[0].animation.enable = false;
            chart.series[0].errorBar.verticalError = verticalerrror.value; chart.refresh();
        }
    });
    verticalerrror.appendTo('#verticalerrror');
    let horizontalerrror: NumericTextBox = new NumericTextBox({
        value: 3,
        min: 1,
        max: 20,
        width: 120,
        step: 1,
        change: () => {
            chart.series[0].animation.enable = false;
            chart.series[0].errorBar.horizontalError = horizontalerrror.value; chart.refresh();
        }
    });
    horizontalerrror.appendTo('#horizontalerrror');
};