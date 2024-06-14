import { CircularGauge, Annotations, ILoadedEventArgs, GaugeTheme } from '@syncfusion/ej2-circulargauge';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { CheckBox, ChangeEventArgs as CheckBoxChangeEvents } from '@syncfusion/ej2-buttons';
import { EmitType } from '@syncfusion/ej2-base';
CircularGauge.Inject(Annotations);
// custom code start
import { loadCultureFiles } from '../common/culture-loader';
loadCultureFiles();
// custom code end
(window as any).default = (): void => {
    let circulargauge: CircularGauge = new CircularGauge({
        background:'transparent',
        axes: [{
            lineStyle: { width: 10, color: 'transparent' },
            labelStyle: {
                position: 'Inside', useRangeColor: false,
                font: { size: '12px', fontStyle: 'normal', fontFamily: 'inherit' }
            }, majorTicks: { height: 10, offset: 5 }, minorTicks: { height: 0 },
            annotations: [{
                description:'Speedometer',
                content: '<div><span style="font-size:14px; font-family:inherit">Speedometer</span></div>',
                radius: '30%', angle: 0, zIndex: '1'
            }, {
                description:'65 MPH',
                content: '<div><span style="font-size:20px; font-family:inherit">65 MPH</span></div>',
                radius: '40%', angle: 180, zIndex: '1'
            }],
            startAngle: 210, endAngle: 150, minimum: 0, maximum: 120, radius: '80%',
            ranges: [{ start: 0, end: 40, color: '#30B32D' }, { start: 40, end: 80, color: '#FFDD00' },
            { start: 80, end: 120, color: '#F03E3E' }],
            pointers: [{
                value: 65, radius: '60%', pointerWidth: 8,
                cap: { radius: 7 }, needleTail: { length: '18%' }
            }]
        }],
        load: (args: ILoadedEventArgs) => {
            // custom code start
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
            // custom code end
        }
    });
    circulargauge.appendTo('#range-container');
    
    let listObj: DropDownList = new DropDownList({
        index: 0, width: '100%',
        change: () => {
            let index: number = +listObj.value;
            colortObj.value = circulargauge.axes[0].ranges[index].color;
            (<HTMLInputElement>document.getElementById('endWidth')).value = circulargauge.axes[0].ranges[index].endWidth.toString();
            document.getElementById('rangeEndWidth').innerHTML = circulargauge.axes[0].ranges[index].endWidth.toString();
            (<HTMLInputElement>document.getElementById('startWidth')).value = circulargauge.axes[0].ranges[index].startWidth.toString();
            document.getElementById('rangeStartWidth').innerHTML = circulargauge.axes[0].ranges[index].startWidth.toString();
            (<HTMLInputElement>document.getElementById('end')).value = circulargauge.axes[0].ranges[index].end.toString();
            document.getElementById('rangeEnd').innerHTML = circulargauge.axes[0].ranges[index].end.toString();
            (<HTMLInputElement>document.getElementById('start')).value = circulargauge.axes[0].ranges[index].start.toString();
            document.getElementById('rangeStart').innerHTML = circulargauge.axes[0].ranges[index].start.toString();
            (<HTMLInputElement>document.getElementById('radius')).value = circulargauge.axes[0].ranges[index].roundedCornerRadius.toString();
            document.getElementById('cornerRadius').innerHTML = circulargauge.axes[0].ranges[index].roundedCornerRadius.toString();
            if (index == 0) {
                (<HTMLInputElement>document.getElementById('start')).min = "0";
                (<HTMLInputElement>document.getElementById('start')).max = "40";
                (<HTMLInputElement>document.getElementById('end')).min = "0";
                (<HTMLInputElement>document.getElementById('end')).max = "40";
            } else if (index == 1) {
                (<HTMLInputElement>document.getElementById('start')).min = "40";
                (<HTMLInputElement>document.getElementById('start')).max = "80";
                (<HTMLInputElement>document.getElementById('end')).min = "40";
                (<HTMLInputElement>document.getElementById('end')).max = "80";
            } else {
                (<HTMLInputElement>document.getElementById('start')).min = "80";
                (<HTMLInputElement>document.getElementById('start')).max = "120";
                (<HTMLInputElement>document.getElementById('end')).min = "80";
                (<HTMLInputElement>document.getElementById('end')).max = "120";
            }
            (<HTMLInputElement>document.getElementById('start')).value = circulargauge.axes[0].ranges[index].start.toString();
            (<HTMLInputElement>document.getElementById('end')).value = circulargauge.axes[0].ranges[index].end.toString();
            document.getElementById('rangeStart').innerHTML = circulargauge.axes[0].ranges[index].start.toString();
            (<HTMLInputElement>document.getElementById('radius')).value = circulargauge.axes[0].ranges[index].roundedCornerRadius.toString();
            document.getElementById('cornerRadius').innerHTML = circulargauge.axes[0].ranges[index].roundedCornerRadius.toString();
        }
    });
    listObj.appendTo('#rangeSelect');

    let colortObj = new DropDownList({
        index: 0, width: '100%',
        change: () => {
            circulargauge.axes[0].ranges[+listObj.value].color = colortObj.value.toString();
            circulargauge.axes[0].pointers[0].animation.enable = false; circulargauge.refresh();
        }
    });
    colortObj.appendTo('#rangeColor');

    document.getElementById('start').onpointermove = document.getElementById('start').ontouchmove =
        document.getElementById('start').onchange = () => {
            let min: number = parseInt((<HTMLInputElement>document.getElementById('start')).value, 10);
            document.getElementById('rangeStart').innerHTML = min.toString();
            circulargauge.axes[0].ranges[+listObj.value].start = min;
            circulargauge.axes[0].pointers[0].animation.enable = false; circulargauge.refresh();
        };

    document.getElementById('end').onpointermove = document.getElementById('end').ontouchmove =
        document.getElementById('end').onchange = () => {
            let max: number = parseInt((<HTMLInputElement>document.getElementById('end')).value, 10);
            document.getElementById('rangeEnd').innerHTML = max.toString();
            circulargauge.axes[0].ranges[+listObj.value].end = max;
            circulargauge.axes[0].pointers[0].animation.enable = false; circulargauge.refresh();
        };

    document.getElementById('startWidth').onpointermove = document.getElementById('startWidth').ontouchmove =
        document.getElementById('startWidth').onchange = () => {
            let startWidth: number = parseInt((<HTMLInputElement>document.getElementById('startWidth')).value, 10);
            document.getElementById('rangeStartWidth').innerHTML = startWidth.toString();
            circulargauge.axes[0].ranges[+listObj.value].startWidth = startWidth;
            circulargauge.axes[0].pointers[0].animation.enable = false; circulargauge.refresh();
        };

    document.getElementById('endWidth').onpointermove = document.getElementById('endWidth').ontouchmove =
        document.getElementById('endWidth').onchange = () => {
            let endWidth: number = parseInt((<HTMLInputElement>document.getElementById('endWidth')).value, 10);
            document.getElementById('rangeEndWidth').innerHTML = endWidth.toString();
            circulargauge.axes[0].ranges[+listObj.value].endWidth = endWidth;
            circulargauge.axes[0].pointers[0].animation.enable = false; circulargauge.refresh();
        };

    document.getElementById('radius').onpointermove = document.getElementById('radius').ontouchmove =
        document.getElementById('radius').onchange = () => {
            let radius: number = parseInt((<HTMLInputElement>document.getElementById('radius')).value, 10);
            document.getElementById('cornerRadius').innerHTML = radius.toString();
            circulargauge.axes[0].ranges[+listObj.value].roundedCornerRadius = radius;
            circulargauge.axes[0].pointers[0].animation.enable = false; circulargauge.refresh();
        };
    let rangeFontchange: EmitType<CheckBoxChangeEvents>;
    let rangeFontchangeCheckBox: CheckBox = new CheckBox(
        {
            change: rangeFontchange
        },
        '#enable');

    rangeFontchangeCheckBox.change = rangeFontchange = (e: CheckBoxChangeEvents) => {
        let boolean: boolean = e.checked;
        circulargauge.axes[0].labelStyle.useRangeColor = boolean;
        circulargauge.axes[0].majorTicks.useRangeColor = boolean;
        circulargauge.axes[0].minorTicks.useRangeColor = boolean;
        circulargauge.axes[0].pointers[0].animation.enable = false; circulargauge.refresh();
    }
};
