import { loadCultureFiles } from '../common/culture-loader';
import { Rating } from '@syncfusion/ej2-inputs';
import { Browser } from '@syncfusion/ej2-base';

(window as any).default = (): void => {
loadCultureFiles();

let rating: Rating = new Rating({ value:3.0 });
rating.appendTo('#rating1');

let tooltipTemplate: Rating = new Rating({
    tooltipTemplate: '<span>${value} Star</span>',
    value: 3.0
});
tooltipTemplate.appendTo('#rating2');

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