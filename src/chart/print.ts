import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart, ColumnSeries, IPointRenderEventArgs,
    IMouseEventArgs, Category, Legend, ILoadedEventArgs, ChartTheme, DataLabel
} from '@syncfusion/ej2-charts';
Chart.Inject(ColumnSeries, Category, Legend, DataLabel);
import { Button } from '@syncfusion/ej2-buttons';
import { fabricColors, materialColors, bootstrapColors, highContrastColors, fluentColors, fluentDarkColors, fluent2Colors, fluent2DarkColors } from './theme-color';
import { EmitType } from '@syncfusion/ej2-base';

/**
 * Sample for Chart print
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
    } else if (selectedTheme === 'fluent') {
        args.fill = fluentColors[args.point.index % 10];
    } else if (selectedTheme === 'fluent-dark') {
        args.fill = fluentDarkColors[args.point.index % 10];
    } else if (selectedTheme === 'fluent2') {
        args.fill = fluent2Colors[args.point.index % 10];
    } else if (selectedTheme === 'fluent2-dark') {
        args.fill = fluent2DarkColors[args.point.index % 10];
    } else {
        args.fill = bootstrapColors[args.point.index % 10];
    }
};
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'Category', interval: 1,
            majorGridLines: { width: 0 },
            majorTickLines: {width : 0},
        },
        chartArea: {
            border: {
                width: 0
            }
        },
        pointRender: labelRender,
        //Initializing Primary Y Axis
        primaryYAxis:
        {
            labelFormat: '${value}k',
            minimum: 0,
            maximum: 20,
            interval: 4,
            lineStyle: { width: 0 },
            majorGridLines: { width: 2 },
            majorTickLines: { width: 0 }
        },
        chartMouseClick: (args: IMouseEventArgs) => {
            if (args.target.indexOf('print') > -1) {
                chart.print();
            }
        },
        //Initializing Chart Series
        series: [
            {
                type: 'Column',
                dataSource: [
                      { x : "John", y : 10, text:"$10k" },
                      { x : "Jake", y : 12, text:"$12k" },
                      { x : "Peter", y : 18, text:"$18k" },
                      { x : "James", y : 11, text:"$11k" },
                      { x : "Mary", y : 9.7, text:"$9.7k" }],
                xName: 'x', width: 2,
                yName: 'y', marker: { dataLabel: { visible: true, name: 'text', position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }
            }
        ],
        //Initializing Chart title
        title: 'Sales Comparision',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
        }
    });
    chart.appendTo('#container');

    let printtogglebutton: Button = new Button({
        iconCss: 'e-icons e-print-icon', cssClass: 'e-flat', isPrimary: true,
    });
    printtogglebutton.appendTo('#printtogglebtn');
    document.getElementById('printtogglebtn').onclick = () => {
        chart.print();
    };
};