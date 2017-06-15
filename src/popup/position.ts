import { Popup } from '@syncfusion/ej2-popups';
import { Button } from '@syncfusion/ej2-buttons';
import { AnimationModel } from '@syncfusion/ej2-base';
/**
 * position  popup sample
 */

let element: HTMLElement;
let targetX: HTMLElement;
let targetY: HTMLElement;
let targetContainer: HTMLElement;
let btn: Button;
let popup: Popup;

let optionUp: AnimationModel = { name: 'FadeIn', duration: 100 };

this.default = () => {
    element = <HTMLElement>document.querySelector('#popup');
    targetContainer = <HTMLElement>document.querySelector('#target');
    targetY = <HTMLElement>document.querySelector('#PosY');
    targetX = <HTMLElement>document.querySelector('#PosX');
    popup = new Popup(element, {offsetX: 0, offsetY: 0, relateTo: targetContainer, position: {X: 'left', Y: 'top'}});
    popup.show();
    targetY.addEventListener('change', showEvent);
    targetX.addEventListener('change', showEvent);

};
function showEvent(): void {
    popup.dataBind();
    popup.show();
    popup.setProperties({position: {X: (<HTMLSelectElement>targetX).value, Y: (<HTMLSelectElement>targetY).value}});
}