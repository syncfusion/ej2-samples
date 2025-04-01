import { loadCultureFiles } from '../common/culture-loader';
import { Rating } from '@syncfusion/ej2-inputs';
import { Browser } from '@syncfusion/ej2-base';

(window as any).default = (): void => {
loadCultureFiles();

let right: Rating = new Rating({
    showLabel: true,
    value: 3.0
});
right.appendTo('#rating1');

let left: Rating = new Rating({
    showLabel: true,
    labelPosition: 'Left',
    value: 2.0
});
left.appendTo('#rating2');

let template: Rating = new Rating({
    showLabel: true,
    labelTemplate: '<span>${value} out of 5</span>',
    value: 2.0
});
template.appendTo('#rating3');

let top: Rating = new Rating({
    showLabel: true,
    labelPosition: 'Top',
    value: 3.0
});
top.appendTo('#rating4');

let bottom: Rating = new Rating({
    showLabel: true,
    labelPosition: 'Bottom',
    value: 3.0
});
bottom.appendTo('#rating5');

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
