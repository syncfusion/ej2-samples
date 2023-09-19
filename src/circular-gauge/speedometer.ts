import { CircularGauge, IAxisLabelRenderEventArgs, Annotations } from '@syncfusion/ej2-circulargauge';
import { CheckBox, ChangeEventArgs as CheckBoxChangeEvents } from '@syncfusion/ej2-buttons';
import { EmitType, isNullOrUndefined } from '@syncfusion/ej2-base';
import { gauge6 } from './pointer-gauge';
// custom code start
import { loadCultureFiles } from '../common/culture-loader';
loadCultureFiles();
// custom code end
CircularGauge.Inject(Annotations);
(window as any).default = (): void => {
    let circulargauge: CircularGauge = gauge6();
    circulargauge.appendTo('#container');
    let gauge5Interval1: any = setInterval(
        (): void => {
            let newVal: number = circulargauge.axes[0].pointers[0].value + (Math.floor(Math.random() * (10 - (-10))) - 10);
            if (newVal <= 0) {
                newVal = 5;
            }
            if (document.getElementById('container')) {
                circulargauge.axes[0].pointers[0].animation.enable = true;
                circulargauge.setPointerValue(0, 0, newVal);
                if (!isNullOrUndefined(document.getElementById('pointerannotation'))) {
                    document.getElementById('pointerannotation').innerHTML = newVal.toString() + ' km/h';
                }
            } else {
                clearInterval(gauge5Interval1);
            }
        },
        1000
    );
    let combineRange: EmitType<CheckBoxChangeEvents>;
    let rangeSet: CheckBox = new CheckBox(
        {
            change: combineRange, checked: false
        },
        '#combineRange');
    let gapRanges: EmitType<CheckBoxChangeEvents>;
    let showCheckBox: CheckBox = new CheckBox(
        {
            change: gapRanges, checked: false
        },
        '#range');
    rangeSet.change = combineRange = (e: CheckBoxChangeEvents) => {
        let element: HTMLInputElement = document.getElementById('range') as HTMLInputElement;
        if (e.checked === true) {
            showCheckBox.disabled = true;
            circulargauge.axes[0].ranges[0].start = 0;
            circulargauge.axes[0].ranges[0].end = 120;
            circulargauge.axes[0].ranges[0].startWidth = 5;
            circulargauge.axes[0].ranges[0].endWidth = 35;
            circulargauge.axes[0].ranges[0].color = 'url(#grad1)';
            circulargauge.axes[0].ranges[1].start = null;
            circulargauge.axes[0].ranges[1].end = null;
            circulargauge.axes[0].ranges[1].startWidth = '';
            circulargauge.axes[0].ranges[1].endWidth = '';
            circulargauge.axes[0].ranges[1].color = '';
            circulargauge.axes[0].ranges[2].start = null;
            circulargauge.axes[0].ranges[2].end = null;
            circulargauge.axes[0].ranges[2].startWidth = '';
            circulargauge.axes[0].ranges[2].endWidth = '';
            circulargauge.axes[0].ranges[2].color = '';
            circulargauge.axes[0].ranges[3].start = null;
            circulargauge.axes[0].ranges[3].end = null;
            circulargauge.axes[0].ranges[3].startWidth = '';
            circulargauge.axes[0].ranges[3].endWidth = '';
            circulargauge.axes[0].ranges[3].color = '';
            circulargauge.axes[0].ranges[4].start = null;
            circulargauge.axes[0].ranges[4].end = null;
            circulargauge.axes[0].ranges[4].startWidth = '';
            circulargauge.axes[0].ranges[4].endWidth = '';
            circulargauge.axes[0].ranges[4].color = '';
            circulargauge.axes[0].ranges[5].start = null;
            circulargauge.axes[0].ranges[5].end = null;
            circulargauge.axes[0].ranges[5].startWidth = '';
            circulargauge.axes[0].ranges[5].endWidth = '';
            circulargauge.axes[0].ranges[5].color = '';
            circulargauge.axes[0].pointers[0].animation.enable = false;
            circulargauge.refresh();
        } else {
            showCheckBox.disabled = false;
            circulargauge.axes[0].ranges[0].start = 0;
            circulargauge.axes[0].ranges[0].end = 20;
            circulargauge.axes[0].ranges[0].startWidth = 5;
            circulargauge.axes[0].ranges[0].endWidth = 10;
            circulargauge.axes[0].ranges[0].color = '#82b944';
            circulargauge.axes[0].ranges[1].start = 20;
            circulargauge.axes[0].ranges[1].end = 40;
            circulargauge.axes[0].ranges[1].startWidth = 10;
            circulargauge.axes[0].ranges[1].endWidth = 15;
            circulargauge.axes[0].ranges[1].color = '#a1cb43';
            circulargauge.axes[0].ranges[2].start = 40;
            circulargauge.axes[0].ranges[2].end = 60;
            circulargauge.axes[0].ranges[2].startWidth = 15;
            circulargauge.axes[0].ranges[2].endWidth = 20;
            circulargauge.axes[0].ranges[2].color = '#ddec12';
            circulargauge.axes[0].ranges[3].start = 60;
            circulargauge.axes[0].ranges[3].end = 80;
            circulargauge.axes[0].ranges[3].startWidth = 20;
            circulargauge.axes[0].ranges[3].endWidth = 25;
            circulargauge.axes[0].ranges[3].color = '#ffbc00';
            circulargauge.axes[0].ranges[4].start = 80;
            circulargauge.axes[0].ranges[4].end = 100;
            circulargauge.axes[0].ranges[4].startWidth = 25;
            circulargauge.axes[0].ranges[4].endWidth = 30;
            circulargauge.axes[0].ranges[4].color = '#ff6000';
            circulargauge.axes[0].ranges[5].start = 100;
            circulargauge.axes[0].ranges[5].end = 120;
            circulargauge.axes[0].ranges[5].startWidth = 30;
            circulargauge.axes[0].ranges[5].endWidth = 35;
            circulargauge.axes[0].ranges[5].color = 'red';
            circulargauge.axes[0].pointers[0].animation.enable = false;
            circulargauge.refresh();
        }
    };

    showCheckBox.change = gapRanges = (e: CheckBoxChangeEvents) => {
        if (e.checked) {
            circulargauge.axes[0].rangeGap = 5;
        } else {
            circulargauge.axes[0].rangeGap = null;
        }
        circulargauge.axes[0].pointers[0].animation.enable = false;
        circulargauge.refresh();
    };
};