import { loadCultureFiles } from '../common/culture-loader';
import { Rating } from '@syncfusion/ej2-inputs';

(window as any).default = (): void => {
loadCultureFiles();

let fontIcon: Rating = new Rating({
    emptyTemplate: '<span class="custom-font sf-icon-heart"></span>',
    fullTemplate: '<span class="custom-font sf-icon-heart"></span>',
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
};