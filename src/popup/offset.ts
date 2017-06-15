import { Popup } from '@syncfusion/ej2-popups';
import { Button } from '@syncfusion/ej2-buttons';

let element: HTMLElement;
let target: HTMLElement;
let btn: Button;
let popup: Popup;

/**
 * Default Popup sample
 */

this.default = () => {
    element = <HTMLElement>document.querySelector('#popup');
    target = <HTMLElement>document.querySelector('#target');
    btn = new Button({}, <HTMLButtonElement>target);
    popup = new Popup(element, {offsetX: 0, offsetY: 150, relateTo: target, position: {X: 'left', Y: 'bottom'}});
    popup.hide();
    target.addEventListener('click',  () => {
        if (popup.element.style.display === 'none') {
            popup.show();
            target.innerText = 'Hide Popup';
        }else {
            popup.hide();
            target.innerText = 'Show Popup';
        }
    });

};

