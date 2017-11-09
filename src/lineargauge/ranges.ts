import { LinearGauge, Annotations } from '@syncfusion/ej2-lineargauge';
import { linear } from './linearRange';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
LinearGauge.Inject(Annotations);

/**
 * Linear Gauge Range Sample
 */
this.default = (): void => {
    let gauge: LinearGauge = new LinearGauge(linear());
    gauge.appendTo('#rangeContainer');
    let rangeIndex: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select Range Bar Color',
        width: 120,
        change: () => {
            let value: number = +rangeIndex.value;
            let start: HTMLInputElement = <HTMLInputElement>document.getElementById('start');
            let end: HTMLInputElement = <HTMLInputElement>document.getElementById('end');
            let rangeColor: HTMLSelectElement = <HTMLSelectElement>document.getElementById('color');
            let startWidth: HTMLInputElement = <HTMLInputElement>document.getElementById('startWidth');
            let endWidth: HTMLInputElement = <HTMLInputElement>document.getElementById('endWidth');
            start.value = gauge.axes[0].ranges[value].start.toString();
            end.value = gauge.axes[0].ranges[value].end.toString();
            startWidth.value = gauge.axes[0].ranges[value].startWidth.toString();
            endWidth.value = gauge.axes[0].ranges[value].endWidth.toString();
            rangeColor.value = gauge.axes[0].ranges[value].color.toString();
            document.getElementById('startWidthValue').innerHTML = 'Range Start Width<span>&nbsp;&nbsp;&nbsp;' + startWidth.value;
            document.getElementById('endWidthValue').innerHTML = 'Range End Width<span>&nbsp;&nbsp;&nbsp;' + endWidth.value;
            document.getElementById('startRangeValue').innerHTML = 'Range Start <span>&nbsp;&nbsp;&nbsp;' + start.value;
            document.getElementById('endRangeValue').innerHTML = 'Range End <span>&nbsp;&nbsp;&nbsp;' + end.value;
            gauge.refresh();
        }
    });
    rangeIndex.appendTo('#rangeIndex');

    document.getElementById('color').onchange = () => {
        let ele: HTMLInputElement = <HTMLInputElement>document.getElementById('color');
        gauge.axes[0].ranges[+rangeIndex.value].color = ele.value;
        gauge.refresh();
    };

    document.getElementById('startWidth').ontouchmove = document.getElementById('startWidth').onpointermove =
        document.getElementById('startWidth').onchange = (): void => {
            let ele: HTMLInputElement = <HTMLInputElement>document.getElementById('startWidth');
            gauge.axes[0].ranges[+rangeIndex.value].startWidth = parseInt(ele.value, 10);
            document.getElementById('startWidthValue').innerHTML = 'Range Start Width<span>&nbsp;&nbsp;&nbsp;' + ele.value;
            gauge.refresh();
        };

    document.getElementById('endWidth').ontouchmove = document.getElementById('endWidth').onpointermove =
        document.getElementById('endWidth').onchange = (): void => {
            let ele: HTMLInputElement = <HTMLInputElement>document.getElementById('endWidth');
            gauge.axes[0].ranges[+rangeIndex.value].endWidth = parseInt(ele.value, 10);
            document.getElementById('endWidthValue').innerHTML = 'Range End Width<span>&nbsp;&nbsp;&nbsp;' + ele.value;
            gauge.refresh();
        };

    document.getElementById('start').ontouchmove = document.getElementById('start').onpointermove =
        document.getElementById('start').onchange = (): void => {
            let start: HTMLInputElement = <HTMLInputElement>document.getElementById('start');
            let end: HTMLInputElement = <HTMLInputElement>document.getElementById('end');
            gauge.axes[0].ranges[+rangeIndex.value].start = parseInt(start.value, 10);
            gauge.axes[0].ranges[+rangeIndex.value].end = parseInt(end.value, 10);
            document.getElementById('startRangeValue').innerHTML = 'Range Start <span>&nbsp;&nbsp;&nbsp;' + start.value;
            gauge.refresh();
        };

    document.getElementById('end').ontouchmove = document.getElementById('end').onpointermove =
        document.getElementById('end').onchange = (): void => {
            let start: HTMLInputElement = <HTMLInputElement>document.getElementById('start');
            let end: HTMLInputElement = <HTMLInputElement>document.getElementById('end');
            gauge.axes[0].ranges[+rangeIndex.value].start = parseInt(start.value, 10);
            gauge.axes[0].ranges[+rangeIndex.value].end = parseInt(end.value, 10);
            document.getElementById('endRangeValue').innerHTML = 'Range End <span>&nbsp;&nbsp;&nbsp;' + end.value;
            gauge.refresh();
        };

    let useRangeColor: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select Range Bar Color',
        width: 120,
        change: () => {
            gauge.axes[0].labelStyle.useRangeColor = (useRangeColor.value === 'range') ? true : false;
            gauge.refresh();
        }
    });
    useRangeColor.appendTo('#useRangeColor');
};

