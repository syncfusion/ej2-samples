import { loadCultureFiles } from '../common/culture-loader';
/**
 *  Sample for CSS Swipeable Cards.
 */
// tslint:disable:max-line-length
import { Touch, SwipeEventArgs, closest } from '@syncfusion/ej2-base';


(window as any).default = (): void => {
    loadCultureFiles();

    let ele: HTMLElement = document.getElementById('horizontal_product');
    let dir: String;
    swipeable();
    let touch: Touch = new Touch(ele, { swipe: touchSwipeHandler });
    let temp: number = 0;
    let cards: NodeList = document.querySelectorAll('#horizontal_product .e-card');
    [].slice.call(cards).forEach((ele: HTMLElement): void => {
        ele.querySelector('img').onmousedown = () => {return false; };
    });
    function swipeable(): void {
        let fanStructuteCard: NodeList = document.querySelectorAll('#horizontal_product .e-card');
        let len: number = fanStructuteCard.length;
        [].slice.call(fanStructuteCard).forEach((ele: HTMLElement): void => {
            ele.style.removeProperty('transform');
        });
        let transformRatio: number = 2;
        let temp: number;
        let divide: number = (parseInt((len / 2).toString(), 10));
        temp = transformRatio;
        for (let i: number = divide - 1; i >= 0; i--) {
            (<HTMLElement>fanStructuteCard[i]).style.transform = 'rotate(' + (temp) + 'deg)';
            temp += transformRatio;
        }
        transformRatio = 2;
        temp = transformRatio;
        for (let i: number = divide + 1; i < len; i++) {
            (<HTMLElement>fanStructuteCard[i]).style.transform = 'rotate(' + (-temp) + 'deg)';
            temp += transformRatio;
        }
    }
    function touchSwipeHandler(e: SwipeEventArgs): void {
        let ele: HTMLElement = <HTMLElement>closest(<Element>e.originalEvent.target, '.e-card');
        if (!ele.classList.contains('e-card')) {
            return;
        }
        if (ele.parentElement.querySelector('.card-out')) {
            ele.parentElement.querySelector('.card-out').classList.remove('card-out');
        }
        if (ele.parentElement.querySelector('.card-out-left')) {
            ele.parentElement.querySelector('.card-out-left').classList.remove('card-out-left');
        }
        if (e.swipeDirection === 'Right') {
            ele.classList.add('card-out');
        } else if (e.swipeDirection === 'Left') {
            ele.classList.add('card-out-left');
        } else {
            return;
        }
        ele.parentElement.insertBefore(ele, ele.parentElement.children[0]);
        swipeable();
        ele.style.removeProperty('left');
    }
};
