import { loadCultureFiles } from '../common/culture-loader';
import { Rating } from '@syncfusion/ej2-inputs';
import { Browser } from '@syncfusion/ej2-base';

(window as any).default = (): void => {
loadCultureFiles();

let basic: Rating = new Rating({ value:3.0, allowReset:true });
basic.appendTo('#rating1');

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