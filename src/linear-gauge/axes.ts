import { loadCultureFiles } from '../common/culture-loader';
/**
 * Axes Sample
 */
import { LinearGauge, Point, Annotations, Placement, Pointer, ILoadEventArgs, LinearGaugeTheme } from '@syncfusion/ej2-lineargauge';
LinearGauge.Inject(Annotations);
import { DropDownList } from '@syncfusion/ej2-dropdowns';
// code for property panel
(window as any).default = (): void => {
    loadCultureFiles();
    let gauge: LinearGauge = new LinearGauge(linearAxes());
    gauge.appendTo('#axisContainer');

    document.getElementById('opposed').onchange = (sender: Event) => {
        let ele: HTMLInputElement = <HTMLInputElement>document.getElementById('opposed');
        gauge.axes[0].opposedPosition = ele.checked;
        if (ele.checked) {
            gauge.axes[0].pointers[0].placement = 'Near';
            gauge.axes[0].pointers[0].markerType = 'Triangle';
            gauge.axes[0].pointers[0].offset = -20;
            gauge.axes[0].labelStyle.offset = 0;
            gauge.annotations[0].x = 10;
            gauge.annotations[0].y = -60;
        } else {
            gauge.axes[0].pointers[0].placement = 'Far';
            gauge.axes[0].pointers[0].offset = 0;
            gauge.axes[0].pointers[0].offset = 30;
            gauge.axes[0].pointers[0].markerType = 'InvertedTriangle';
            gauge.axes[0].labelStyle.offset = 38;
            gauge.annotations[0].x = 10;
            gauge.annotations[0].y = 60;
        }
        gauge.refresh();
    };

    document.getElementById('axisInversed').onchange = (sender: Event) => {
        let ele: HTMLInputElement = <HTMLInputElement>document.getElementById('axisInversed');
        gauge.axes[0].isInversed = ele.checked;
        gauge.refresh();
    };

    document.getElementById('min').ontouchmove = document.getElementById('min').onpointermove =
        document.getElementById('min').onchange = () => {
            let min: HTMLInputElement = <HTMLInputElement>document.getElementById('min');
            let max: HTMLInputElement = <HTMLInputElement>document.getElementById('max');
            gauge.axes[0].minimum = parseInt(min.value, 10);
            gauge.axes[0].maximum = parseInt(max.value, 10);
            document.getElementById('minValue').innerHTML = 'Axis Minimum <span>&nbsp;&nbsp;&nbsp;' + min.value;
            gauge.refresh();
            gauge.annotations[0].axisValue = (<Pointer>gauge.axes[0].pointers[0]).currentValue;
            gauge.refresh();
        };

    document.getElementById('max').ontouchmove = document.getElementById('max').onpointermove =
        document.getElementById('max').onchange = () => {
            let min: HTMLInputElement = <HTMLInputElement>document.getElementById('min');
            let max: HTMLInputElement = <HTMLInputElement>document.getElementById('max');
            gauge.axes[0].maximum = parseInt(max.value, 10);
            gauge.axes[0].minimum = parseInt(min.value, 10);
            document.getElementById('maxValue').innerHTML = 'Axis Maximum <span>&nbsp;&nbsp;&nbsp;' + max.value;
            gauge.refresh();
            gauge.annotations[0].axisValue = (<Pointer>gauge.axes[0].pointers[0]).currentValue;
            gauge.refresh();
        };

    document.getElementById('format').onchange = () => {
        let ele: HTMLInputElement = <HTMLInputElement>document.getElementById('format');
        gauge.axes[0].labelStyle.format = ele.value.indexOf('{value}') > -1 ? ele.value : gauge.axes[0].labelStyle.format;
        gauge.refresh();
    };

    let pointerPlace: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select Range Bar Color',
        width: 120,
        change: () => {
            gauge.axes[0].pointers[0].placement = <Placement>pointerPlace.value;
            gauge.refresh();
        }
    });
    pointerPlace.appendTo('#pointerPlace');

    let pointerType: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select Range Bar Color',
        width: 120,
        change: () => {
            gauge.axes[0].pointers[0].type = <Point>pointerType.value;
            pointerPlace.enabled = (pointerType.value === 'Marker');
            gauge.refresh();
        }
    });
    pointerType.appendTo('#pointerType');
};

export function getRandomArbitrary(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}
// code for linear gauge
export function linearAxes(): LinearGauge {
    let gauge: LinearGauge = new LinearGauge({
        // custom code start
        load: (arg: ILoadEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            arg.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        },
        // custom code end
        orientation: 'Horizontal',
        axes: [{
            line: {
                color: '#9E9E9E'
            },
            pointers: [{
                value: 10,
                height: 15,
                width: 15,
                color: '#757575',
                offset: 30
            }],
            majorTicks: {
                color: '#9E9E9E',
                interval: 10
            },
            minorTicks: {
                color: '#9E9E9E',
                interval: 2
            },
            labelStyle: {
                offset: 48
            }
        }],
        annotations: [{
            content: '<div id="pointer" style="width:70px"><h1 style="font-size:14px;">' +
            '${axes[0].pointers[0].currentValue} MPH</h1></div>',
            axisIndex: 0,
            axisValue: 10,
            x: 10,
            y: 60,
            zIndex: '1'
        }]
    });
    return gauge;
}