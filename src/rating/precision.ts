import { loadCultureFiles } from '../common/culture-loader';
import { Rating } from '@syncfusion/ej2-inputs';
import { Browser } from '@syncfusion/ej2-base';

(window as any).default = (): void => {
loadCultureFiles();

let full: Rating = new Rating({ value: 3.0 });
full.appendTo('#rating1');

let half: Rating = new Rating({ precision: 'Half', value:2.5});
half.appendTo('#rating2');

let quarter: Rating = new Rating({ precision: 'Quarter', value:2.75});
quarter.appendTo('#rating3');

let exact: Rating = new Rating({ precision: 'Exact', value:2.3});
exact.appendTo('#rating4');

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