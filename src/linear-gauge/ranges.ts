/**
 * Linear Gauge Range Sample
 */
// custom code start
import { loadCultureFiles } from '../common/culture-loader';
// custom code end
import { LinearGauge, Annotations } from '@syncfusion/ej2-lineargauge';
import { linear } from './linear-range';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { TextBox } from  '@syncfusion/ej2-inputs';
LinearGauge.Inject(Annotations);
(window as any).default = (): void => {
    // custom code start
    loadCultureFiles();
    // custom code end
    let gauge: LinearGauge = new LinearGauge(linear());
    gauge.appendTo('#rangeContainer');
    // code for property panel
    let rangeIndex: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select Range Bar Color',
        width: '110%',
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
            document.getElementById('startWidthValue').innerHTML = startWidth.value.toString();
            document.getElementById('endWidthValue').innerHTML = endWidth.value.toString();
            document.getElementById('startRangeValue').innerHTML = start.value.toString();
            document.getElementById('endRangeValue').innerHTML = end.value.toString();
            gauge.refresh();
        }
    });
    rangeIndex.appendTo('#rangeIndex');

    let fileText: TextBox = new TextBox({
        width: '110%'
    });
    fileText.appendTo('#color');

    document.getElementById('color').onchange = () => {
        gauge.axes[0].ranges[+rangeIndex.value].color = fileText.value;
        gauge.refresh();
    };

    document.getElementById('startWidth').ontouchmove = document.getElementById('startWidth').onpointermove =
        document.getElementById('startWidth').onchange = (): void => {
            let ele: HTMLInputElement = <HTMLInputElement>document.getElementById('startWidth');
            gauge.axes[0].ranges[+rangeIndex.value].startWidth = parseInt(ele.value, 10);
            document.getElementById('startWidthValue').innerHTML = ele.value.toString();
            gauge.refresh();
        };

    document.getElementById('endWidth').ontouchmove = document.getElementById('endWidth').onpointermove =
        document.getElementById('endWidth').onchange = (): void => {
            let ele: HTMLInputElement = <HTMLInputElement>document.getElementById('endWidth');
            gauge.axes[0].ranges[+rangeIndex.value].endWidth = parseInt(ele.value, 10);
            document.getElementById('endWidthValue').innerHTML = ele.value.toString();
            gauge.refresh();
        };

    document.getElementById('start').ontouchmove = document.getElementById('start').onpointermove =
        document.getElementById('start').onchange = (): void => {
            let end: HTMLInputElement = <HTMLInputElement>document.getElementById('end');
            let start: HTMLInputElement = <HTMLInputElement>document.getElementById('start');
            gauge.axes[0].ranges[+rangeIndex.value].start = parseInt(start.value, 10);
            gauge.axes[0].ranges[+rangeIndex.value].end = parseInt(end.value, 10);
            document.getElementById('startRangeValue').innerHTML = start.value.toString();
            gauge.refresh();
        };

    document.getElementById('end').ontouchmove = document.getElementById('end').onpointermove =
        document.getElementById('end').onchange = (): void => {
            let start: HTMLInputElement = <HTMLInputElement>document.getElementById('start');
            let end: HTMLInputElement = <HTMLInputElement>document.getElementById('end');
            gauge.axes[0].ranges[+rangeIndex.value].start = parseInt(start.value, 10);
            gauge.axes[0].ranges[+rangeIndex.value].end = parseInt(end.value, 10);
            document.getElementById('endRangeValue').innerHTML = end.value.toString();
            gauge.refresh();
        };

    let useRangeColor: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select Range Bar Color',
        width: '110%',
        change: () => {
            gauge.axes[0].labelStyle.useRangeColor = (useRangeColor.value === 'range') ? true : false;
            gauge.refresh();
        }
    });
    useRangeColor.appendTo('#useRangeColor');
};

