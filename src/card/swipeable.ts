/**
 *  Sample for CSS Swipeable Cards.
 */
// tslint:disable:max-line-length
import { Touch, ScrollEventArgs, SwipeEventArgs, closest } from '@syncfusion/ej2-base';


this.default = () => {

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
        e.swipeDirection === 'Right' ? ele.classList.add('card-out') : ele.classList.add('card-out-left');
        ele.parentElement.insertBefore(ele, ele.parentElement.children[0]);
        swipeable();
        ele.style.removeProperty('left');
    }

    function touchScrollHandler(e: ScrollEventArgs): void {
        let ele: HTMLElement = <HTMLElement>closest(<Element>e.originalEvent.target, '.e-card');
        let leftVal: number = Math.abs(parseInt(ele.style.left, 10));
        if (!ele.classList.contains('e-card')) {
            return;
        }
        if (isNaN(leftVal) || dir !== e.scrollDirection) {
            leftVal = 0;
        }
        if (e.scrollDirection === 'Down') {
            let index: number = [].slice.call(ele.parentElement.children).indexOf(ele);
            let len: number = ele.parentElement.childElementCount;
            let el: HTMLElement;
            for (let i: number = index + 1; i < len; i++) {
                el = (<HTMLElement>ele.parentElement.children[i]);
                el.style.top = (parseInt(el.style.top, 10) + e.distanceY) + 'px';
            }
        } else {
            e.scrollDirection === 'Left' ? ele.style.left = - (leftVal + e.distanceX) + 'px' : ele.style.left = (leftVal + e.distanceX) + 'px';
        }
        dir = e.scrollDirection;
    }
};
