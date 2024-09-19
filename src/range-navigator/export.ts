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

/**
 * Sample for range navigator with print and export functionalities.
 */
let selectedTheme: string = location.hash.split('/')[1];
selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
let theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
let themes: string[] = ['Material', 'Fabric', 'Bootstrap', 'Bootstrap4', 'HighContrast', 'Bootstrap5', 'Tailwind','MaterialDark', 'FabricDark', 'BootstrapDark', 'TailwindDark', 'Bootstrap5Dark', 'Fluent', 'FluentDark', 'Material3', 'Material3Dark', 'Fluent2', 'Fluent2HighContrast', 'Fluent2Dark'];
let borderColor: string[] = ['#FF4081', '#007897', '#428BCA', '#FFD939', '#FFD939', '#FD7E14', '#4F46E5','#FF4081', '#007897', '#428BCA', '#22D3EE', '#FD7E14', '#1AC9E6', '#1AC9E6', '#6355C7', '#4EAAFF', '#6200EE', '#9BB449', '#9BB449'];
let regionColor: string[] = ['rgba(255, 64, 129, 0.3)', 'rgba(0, 120, 151, 0.3)',
        'rgba(66, 139, 202, 0.3)', 'rgba(255, 217, 57, 0.3)', 'rgba(255, 217, 57, 0.3)', 'rgba(253, 126, 20, 0.3)', 'rgba(79, 70, 229, 0.3)',
        'rgba(255, 64, 129, 0.3)', 'rgba(0, 120, 151, 0.3)', 'rgba(66, 139, 202, 0.3)', 'rgba(34, 211, 238, 0.3)', 'rgba(253, 126, 20, 0.3)', 'rgba(26, 201, 230, 0.3)', 'rgba(26, 201, 230, 0.3)', 'rgba(99, 85, 199, 0.3)', 'rgba(78, 170, 255, 0.3)', 'rgba(98, 0, 238, 0.3)', 'rgba(155, 180, 73, 0.3)', 'rgba(155, 180, 73, 0.3)'];

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
                    fill: regionColor[themes.indexOf(theme)], type: 'SplineArea',
                    border: { width: 2, color: borderColor[themes.indexOf(theme)] }
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