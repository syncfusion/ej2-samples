/**
 *  Sample for CSS Basic Layout Cards.
 */
// tslint:disable:max-line-length
this.default = () => {

    /* On click event for flip the card*/
    document.getElementById('e-card-flip').onclick = (e: Event) => {
        let cardEle: HTMLElement = (<HTMLElement>e.currentTarget);
        if (cardEle.classList.contains('e-flipped')) {
            cardEle.classList.remove('e-flipped');
        } else {
        cardEle.classList.add('e-flipped'); } };

    /* On blur event for flip the card*/
    document.getElementById('e-card-flip').onblur = (e: Event) => {
        let cardEle: HTMLElement = (<HTMLElement>e.currentTarget);
        cardEle.classList.remove('e-flipped'); };

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

    /* On click event for hidden Revealled card elements*/
    document.getElementById('card-reveal_collapse').onclick = (e: Event) => {
        let cardEle: HTMLElement = <HTMLElement>(<HTMLElement>e.currentTarget).parentNode.parentNode;
        let revealEle: HTMLElement = <HTMLElement>cardEle.querySelector('#card_reveal');
        revealEle.classList.add('e-reveal-hide');
        revealEle.classList.remove('e-reveal-show');
        let revealedEle: HTMLElement = <HTMLElement>cardEle.querySelector('#card_revealed');
        revealedEle.classList.add('e-reveal-show');
        revealedEle.classList.remove('e-reveal-hide');
    };
};
// tslint:enable:max-line-length