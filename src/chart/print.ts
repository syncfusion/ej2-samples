import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart, ColumnSeries, 
    IMouseEventArgs, Category, Legend, ILoadedEventArgs, ChartTheme, DataLabel
} from '@syncfusion/ej2-charts';
Chart.Inject(ColumnSeries, Category, Legend, DataLabel);
import { Button } from '@syncfusion/ej2-buttons';
import { loadChartTheme, pointRender } from './theme-color';

/**
 * Sample for Chart print
 */
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
        pointRender: pointRender,
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
            loadChartTheme(args);
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