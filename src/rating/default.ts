import { loadCultureFiles } from '../common/culture-loader';
import { Rating } from '@syncfusion/ej2-inputs';

(window as any).default = (): void => {
loadCultureFiles();

let basic: Rating = new Rating({});
basic.appendTo('#rating1');

let reset: Rating = new Rating({
    allowReset: true,
    value: 3.0
});
reset.appendTo('#rating2');

let single: Rating = new Rating({
    enableSingleSelection: true,
    value: 3.0
});
single.appendTo('#rating3');

let read: Rating = new Rating({
    readOnly: true,
    value: 3.0
});
read.appendTo('#rating4');

let disable: Rating = new Rating({
    disabled: true,
    value: 3.0
});
disable.appendTo('#rating5');

let itemCount: Rating = new Rating({
    itemsCount: 8,
    value: 3.0
});
itemCount.appendTo('#rating6');
};