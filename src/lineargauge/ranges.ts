import { LinearGauge, Annotations } from '@syncfusion/ej2-lineargauge';
import { linear } from './linearRange';
LinearGauge.Inject(Annotations);

/**
 * Default linear gauge
 */
this.default = (): void => {
    let gauge: LinearGauge = new LinearGauge(linear());
    gauge.appendTo('#rangeContainer');

    document.getElementById('rangeIndex').onchange = (): void => {
        let rangeIndex: HTMLSelectElement = <HTMLSelectElement>document.getElementById('rangeIndex');
        let start: HTMLInputElement = <HTMLInputElement>document.getElementById('start');
        let end: HTMLInputElement = <HTMLInputElement>document.getElementById('end');
        let rangeColor: HTMLSelectElement = <HTMLSelectElement>document.getElementById('color');
        let startWidth: HTMLInputElement = <HTMLInputElement>document.getElementById('startWidth');
        let endWidth: HTMLInputElement = <HTMLInputElement>document.getElementById('endWidth');
        start.value = gauge.axes[0].ranges[parseInt(rangeIndex.value, 10)].start.toString();
        end.value = gauge.axes[0].ranges[parseInt(rangeIndex.value, 10)].end.toString();
        startWidth.value = gauge.axes[0].ranges[parseInt(rangeIndex.value, 10)].startWidth.toString();
        endWidth.value = gauge.axes[0].ranges[parseInt(rangeIndex.value, 10)].endWidth.toString();
        rangeColor.value = gauge.axes[0].ranges[parseInt(rangeIndex.value, 10)].color.toString();
        document.getElementById('startWidthValue').innerHTML = 'Range Start Width<span>&nbsp;&nbsp;&nbsp;' + startWidth.value;
        document.getElementById('endWidthValue').innerHTML = 'Range End Width<span>&nbsp;&nbsp;&nbsp;' + endWidth.value;
        document.getElementById('startRangeValue').innerHTML = 'Range Start <span>&nbsp;&nbsp;&nbsp;' + start.value;
        document.getElementById('endRangeValue').innerHTML = 'Range End <span>&nbsp;&nbsp;&nbsp;' + end.value;
        gauge.refresh();
    };

    document.getElementById('color').onchange = () => {
        let rangeIndex: HTMLSelectElement = <HTMLSelectElement>document.getElementById('rangeIndex');
        let ele: HTMLInputElement = <HTMLInputElement>document.getElementById('color');
        gauge.axes[0].ranges[parseInt(rangeIndex.value, 10)].color = ele.value;
        gauge.refresh();
    };

    document.getElementById('startWidth').ontouchmove = document.getElementById('startWidth').onpointermove =
        document.getElementById('startWidth').onchange = (): void => {
            let ele: HTMLInputElement = <HTMLInputElement>document.getElementById('startWidth');
            let rangeIndex: HTMLSelectElement = <HTMLSelectElement>document.getElementById('rangeIndex');
            gauge.axes[0].ranges[parseInt(rangeIndex.value, 10)].startWidth = parseInt(ele.value, 10);
            document.getElementById('startWidthValue').innerHTML = 'Range Start Width<span>&nbsp;&nbsp;&nbsp;' + ele.value;
            gauge.refresh();
        };

    document.getElementById('endWidth').ontouchmove = document.getElementById('endWidth').onpointermove =
        document.getElementById('endWidth').onchange = (): void => {
            let ele: HTMLInputElement = <HTMLInputElement>document.getElementById('endWidth');
            let rangeIndex: HTMLSelectElement = <HTMLSelectElement>document.getElementById('rangeIndex');
            gauge.axes[0].ranges[parseInt(rangeIndex.value, 10)].endWidth = parseInt(ele.value, 10);
            document.getElementById('endWidthValue').innerHTML = 'Range End Width<span>&nbsp;&nbsp;&nbsp;' + ele.value;
            gauge.refresh();
        };

    document.getElementById('start').ontouchmove = document.getElementById('start').onpointermove =
        document.getElementById('start').onchange = (): void => {
            let start: HTMLInputElement = <HTMLInputElement>document.getElementById('start');
            let end: HTMLInputElement = <HTMLInputElement>document.getElementById('end');
            let rangeIndex: HTMLSelectElement = <HTMLSelectElement>document.getElementById('rangeIndex');
            gauge.axes[0].ranges[parseInt(rangeIndex.value, 10)].start = parseInt(start.value, 10);
            gauge.axes[0].ranges[parseInt(rangeIndex.value, 10)].end = parseInt(end.value, 10);
            document.getElementById('startRangeValue').innerHTML = 'Range Start <span>&nbsp;&nbsp;&nbsp;' + start.value;
            gauge.refresh();
        };

    document.getElementById('end').ontouchmove = document.getElementById('end').onpointermove =
        document.getElementById('end').onchange = (): void => {
            let start: HTMLInputElement = <HTMLInputElement>document.getElementById('start');
            let end: HTMLInputElement = <HTMLInputElement>document.getElementById('end');
            let rangeIndex: HTMLSelectElement = <HTMLSelectElement>document.getElementById('rangeIndex');
            gauge.axes[0].ranges[parseInt(rangeIndex.value, 10)].start = parseInt(start.value, 10);
            gauge.axes[0].ranges[parseInt(rangeIndex.value, 10)].end = parseInt(end.value, 10);
            document.getElementById('endRangeValue').innerHTML = 'Range End <span>&nbsp;&nbsp;&nbsp;' + end.value;
            gauge.refresh();
        };

    document.getElementById('useRangeColor').onchange = (): void => {
        let rangeIndex: HTMLSelectElement = <HTMLSelectElement>document.getElementById('rangeIndex');
        let range: HTMLSelectElement = <HTMLSelectElement>document.getElementById('useRangeColor');
        gauge.axes[0].labelStyle.useRangeColor = (range.value === 'range') ? true : false;
        gauge.refresh();
    };
};

