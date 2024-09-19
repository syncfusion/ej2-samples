import { CircularGauge, ILoadedEventArgs, GaugeTheme } from '@syncfusion/ej2-circulargauge';
import { CheckBox, ChangeEventArgs as CheckBoxChangeEvents } from '@syncfusion/ej2-buttons';
import { EmitType } from '@syncfusion/ej2-base';
// custom code start
import { loadCultureFiles } from '../common/culture-loader';
loadCultureFiles();
// custom code end
(window as any).default = (): void => {
    let circulargauge: CircularGauge = new CircularGauge({
        moveToCenter: false,
        centerX: '50%',
        centerY: '50%',
        background:'transparent',
        axes: [{
            hideIntersectingLabel: true,
            startAngle: 270, endAngle: 90,
            lineStyle: { width: 3 },
            labelStyle: {
                position: 'Outside', autoAngle: true,
                font: { fontWeight: 'normal', fontFamily: 'inherit' },
                format: '{value}%'
            }, majorTicks: {
                position: 'Inside', width: 2, height: 15, interval: 10
            }, minorTicks: {
                position: 'Inside', height: 8, width: 1, interval: 2
            },
            radius: '100%', minimum: 0, maximum: 100,
            pointers: [{
                animation: { enable: false },
                value: 30,
                radius: '75%',
                pointerWidth: 7,
                cap: { radius: 8, border: { width: 0 } },
                needleTail: { length: '13%' }
            }]
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
    
        let radiusAngleEnable : boolean;
        let highlightCheckBox: EmitType<CheckBoxChangeEvents>;
        let highlightCheckBoxCheckBox: CheckBox = new CheckBox(
        {
            change: highlightCheckBox            
        },
        '#angle');    
        highlightCheckBoxCheckBox.change = highlightCheckBox = (e: CheckBoxChangeEvents) => {
        radiusAngleEnable = e.checked;
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
    }

    document.getElementById('start').onpointermove = document.getElementById('start').ontouchmove =
        document.getElementById('start').onchange = () => {
            let min: number = parseInt((<HTMLInputElement>document.getElementById('start')).value, 10);
            document.getElementById('rangeStart').innerHTML = min + '°';
            circulargauge.axes[0].startAngle = min;
            circulargauge.refresh();
        };
    document.getElementById('end').onpointermove = document.getElementById('end').ontouchmove =
        document.getElementById('end').onchange = () => {
            let max: number = parseInt((<HTMLInputElement>document.getElementById('end')).value, 10);
            document.getElementById('rangeEnd').innerHTML = max + '°';
            circulargauge.axes[0].endAngle = max;
            circulargauge.refresh();
        };
    document.getElementById('radius').onpointermove = document.getElementById('radius').ontouchmove =
        document.getElementById('radius').onchange = () => {
            let max: number = parseInt((<HTMLInputElement>document.getElementById('radius')).value, 10);
            document.getElementById('radius1').innerHTML = max + '%';
            circulargauge.axes[0].radius = '' + max + '%';
            circulargauge.refresh();
        };
    document.getElementById('centerX').onpointermove = document.getElementById('centerX').ontouchmove =
        document.getElementById('centerX').onchange = () => {
            if (!radiusAngleEnable) {
                let max: number = parseInt((<HTMLInputElement>document.getElementById('centerX')).value, 10);
                document.getElementById('center1').innerHTML = max + '%';
                circulargauge.centerX = '' + max + '%';
                circulargauge.refresh();
            }
        };
    document.getElementById('centerY').onpointermove = document.getElementById('centerY').ontouchmove =
        document.getElementById('centerY').onchange = () => {
            if (!radiusAngleEnable) {
                let max: number = parseInt((<HTMLInputElement>document.getElementById('centerY')).value, 10);
                document.getElementById('center2').innerHTML = max + '%';
                circulargauge.centerY = '' + max + '%';
                circulargauge.refresh();
            }
        };

        let hideIntersectingLabel: EmitType<CheckBoxChangeEvents>;
        let hideIntersectingLabelCheckBox: CheckBox = new CheckBox(
            {
                change: hideIntersectingLabel,
                checked: true
            },
            '#hidelabel');    
            hideIntersectingLabelCheckBox.change = hideIntersectingLabel = (e: CheckBoxChangeEvents) => {            
            circulargauge.axes[0].hideIntersectingLabel = e.checked;
            circulargauge.refresh();
        }
};