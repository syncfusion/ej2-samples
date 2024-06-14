// custom code start
import { loadCultureFiles } from '../common/culture-loader';
// custom code end
/**
 * Print and export sample for smith chart
 */
import { Smithchart, SmithchartLegend, TooltipRender, SmithchartExportType, ISmithchartLoadEventArgs,
    SmithchartTheme } from '@syncfusion/ej2-charts/index';
import { Button } from '@syncfusion/ej2-buttons';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
Smithchart.Inject(SmithchartLegend, TooltipRender);

(window as any).default = (): void => {
    // custom code start
    loadCultureFiles();
    // custom code end
    let smithchart: Smithchart = new Smithchart({
        // custom code start
        load: (args: ISmithchartLoadEventArgs) => {
            let theme: string = location.hash.split('/')[1];
            theme = theme ? theme : 'Material';
            args.smithchart.theme = <SmithchartTheme>(theme.charAt(0).toUpperCase() + theme.slice(1).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast'));
        },
        // custom code end
        horizontalAxis: {
            minorGridLines: {
                visible: true
            }
        },
        radialAxis: {
            minorGridLines: {
                visible: true
            }
        },
        series: [
            {
                points: [
                    { resistance: 0.15, reactance: 0 },
                    { resistance: 0.15, reactance: 0.15 },
                    { resistance: 0.18, reactance: 0.3 },
                    { resistance: 0.2, reactance: 0.4 },
                    { resistance: 0.25, reactance: 0.6 },
                    { resistance: 0.38, reactance: 0.95 },
                    { resistance: 0.6, reactance: 1.25 },
                    { resistance: 1, reactance: 1.6 },
                    { resistance: 1.65, reactance: 1.9 },
                    { resistance: 2.75, reactance: 2 },
                    { resistance: 4.5, reactance: 0 },
                    { resistance: 3, reactance: -2 },
                    { resistance: 1.65, reactance: -1.95 },
                    { resistance: 1, reactance: -1.65 },
                    { resistance: 0.6, reactance: -1.25 },
                    { resistance: 0.35, reactance: -0.9 },
                    { resistance: 0.25, reactance: -0.6 },
                    { resistance: 0.25, reactance: -0.4 },
                    { resistance: 0.25, reactance: -0.3 },
                    { resistance: 0.25, reactance: -0.15 },
                    { resistance: 0.25, reactance: 0 },
                ],
                name: 'Transmission',
                enableAnimation: false,
                tooltip: { visible: true },
                marker: {
                    shape: 'Circle',
                    visible: true,
                    border: {
                        width: 2,
                    }
                }
            },
        ],
        legendSettings: {
            visible: true,
            shape: 'Circle'
        }
    });
    smithchart.appendTo('#container');
    let mode: DropDownList = new DropDownList({
        index: 0,
        width: 100
    });
    mode.appendTo('#mode');
    let togglebtn1: Button = new Button({
        iconCss: 'e-icons e-export-icon', cssClass: 'e-flat', isPrimary: true
    });
    togglebtn1.appendTo('#togglebtn1');
    document.getElementById('togglebtn1').onclick = () => {
        let fileName: string = (<HTMLInputElement>(document.getElementById('fileName'))).value;
        smithchart.export(<SmithchartExportType>mode.value, fileName);
    };
    let togglebtn2: Button = new Button({
        cssClass: 'e-flat', iconCss: 'e-icons e-print-icon', isPrimary: true
    });
    togglebtn2.appendTo('#togglebtn2');
    document.getElementById('togglebtn2').onclick = () => {
        smithchart.print();
    };
};