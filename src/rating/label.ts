import { loadCultureFiles } from '../common/culture-loader';
import { Rating } from '@syncfusion/ej2-inputs';

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
};
