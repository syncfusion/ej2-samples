import { loadCultureFiles } from '../common/culture-loader';
import { Rating } from '@syncfusion/ej2-inputs';
import { Browser } from '@syncfusion/ej2-base';

(window as any).default = (): void => {
loadCultureFiles();

let fontIcon: Rating = new Rating({
    emptyTemplate: '<span class="custom-font sf-icon-heart"></span>',
    value: 3.0
});
fontIcon.appendTo('#rating1');

let svgIcon: Rating = new Rating({
    emptyTemplate: '#emptyTemplate',
    fullTemplate: '#fullTemplate',
    enableAnimation: false,
    value: 3.0
});
svgIcon.appendTo('#rating2');

let emojiIcon: Rating = new Rating({
    emptyTemplate: '#template',
    enableSingleSelection: true,
    enableAnimation: false,
    value: 3.0
});
emojiIcon.appendTo('#rating3');

let custom: Rating = new Rating({
    cssClass:'custom-icon',
    value: 3.0,
    enableAnimation: false
});
custom.appendTo('#rating4');

if (document.getElementById('right-pane')) {
    document.getElementById('right-pane')?.addEventListener('scroll', hideTooltipOnScroll);
}

function hideTooltipOnScroll(): void {
    const tooltipElement: HTMLElement | null = document.querySelector('.e-rating-tooltip');
    if (tooltipElement && Browser.isDevice) {
        tooltipElement.style.display = 'none';
    }
}
};
