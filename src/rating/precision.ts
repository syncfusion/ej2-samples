import { loadCultureFiles } from '../common/culture-loader';
import { Rating } from '@syncfusion/ej2-inputs';

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

};