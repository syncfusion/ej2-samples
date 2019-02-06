import { loadCultureFiles } from '../common/culture-loader';
/**
 * Default sample
 */
import { CircularGauge, ILoadedEventArgs, GaugeTheme } from '@syncfusion/ej2-circulargauge';
import { CheckBox, ChangeEventArgs as CheckBoxChangeEvents } from '@syncfusion/ej2-buttons';
import { EmitType } from '@syncfusion/ej2-base';
//tslint:disable:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    let circulargauge: CircularGauge = new CircularGauge({
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        },
        moveToCenter: false,
        axes: [{
            startAngle: 270, endAngle: 90,
            lineStyle: { width: 0, color: '#0450C2' },
            labelStyle: {
                position: 'Outside', autoAngle: true,
                font: { fontWeight: 'normal' }
            }, majorTicks: {
                position: 'Inside', width: 2, height: 12, interval: 20
            }, minorTicks: {
                position: 'Inside', height: 5, width: 1, interval: 2
            },
            radius: '80%', minimum: 0, maximum: 100,
            pointers: [{
                animation: { enable: false },
                value: 30,
                radius: '75%',
                color: '#FF9200',
                pointerWidth: 7,
                cap: { radius: 8, color: '#565656', border: { width: 0 } },
                needleTail: { length: '13%', color: '#FF9200' }
            }]
        }]
    });
    circulargauge.appendTo('#gauge');
    let opacity: EmitType<CheckBoxChangeEvents>;
    let highlightCheckBox: CheckBox = new CheckBox(
    {
        change: opacity, checked: false,
    },
    '#angle');
    highlightCheckBox.change = opacity = (e: CheckBoxChangeEvents) => {
        let centerX: HTMLInputElement = document.getElementById('centerX') as HTMLInputElement;
        let centerY: HTMLInputElement = document.getElementById('centerY') as HTMLInputElement;
        if (e.checked) {
            circulargauge.centerX = null;
            circulargauge.centerY = null;
            circulargauge.moveToCenter = true;
            centerX.disabled = true;
            centerY.disabled = true;
        } else {
            circulargauge.centerX = centerX.value + '%';
            circulargauge.centerY = centerY.value + '%';
            centerX.disabled = false;
            centerY.disabled = false;
            circulargauge.moveToCenter = false;
        }
        circulargauge.refresh();
    };
    document.getElementById('start').onpointermove = document.getElementById('start').ontouchmove =
    document.getElementById('start').onchange = () => {
        let min: number = parseInt((<HTMLInputElement>document.getElementById('start')).value, 10);
        document.getElementById('rangeStart').innerHTML = 'Start Angle <span> &nbsp;&nbsp;&nbsp;' + min + '°';
        circulargauge.axes[0].startAngle = min;
        circulargauge.refresh();
    };
    document.getElementById('end').onpointermove = document.getElementById('end').ontouchmove =
    document.getElementById('end').onchange = () => {
        let max: number = parseInt((<HTMLInputElement>document.getElementById('end')).value, 10);
        document.getElementById('rangeEnd').innerHTML = 'End Angle <span> &nbsp;&nbsp;&nbsp;' + max + '°';
        circulargauge.axes[0].endAngle = max;
        circulargauge.refresh();
    };
    document.getElementById('radius').onpointermove = document.getElementById('radius').ontouchmove =
    document.getElementById('radius').onchange = () => {
        let max: number = parseInt((<HTMLInputElement>document.getElementById('radius')).value, 10);
        document.getElementById('radius1').innerHTML = 'Radius <span> &nbsp;&nbsp;&nbsp;' + max + '%';
        circulargauge.axes[0].radius = '' + max + '%';
        circulargauge.refresh();
    };
    document.getElementById('centerX').onpointermove = document.getElementById('centerX').ontouchmove =
    document.getElementById('centerX').onchange = () => {
        if (!highlightCheckBox.checked) {
            let max: number = parseInt((<HTMLInputElement>document.getElementById('centerX')).value, 10);
            document.getElementById('center1').innerHTML = 'Center X <span> &nbsp;&nbsp;&nbsp;' + max + '%';
            circulargauge.centerX = '' + max + '%';
            circulargauge.refresh();
        }
    };
    document.getElementById('centerY').onpointermove = document.getElementById('centerY').ontouchmove =
    document.getElementById('centerY').onchange = () => {
        if (!highlightCheckBox.checked) {
            let max: number = parseInt((<HTMLInputElement>document.getElementById('centerY')).value, 10);
            document.getElementById('center2').innerHTML = 'Center Y <span> &nbsp;&nbsp;&nbsp;' + max + '%';
            circulargauge.centerY = '' + max + '%';
            circulargauge.refresh();
        }
    };
};
