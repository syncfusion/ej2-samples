/**
 * Default sample
 */
import { CircularGauge } from '@syncfusion/ej2-circulargauge';
import { gauge1, gauge2 } from './customization-gauge';
this.default = (): void => {

    let random: CircularGauge = new CircularGauge(gauge1());
    random.appendTo('#cutomization-container');
    let usage: CircularGauge = new CircularGauge(gauge2());
    let gauge: CircularGauge = random;
    let isUsage: boolean = false;
    document.getElementById('usage').onclick = () => {
        random.destroy();
        usage.appendTo('#cutomization-container');
        gauge = usage;
        isUsage = true;
        let element: HTMLSelectElement = <HTMLSelectElement>document.getElementById('currentValue');
        let barElement: HTMLSelectElement = <HTMLSelectElement>document.getElementById('barColor');
        let rangeElement: HTMLSelectElement = <HTMLSelectElement>document.getElementById('rangeColor');
        let pointerElement: HTMLSelectElement = <HTMLSelectElement>document.getElementById('pointerColor');
        let pointElement: HTMLSelectElement = <HTMLSelectElement>document.getElementById('pointColor');
        element.min = '0.5';
        element.max = '100';
        element.value = usage.axes[0].pointers[0].value.toString();
        document.getElementById('currentPointerValue').innerHTML = 'Current Value <span> &nbsp;&nbsp;&nbsp;'
            + usage.axes[0].pointers[0].value + '</span>';
        barElement.value = usage.axes[0].pointers[0].color;
        rangeElement.value = usage.axes[0].ranges[0].color;
        pointerElement.style.visibility = 'hidden';
        pointElement.style.visibility = 'hidden';
        let currentElement: HTMLSelectElement = <HTMLSelectElement>document.getElementById('usage');
        let existElement: HTMLSelectElement = <HTMLSelectElement>document.getElementById('random');
        currentElement.style.border = '2px solid #E0E0E0';
        existElement.style.border = '';
    };
    document.getElementById('random').onclick = () => {
        usage.destroy();
        random.appendTo('#cutomization-container');
        gauge = random;
        isUsage = false;
        let currentElement: HTMLSelectElement = <HTMLSelectElement>document.getElementById('random');
        let existElement: HTMLSelectElement = <HTMLSelectElement>document.getElementById('usage');
        currentElement.style.border = '2px solid #E0E0E0';
        existElement.style.border = '';
        let element: HTMLSelectElement = <HTMLSelectElement>document.getElementById('currentValue');
        let barElement: HTMLSelectElement = <HTMLSelectElement>document.getElementById('barColor');
        let rangeElement: HTMLSelectElement = <HTMLSelectElement>document.getElementById('rangeColor');
        let pointerElement: HTMLSelectElement = <HTMLSelectElement>document.getElementById('pointerColor');
        let pointElement: HTMLSelectElement = <HTMLSelectElement>document.getElementById('pointColor');
        pointerElement.style.visibility = 'visible';
        pointElement.style.visibility = 'visible';
        element.min = '1000';
        element.max = '2000';
        element.value = random.axes[0].pointers[0].value.toString();
        document.getElementById('currentPointerValue').innerHTML = 'Current Value <span> &nbsp;&nbsp;&nbsp;' +
            random.axes[0].pointers[0].value + '</span>';
        barElement.value = random.axes[0].pointers[0].color;
        rangeElement.value = random.axes[0].ranges[0].color;
        pointerElement.value = random.axes[0].pointers[1].color;
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
            document.getElementById('currentPointerValue').innerHTML = 'Current Value <span> &nbsp;&nbsp;&nbsp;' + value + '</span>';
        };

    document.getElementById('barColor').onchange = () => {
        let barColor: string = (<HTMLInputElement>document.getElementById('barColor')).value;
        gauge.axes[0].pointers[0].color = barColor;
        gauge.refresh();
    };

    document.getElementById('rangeColor').onchange = () => {
        let barColor: string = (<HTMLInputElement>document.getElementById('rangeColor')).value;
        gauge.axes[0].ranges[0].color = barColor;
        gauge.refresh();
    };

    document.getElementById('pointerColor').onchange = () => {
        let barColor: string = (<HTMLInputElement>document.getElementById('pointerColor')).value;
        if (!isUsage) {
            gauge.axes[0].pointers[1].color = barColor;
            gauge.axes[0].pointers[1].cap.border.color = barColor;
            gauge.axes[0].pointers[1].cap.color = barColor;
        }
        gauge.refresh();
    };
};
