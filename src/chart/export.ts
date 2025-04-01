import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart, ColumnSeries, 
    Category, Legend, ILoadedEventArgs, ChartTheme,
    ExportType, Export, DataLabel
} from '@syncfusion/ej2-charts';
Chart.Inject(ColumnSeries, Category, Legend, Export, DataLabel);
import { Button } from '@syncfusion/ej2-buttons';
import { loadChartTheme, pointRender } from './theme-color';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Browser } from '@syncfusion/ej2/base';

/**
 * Sample for chart export
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'Category', interval: 1,
            labelIntersectAction: Browser.isDevice ? 'None' : 'Trim',
            labelRotation: -45,
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 },

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
            labelFormat: '{value}GW',
            minimum: 0,
            maximum: 40,
            interval: 10,
            lineStyle: { width: 0 },
            majorGridLines: { width: 2 },
            minorTickLines: { width: 0 },
        },
        //Initializing Chart Series
        series: [
            {
                type: 'Column',
                name: 'Measurements (in Gigawatt)',
                dataSource: [
                    { x: "India", y: 35.5, text: Browser.isDevice ? "35.5" : "35.5GW" },
                    { x: "China", y: 18.3, text: Browser.isDevice ? "18.3" : "18.3GW" },
                    { x: "Italy", y: 17.6, text: Browser.isDevice ? " 17.6" : " 17.6GW" },
                    { x: "Japan", y: 13.6, text: Browser.isDevice ? "13.6" : "13.6GW" },
                    { x: "United state", y: 12, text: Browser.isDevice ? "12" : "12GW" },
                    { x: "Spain", y: 5.6, text: Browser.isDevice ? "5.6" : "5.6GW" },
                    { x: "France", y: 4.6, text: Browser.isDevice ? "4.6" : "4.6GW" },
                    { x: "Australia", y: 3.3, text: Browser.isDevice ? "3.3" : "3.3GW" },
                    { x: "Belgium", y: 3, text: Browser.isDevice ? "3" : "3GW" },
                    { x: "United Kingdom", y: 2.9, text: Browser.isDevice ? "2.9" : "2.9GW" }
                ],
                xName: 'x', width: 2,
                yName: 'y', marker: { dataLabel: { visible: true, name: 'text', position: 'Top', enableRotation: Browser.isDevice ? true : false, angle: Browser.isDevice ? -90 : 0, font: { fontWeight: '600', color: '#ffffff', size: '9px' } } }
            }
        ],
        //Initializing Chart title
        title: 'Top 10 Countries Using Solar Power',
        legendSettings: { visible: false },
        width: '95%',
         // custom code start
        load: (args: ILoadedEventArgs) => {
            loadChartTheme(args);
        }
         // custom code end
    });
    chart.appendTo('#container');
    let mode: DropDownList = new DropDownList({
        index: 0,
        width: 90
    });
    mode.appendTo('#mode');
    let togglebtn: Button = new Button({
        iconCss: 'e-icons e-export icon', isPrimary: true,
    });
    togglebtn.appendTo('#togglebtn');
    document.getElementById('togglebtn').onclick = () => {
        let fileName: string = (<HTMLInputElement>(document.getElementById('fileName'))).value;
        chart.exportModule.export(<ExportType>mode.value, fileName);
    };
};