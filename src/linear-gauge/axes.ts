import { loadCultureFiles } from '../common/culture-loader';
/**
 * Axes Sample
 */
import { LinearGauge, Point, Annotations, Placement, Pointer, ILoadEventArgs, LinearGaugeTheme } from '@syncfusion/ej2-lineargauge';
LinearGauge.Inject(Annotations);
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { CheckBox, ChangeEventArgs as CheckBoxChangeEvents } from '@syncfusion/ej2-buttons';
import { EmitType } from '@syncfusion/ej2-base';
import { TextBox } from  '@syncfusion/ej2-inputs';
// code for property panel
(window as any).default = (): void => {
    loadCultureFiles();
    let gauge: LinearGauge = new LinearGauge(linearAxes());
    gauge.appendTo('#axisContainer');

    let opposedchange: EmitType<CheckBoxChangeEvents>;
    let opposedchangeCheckBox: CheckBox = new CheckBox(
    {
        change: opposedchange
    },
    '#opposed');
    
    opposedchangeCheckBox.change = opposedchange = (e: CheckBoxChangeEvents) => {
        let boolean: boolean = e.checked;
        gauge.axes[0].opposedPosition = boolean;
        if (boolean) {
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
    }

    let axisInversedchange: EmitType<CheckBoxChangeEvents>;
    let axisInversedchangeCheckBox: CheckBox = new CheckBox(
    {
        change: axisInversedchange
    },
    '#axisInversed');
    
    axisInversedchangeCheckBox.change = axisInversedchange = (e: CheckBoxChangeEvents) => {
        let boolean: boolean = e.checked;
        gauge.axes[0].isInversed = boolean;
        gauge.refresh();
    }

    let lastlabelchange: EmitType<CheckBoxChangeEvents>;
    let lastlabelchangeCheckBox: CheckBox = new CheckBox(
    {
        change: lastlabelchange
    },
    '#lastlabel');
    
    lastlabelchangeCheckBox.change = lastlabelchange = (e: CheckBoxChangeEvents) => {
        let boolean: boolean = e.checked;
        gauge.axes[0].showLastLabel = boolean;
        gauge.refresh();
    }
    
    document.getElementById('min').ontouchmove = document.getElementById('min').onpointermove =
        document.getElementById('min').onchange = () => {
            let min: HTMLInputElement = <HTMLInputElement>document.getElementById('min');
            let max: HTMLInputElement = <HTMLInputElement>document.getElementById('max');
            gauge.axes[0].minimum = parseInt(min.value, 10);
            gauge.axes[0].maximum = parseInt(max.value, 10);
            document.getElementById('minValue').innerHTML = min.value.toString();
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
            document.getElementById('maxValue').innerHTML = max.value.toString();
            gauge.refresh();
            gauge.annotations[0].axisValue = (<Pointer>gauge.axes[0].pointers[0]).currentValue;
            gauge.refresh();
        };

    let fileText: TextBox = new TextBox({
    });
    fileText.appendTo('#format');
    document.getElementById('format').onchange = () => {
        gauge.axes[0].labelStyle.format = fileText.value.indexOf('{value}') > -1 ? fileText.value : gauge.axes[0].labelStyle.format;
        gauge.refresh();
    };

    let pointerPlace: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select Range Bar Color',
        width: '100%',
        change: () => {
            gauge.axes[0].pointers[0].placement = <Placement>pointerPlace.value;
            gauge.refresh();
        }
    });
    pointerPlace.appendTo('#pointerPlace');

    let pointerType: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select Range Bar Color',
        width: '100%',
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
            arg.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
        },
        // custom code end
        orientation: 'Horizontal',
        axes: [{
            maximum: 115,
            line: {
                color: '#9E9E9E'
            },
            pointers: [{
                value: 20,
                height: 15,
                width: 15,
                color: '#757575',
                offset: 30
            }],
            majorTicks: {
                color: '#9E9E9E',
                interval: 20
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
            content: '<div id="pointer" style="width:70px"><h1 style="font-size:14px; font-family:Segoe UI;">' +
            '${axes[0].pointers[0].currentValue} MPH</h1></div>',
            axisIndex: 0,
            axisValue: 20,
            x: 10,
            y: 60,
            zIndex: '1'
        }]
    });
    return gauge;
}