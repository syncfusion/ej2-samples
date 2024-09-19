import { CircularGauge, ILoadedEventArgs, GaugeTheme, ExportType, Print, ImageExport, PdfExport } from '@syncfusion/ej2-circulargauge';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Button } from '@syncfusion/ej2-buttons';
import { TextBox } from '@syncfusion/ej2-inputs';
CircularGauge.Inject(Print, ImageExport, PdfExport);
// custom code start
import { loadCultureFiles } from '../common/culture-loader';
loadCultureFiles();
// custom code end
(window as any).default = (): void => {
    let circulargauge: CircularGauge = new CircularGauge({
        allowPrint: true,
        allowImageExport: true,
        allowPdfExport: true,
        background:'transparent',
        axes: [{
            radius: '80%',
            startAngle: 0,
            endAngle: 0,
            direction: 'AntiClockWise',
            majorTicks: {
                position: 'Outside',
                width: 1,
                height: 25,
                interval: 10,
                useRangeColor: true
            },
            lineStyle: { width: 0 },
            minorTicks: {
                position: 'Outside',
                width: 1,
                height: 8,
                interval: 2,
                useRangeColor: true
            },
            ranges: [
                {
                    start: 0, end: 32,
                    radius: '90%',
                    startWidth: 10, endWidth: 35,
                    color: '#F8A197',
                },
                {
                    start: 32, end: 70,
                    radius: '90%',
                    startWidth: 10, endWidth: 35,
                    color: '#C45072',
                },
                {
                    start: 70, end: 100,
                    radius: '90%',
                    startWidth: 10, endWidth: 35,
                    color: '#1B679F',
                }],
            labelStyle: {
                font: {
                    color: '#424242',
                    fontFamily: 'inherit',
                    size: '12px',
                    fontWeight: 'Regular'
                },
                hiddenLabel: 'Last',
                offset: 2,
                position: 'Outside',
                useRangeColor: true
            },
            pointers: []
        }],
        load: (args: ILoadedEventArgs) => {
            // custom code start
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
            // custom code end
        }
    });
    circulargauge.appendTo('#gauge');

    let mode: DropDownList = new DropDownList({
        index: 0,
        width: '100%'
    });
    mode.appendTo('#type');
    let exportGauge: Button = new Button({
        isPrimary: true
    });
    exportGauge.appendTo('#export');
    let fileText: TextBox = new TextBox({
        value: 'Circular Gauge',
        width: '100%'
    });
    fileText.appendTo('#fileName');

    document.getElementById('export').onclick = () => {
        let fileName: string = fileText.value;
        circulargauge.export(<ExportType>mode.value, fileName);
    };
    let printGauge: Button = new Button({
        isPrimary: true
    });
    printGauge.appendTo('#print');
    document.getElementById('print').onclick = () => {
        circulargauge.print();
    };
};