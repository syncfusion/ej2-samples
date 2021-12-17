// custom code start
import { loadCultureFiles } from '../common/culture-loader';
// tslint:disable
// custom code end
/**
 * Gauge Customization sample
 */
import { CircularGauge } from '@syncfusion/ej2-circulargauge';
import { gauge1, gauge2 } from './customization-gauge';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
(window as any).default = (): void => {
    // custom code start
    loadCultureFiles();
    // custom code end
    let random: CircularGauge = new CircularGauge(gauge1());
    random.appendTo('#cutomization-container');
    let usage: CircularGauge = new CircularGauge(gauge2());
    usage.appendTo('#cutomization-container1');
    let gauge: CircularGauge = random; let isUsage: boolean = false;
    let barColor: DropDownList; let rangeColor: DropDownList; let pointerColor: DropDownList;
    barColor = new DropDownList({
        index: 0, width: '100%',
        change: () => {
            gauge.axes[0].pointers[0].color = barColor.value.toString();
            gauge.refresh();
        }
    });
    barColor.appendTo('#barColor');
    rangeColor = new DropDownList({
        index: 0, width: '100%',
        change: () => {
            gauge.axes[0].ranges[0].color = rangeColor.value.toString();
            gauge.refresh();
        }
    });
    rangeColor.appendTo('#rangeColor');
    pointerColor = new DropDownList({
        index: 0, width: '100%',
        change: () => {
            let color: string = pointerColor.value.toString();
            if (!isUsage) {
                gauge.axes[0].pointers[1].color = color;
                gauge.axes[0].pointers[1].cap.border.color = color;
                gauge.axes[0].pointers[1].cap.color = color;
            }
            gauge.refresh();
        }
    });
    pointerColor.appendTo('#pointerColor');
    document.getElementById('usage').onclick = () => {
        document.getElementById('cutomization-container').style.display = 'none';
        document.getElementById('cutomization-container1').style.display = 'block';
        gauge = usage; isUsage = true;
        let element: HTMLSelectElement = <HTMLSelectElement>document.getElementById('currentValue');
        element.min = '0.5'; element.max = '100';
        element.value = usage.axes[0].pointers[0].value.toString();
        document.getElementById('currentPointerValue').innerHTML = usage.axes[0].pointers[0].value.toString();
        barColor.value = usage.axes[0].pointers[0].color; rangeColor.value = usage.axes[0].ranges[0].color;
        pointerColor.enabled = false;
        let pointElement: HTMLSelectElement = <HTMLSelectElement>document.getElementById('pointColor');
        pointElement.className = 'e-disabled';
        let currentElement: HTMLSelectElement = <HTMLSelectElement>document.getElementById('usage');
        let existElement: HTMLSelectElement = <HTMLSelectElement>document.getElementById('random');
        let currentLine: HTMLSelectElement = <HTMLSelectElement>document.getElementById('usage_line');
        let exisLine: HTMLSelectElement = <HTMLSelectElement>document.getElementById('random_line');
        currentLine.style.display = 'block';
        exisLine.style.display = 'none';
    };
    document.getElementById('random').onclick = () => {
        if (usage.element) {
            document.getElementById('cutomization-container1').style.display = 'none';
        	document.getElementById('cutomization-container').style.display = 'block';
            gauge = random; isUsage = false;
            let currentElement: HTMLSelectElement = <HTMLSelectElement>document.getElementById('random');
            let existElement: HTMLSelectElement = <HTMLSelectElement>document.getElementById('usage');
            let exisLine: HTMLSelectElement = <HTMLSelectElement>document.getElementById('usage_line');
            let currentLine: HTMLSelectElement = <HTMLSelectElement>document.getElementById('random_line');
            currentLine.style.display = 'block'; exisLine.style.display = 'none';
            let element: HTMLSelectElement = <HTMLSelectElement>document.getElementById('currentValue');
            let pointElement: HTMLSelectElement = <HTMLSelectElement>document.getElementById('pointColor');
            pointElement.className = 'e-enabled'; pointerColor.enabled = true;
            element.min = '1000'; element.max = '2000';
            element.value = random.axes[0].pointers[0].value.toString();
            document.getElementById('currentPointerValue').innerHTML = random.axes[0].pointers[0].value.toString();
            barColor.value = random.axes[0].pointers[0].color;
            rangeColor.value = random.axes[0].ranges[0].color;
            pointerColor.value = random.axes[0].pointers[1].color;
        }
    };

    document.getElementById('currentValue').onpointermove = document.getElementById('currentValue').ontouchmove =
        document.getElementById('currentValue').onchange = () => {
            let value: number = +(<HTMLInputElement>document.getElementById('currentValue')).value;
            if (isUsage) {
                gauge.setPointerValue(0, 0, value);
            } else {
                gauge.setPointerValue(0, 0, value);
                gauge.setPointerValue(0, 1, value);
            }
            gauge.setAnnotationValue(0, 0, '<div style="color:#666666;font-size:35px;">' + value + (isUsage ? 'GB' : '') + '</div>');
            document.getElementById('currentPointerValue').innerHTML = value.toString();
        };
        // custom code start
    let selectedTheme: string = location.hash.split('/')[1]; let color: string;
    if (selectedTheme === 'bootstrap') {
        color = '#a16ee5';
    } else if (selectedTheme === 'fabric') {
        color = '#1783FF';
    } else {
        color = '#ff4081';
    }
    // custom code end
    let exisLine: HTMLSelectElement = <HTMLSelectElement>document.getElementById('usage_line');
    let currentLine: HTMLSelectElement = <HTMLSelectElement>document.getElementById('random_line');
    exisLine.style.background = color; currentLine.style.background = color;
};
