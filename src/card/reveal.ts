import { loadCultureFiles } from '../common/culture-loader';
/**
 *  Sample for CSS Reveal Cards.
 */
(window as any).default = (): void => {
    loadCultureFiles();

    /* On click event for Revealing hidden card elements*/
    document.getElementById('showcarddata').onclick = () => {
        let cEle: HTMLElement = document.getElementById('card_revealed');
        let cardEle: HTMLElement = <HTMLElement>cEle.parentNode.parentNode;
        let revealEle: HTMLElement = <HTMLElement>cardEle.querySelector('#card_reveal');
        revealEle.classList.add('e-reveal-show');
        revealEle.classList.remove('e-reveal-hide');
        let revealedEle: HTMLElement = <HTMLElement>cardEle.querySelector('#card_revealed');
        revealedEle.classList.add('e-reveal-hide');
        revealedEle.classList.remove('e-reveal-show');
    };

    document.getElementById('showcarddata_icon').onclick = () => {
        let cEle: HTMLElement = document.getElementById('card_revealed');
        let cardEle: HTMLElement = <HTMLElement>cEle.parentNode.parentNode;
        let revealEle: HTMLElement = <HTMLElement>cardEle.querySelector('#card_reveal');
        revealEle.classList.add('e-reveal-show');
        revealEle.classList.remove('e-reveal-hide');
        let revealedEle: HTMLElement = <HTMLElement>cardEle.querySelector('#card_revealed');
        revealedEle.classList.add('e-reveal-hide');
        revealedEle.classList.remove('e-reveal-show');
    };

    /* On click event for hidden Revealled card elements*/
    document.getElementById('card-reveal_collapse').onclick = (e: Event) => {
        let cardEle: HTMLElement = <HTMLElement>(<HTMLElement>e.currentTarget).parentNode.parentNode.parentElement;
        let revealEle: HTMLElement = <HTMLElement>cardEle.querySelector('#card_reveal');
        revealEle.classList.add('e-reveal-hide');
        revealEle.classList.remove('e-reveal-show');
        let revealedEle: HTMLElement = <HTMLElement>cardEle.querySelector('#card_revealed');
        revealedEle.classList.add('e-reveal-show');
        revealedEle.classList.remove('e-reveal-hide');
    };
};
