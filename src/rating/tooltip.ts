import { loadCultureFiles } from '../common/culture-loader';
import { Rating } from '@syncfusion/ej2-inputs';

(window as any).default = (): void => {
loadCultureFiles();

let rating: Rating = new Rating({ value:3.0 });
rating.appendTo('#rating1');

let tooltipTemplate: Rating = new Rating({
    tooltipTemplate: '<span>${value} Star</span>',
    value: 3.0
});
tooltipTemplate.appendTo('#rating2');

};