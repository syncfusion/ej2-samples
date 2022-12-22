import { loadCultureFiles } from '../common/culture-loader';
import { Rating } from '@syncfusion/ej2-inputs';

(window as any).default = (): void => {
loadCultureFiles();

let basic: Rating = new Rating({ value:3.0, allowReset:true });
basic.appendTo('#rating1');

};