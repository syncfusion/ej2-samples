/**
 * Export sample
 */
import { loadCultureFiles } from '../common/culture-loader';
import { LinearGauge, ILoadEventArgs, LinearGaugeTheme, ExportType, Print, ImageExport, PdfExport } from '@syncfusion/ej2-lineargauge';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Button } from '@syncfusion/ej2-buttons';
LinearGauge.Inject(Print, ImageExport, PdfExport);
(window as any).default = (): void => {
    loadCultureFiles();
    let gauge: LinearGauge = new LinearGauge({
        // custom code start
        load: (args: ILoadEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
        },
        // custom code end
        orientation: 'Horizontal',
        title: 'Speedometer',
        allowPrint: true,
        allowImageExport: true,
        allowPdfExport: true,
        axes: [{
            minimum: 0,
            maximum: 120,
            line:
            {
                width: 0
            },
            majorTicks: {
                height: 0,
                width: 0,
                interval: 20
            },
            minorTicks: {
                height: 7,
                width: 0,
                interval: 4
            },
            labelStyle: {
                position: 'Outside',
                offset: 4
            },
            ranges: [{
                start: 0,
                end: 20,
                startWidth: 15,
                endWidth: 25,
                color: '#82b944'
            },
            {
                start: 20, end: 40, startWidth: 25, endWidth: 35, color: '#a1cb43'
            },
            {
                start: 40, end: 60, startWidth: 35, endWidth: 45, color: '#ddec12'
            },
            {
                start: 60, end: 80, startWidth: 45, endWidth: 55, color: '#ffbc00'
            },
            {
                start: 80, end: 100, startWidth: 55, endWidth: 65, color: '#ff6000'
            },
            {
                start: 100,
                end: 120,
                startWidth: 65,
                endWidth: 75,
                color: 'red'
            },
            ],
            pointers: [{
                value: 80,
                height: 23,
                width: 35,
                offset: -55,
                markerType: 'Triangle',
                border:
                {
                    width: 2,
                    color: 'white'
                }
            }],
        }]
    });
    gauge.appendTo('#gauge');

    let mode: DropDownList = new DropDownList({
        index: 0,
        width: '90px'
    });
    mode.appendTo('#type');
    let exportGauge: Button = new Button({
        iconCss: 'e-icons e-play-icon1', cssClass: 'e-flat', isPrimary: true,
    });
    exportGauge.appendTo('#export');
    document.getElementById('export').onclick = () => {
        let fileName: string = (<HTMLInputElement>(document.getElementById('fileName'))).value;
        gauge.export(<ExportType>mode.value, fileName);
    };
    let printGauge: Button = new Button({
        iconCss: 'e-icons e-play-icon', cssClass: 'e-flat', isPrimary: true,
    });
    printGauge.appendTo('#print');
    document.getElementById('print').onclick = () => {
        gauge.print();
    };
};
