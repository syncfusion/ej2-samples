import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart, ColumnSeries, IPointRenderEventArgs,
    Category, Legend, ILoadedEventArgs, ChartTheme,
    ExportType, Export
} from '@syncfusion/ej2-charts';
Chart.Inject(ColumnSeries, Category, Legend, Export);
import { Button } from '@syncfusion/ej2-buttons';
import { fabricColors, materialColors, bootstrapColors, highContrastColors } from './theme-color';
import { EmitType } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

/**
 * Sample for chart export
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
    } else {
        args.fill = bootstrapColors[args.point.index % 10];
    }
};
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            title: 'Countries',
            valueType: 'Category',
            majorGridLines: { width: 0 }

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
            title: 'Measurements',
            labelFormat: '{value}GW',
            minimum: 0,
            maximum: 40,
            interval: 10,
            majorGridLines: { width: 0 }
        },
        //Initializing Chart Series
        series: [
            {
                type: 'Column',
                dataSource: [
                    { x: 'DEU', y: 35.5 }, { x: 'CHN', y: 18.3 }, { x: 'ITA', y: 17.6 }, { x: 'JPN', y: 13.6 },
                    { x: 'US', y: 12 }, { x: 'ESP', y: 5.6 }, { x: 'FRA', y: 4.6 }, { x: 'AUS', y: 3.3 },
                    { x: 'BEL', y: 3 }, { x: 'UK', y: 2.9 }
                ],
                xName: 'x', width: 2,
                yName: 'y'
            }
        ],
        //Initializing Chart title
        title: 'Top 10 Countries Using Solar Power',
         // custom code start
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark');
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
        iconCss: 'e-icons e-play-icon', cssClass: 'e-flat', isPrimary: true,
    });
    togglebtn.appendTo('#togglebtn');
    document.getElementById('togglebtn').onclick = () => {
        let fileName: string = (<HTMLInputElement>(document.getElementById('fileName'))).value;
        chart.exportModule.export(<ExportType>mode.value, fileName);
    };
};