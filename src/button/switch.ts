import { Switch, rippleMouseHandler } from '@syncfusion/ej2-buttons';

/**
 * Default Switch sample
 */

this.default = (): void => {

    let switchObj: Switch = new Switch({ name: 'hotspot', value: 'USB tethering', checked: true});
    switchObj.appendTo('#checked');

    switchObj = new Switch({ name: 'hotspot', value: 'Wi-Fi hotspot' });
    switchObj.appendTo('#unchecked');

    switchObj = new Switch({ name: 'hotspot', value: 'Bluetooth tethering', disabled: true });
    switchObj.appendTo('#disabled');

    // Function to handle ripple effect for Switch with label.
    let elemArray: NodeListOf<Element> = document.querySelectorAll('.switch-control label');
    for (let i: number = 0, len: number = elemArray.length; i < len; i++) {
        elemArray[i].addEventListener('mouseup', rippleHandler);
        elemArray[i].addEventListener('mousedown', rippleHandler);
    }

    function rippleHandler(e: MouseEvent): void  {
        let rippleSpan: Element = this.nextElementSibling.querySelector('.e-ripple-container');
        if (rippleSpan) {
            rippleMouseHandler(e, rippleSpan);
        }
    }
};
