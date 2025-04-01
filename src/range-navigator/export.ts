import { loadCultureFiles } from '../common/culture-loader';
import {
    ChartTheme, RangeNavigator, Chart, SplineAreaSeries, Crosshair,
    ExportType, DateTime, StepLineSeries, IChangedEventArgs, Tooltip, Export
} from '@syncfusion/ej2-charts';
Chart.Inject(SplineAreaSeries, DateTime, Crosshair, Tooltip, Export);
RangeNavigator.Inject(DateTime, StepLineSeries);
import { Button } from '@syncfusion/ej2-buttons';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Fetch } from '@syncfusion/ej2-base';
import { borderColor, printBorderColor, printRegionColors, printThemes, loadRangeNavigatorTheme } from './theme-colors';

/**
 * Sample for range navigator with print and export functionalities.
 */
let theme: ChartTheme = loadRangeNavigatorTheme();

(window as any).default = (): void => {
    loadCultureFiles();
    let datasrc: Object[];
    let fetchApi: Fetch = new Fetch('./src/range-navigator/data-source/export-data.json', 'GET');
    fetchApi.send().then();
    // Rendering Dialog on FETCH success
    fetchApi.onSuccess = (data: Object[]): void => {
        datasrc = data;
        datasrc.map((data: Object) => {
            // tslint:disable-next-line:no-string-literal
            data['xDate'] = new Date(data['xDate']);
        });
        let chart: Chart = new Chart(
            {
                primaryXAxis: {
                    valueType: 'DateTime', crosshairTooltip: { enable: true },
                    edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 }
                },
                series: [{
                    dataSource: datasrc, xName: 'xDate', yName: 'Close', width: 2,
                    name: 'Close',
                    fill: printRegionColors[printThemes.indexOf(theme)], type: 'SplineArea',
                    border: { width: 2, color: printBorderColor[printThemes.indexOf(theme)] }
                }],
                chartArea: { border: { width: 0 } },
                primaryYAxis: {
                    minimum: 81, maximum: 87, interval: 2,
                    majorTickLines: { width: 0 }, lineStyle: { width: 0 },
                    labelFormat: '{value}M', title: 'Million in USD'
                },
                tooltip: { enable: true, shared: true },
                legendSettings: { visible: false },
                height: '350',
                theme: theme
            }
        );
        chart.appendTo('#chart');
        let dateTimeControl: RangeNavigator = new RangeNavigator(
            {
                valueType: 'DateTime',
                animationDuration: 500,
                intervalType: 'Months',
                labelFormat: 'MMM', theme: theme,
                enableGrouping: true,
                value: [new Date('2013-05-01'), new Date('2013-08-01')],
                dataSource: datasrc,
                xName: 'xDate', yName: 'Close',
                changed: (args: IChangedEventArgs) => {
                    chart.primaryXAxis.zoomFactor = args.zoomFactor;
                    chart.primaryXAxis.zoomPosition = args.zoomPosition;
                    chart.dataBind();
                }
            }
        );
        dateTimeControl.appendTo('#container');
    
        let mode: DropDownList = new DropDownList({
            index: 0,
            width: 90
        });
        mode.appendTo('#mode');
        let togglebtn: Button = new Button({
            iconCss: 'e-icons e-export-icon', cssClass: 'e-flat', isPrimary: true,
        });
        togglebtn.appendTo('#exportBtn');
        document.getElementById('exportBtn').onclick = () => {
            let fileName: string = (<HTMLInputElement>(document.getElementById('fileName'))).value;
            chart.exportModule.export(<ExportType>mode.value, fileName, null, [dateTimeControl, chart]);
        };
    
        let printBtn: Button = new Button({
            iconCss: 'e-icons e-print-icon', cssClass: 'e-flat', isPrimary: true,
        });
        printBtn.appendTo('#printBtn');
        document.getElementById('printBtn').onclick = () => {
            dateTimeControl.print(['container', 'chart']);
        };
    };
};